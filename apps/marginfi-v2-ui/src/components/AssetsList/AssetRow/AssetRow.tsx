import Image from "next/image";
import { TableCell, TableRow, Tooltip } from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ActionType, ExtendedBankInfo, isActiveBankInfo } from "~/types";
import { AssetRowInputBox } from "./AssetRowInputBox";
import { AssetRowAction } from "./AssetRowAction";
import { AssetRowHeader } from "./AssetRowHeader";
import { AssetRowMetric } from "./AssetRowMetric";
import { MarginfiAccount, MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import { WSOL_MINT } from "~/config";
import { Keypair, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { groupedNumberFormatter, usdFormatter } from "~/utils/formatters";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createSyncNativeInstruction,
  getAssociatedTokenAddressSync,
} from "@mrgnlabs/mrgn-common/src/spl";
import { uiToNative } from "@mrgnlabs/mrgn-common";
import { percentFormatter } from "~/utils/formatters";

const BORROW_OR_LEND_TOAST_ID = "borrow-or-lend";
const REFRESH_ACCOUNT_TOAST_ID = "refresh-account";
const ACCOUNT_DETECTION_ERROR_TOAST_ID = "account-detection-error";


const AssetRow: FC<{
  bankInfo: ExtendedBankInfo;
  nativeSolBalance: number;
  isInLendingMode: boolean;
  isConnected: boolean;
  marginfiAccount: MarginfiAccount | null;
  marginfiClient: MarginfiClient | null;
  reloadBanks: () => Promise<void>;
}> = ({ bankInfo, nativeSolBalance, isInLendingMode, isConnected, marginfiAccount, marginfiClient, reloadBanks }) => {
  const [borrowOrLendAmount, setBorrowOrLendAmount] = useState(0);

  // Reset b/l amounts on toggle
  useEffect(() => {
    setBorrowOrLendAmount(0);
  }, [isInLendingMode]);

  const currentAction = useMemo(() => getCurrentAction(isInLendingMode, bankInfo), [isInLendingMode, bankInfo]);

  const maxAmount = useMemo(() => {
    switch (currentAction) {
      case ActionType.Deposit:
        return bankInfo.maxDeposit;
      case ActionType.Withdraw:
        return bankInfo.maxWithdraw;
      case ActionType.Borrow:
        return bankInfo.maxBorrow;
      case ActionType.Repay:
        return bankInfo.maxRepay;
    }
  }, [bankInfo.maxBorrow, bankInfo.maxDeposit, bankInfo.maxRepay, bankInfo.maxWithdraw, currentAction]);

  const borrowOrLend = useCallback(async () => {
    if (marginfiClient === null) throw Error("Marginfi client not ready");

    if (currentAction === ActionType.Deposit && bankInfo.maxDeposit === 0) {
      toast.error(`You don't have any ${bankInfo.tokenName} to lend in your wallet.`);
      return;
    }

    if (currentAction === ActionType.Borrow && bankInfo.maxBorrow === 0) {
      toast.error(`You cannot borrow any ${bankInfo.tokenName} right now.`);
      return;
    }

    if (borrowOrLendAmount <= 0) {
      toast.error("Please enter an amount over 0.");
      return;
    }

    let _marginfiAccount = marginfiAccount;

    // -------- Create marginfi account if needed
    try {
      if (_marginfiAccount === null) {
        if (currentAction !== ActionType.Deposit) {
          toast.error("An account is required for anything operation except deposit.");
          return;
        }

        toast.loading("Creating account", {
          toastId: BORROW_OR_LEND_TOAST_ID,
        });

        const userAccounts = await marginfiClient.getMarginfiAccountsForAuthority();
        if (userAccounts.length > 0) {
          toast.update(BORROW_OR_LEND_TOAST_ID, {
            render: "Uh oh, data seems out-of-sync",
            toastId: BORROW_OR_LEND_TOAST_ID,
            type: toast.TYPE.WARNING,
            autoClose: 3000,
            isLoading: false,
          });
          toast.loading("Refreshing data...", { toastId: ACCOUNT_DETECTION_ERROR_TOAST_ID });
          try {
            await reloadBanks();
            toast.update(ACCOUNT_DETECTION_ERROR_TOAST_ID, {
              render: "Refreshing data... Done. Please try again",
              type: toast.TYPE.SUCCESS,
              autoClose: 3000,
              isLoading: false,
            });
          } catch (error: any) {
            toast.update(ACCOUNT_DETECTION_ERROR_TOAST_ID, {
              render: `Error while reloading state: ${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 5000,
              isLoading: false,
            });
            console.log("Error while reloading state");
            console.log(error);
          }
          return;
        }

        _marginfiAccount = await marginfiClient.createMarginfiAccount();
        toast.update(BORROW_OR_LEND_TOAST_ID, {
          render: `${currentAction + "ing"} ${borrowOrLendAmount} ${bankInfo.tokenName}`,
        });
      }
    } catch (error: any) {
      toast.update(BORROW_OR_LEND_TOAST_ID, {
        render: `Error while ${currentAction + "ing"}: ${error.message}`,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
      console.log(`Error while ${currentAction + "ing"}`);
      console.log(error);
      return;
    }

    // -------- Perform relevant operation
    try {
      let ixs: TransactionInstruction[] = [];
      let signers: Keypair[] = [];

      if (currentAction === ActionType.Deposit) {
        await _marginfiAccount.deposit(borrowOrLendAmount, bankInfo.bank);

        toast.update(BORROW_OR_LEND_TOAST_ID, {
          render: `${currentAction + "ing"} ${borrowOrLendAmount} ${bankInfo.tokenName} 👍`,
          type: toast.TYPE.SUCCESS,
          autoClose: 2000,
          isLoading: false,
        });
      }

      toast.loading(`${currentAction + "ing"} ${borrowOrLendAmount} ${bankInfo.tokenName}`, {
        toastId: BORROW_OR_LEND_TOAST_ID,
      });
      if (_marginfiAccount === null) {
        // noinspection ExceptionCaughtLocallyJS
        throw Error("Marginfi account not ready");
      }

      if (currentAction === ActionType.Borrow) {
        await _marginfiAccount.borrow(borrowOrLendAmount, bankInfo.bank);
      } else if (currentAction === ActionType.Repay) {
        const repayAll = isActiveBankInfo(bankInfo) ? borrowOrLendAmount === bankInfo.position.amount : false;
        await _marginfiAccount.repay(borrowOrLendAmount, bankInfo.bank, repayAll);
      } else if (currentAction === ActionType.Withdraw) {
        const withdrawAll = isActiveBankInfo(bankInfo) ? borrowOrLendAmount === bankInfo.position.amount : false;
        await _marginfiAccount.withdraw(borrowOrLendAmount, bankInfo.bank, withdrawAll);
      }

      toast.update(BORROW_OR_LEND_TOAST_ID, {
        render: `${currentAction + "ing"} ${borrowOrLendAmount} ${bankInfo.tokenName} 👍`,
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
        isLoading: false,
      });
    } catch (error: any) {
      toast.update(BORROW_OR_LEND_TOAST_ID, {
        render: `Error while ${currentAction + "ing"}: ${error.message}`,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
      console.log(`Error while ${currentAction + "ing"}`);
      console.log(error);
    }

    setBorrowOrLendAmount(0);

    // -------- Refresh state
    toast.loading("Refreshing state", { toastId: REFRESH_ACCOUNT_TOAST_ID });
    try {
      await reloadBanks();
      toast.update(REFRESH_ACCOUNT_TOAST_ID, {
        render: "Refreshing state 👍",
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
        isLoading: false,
      });
    } catch (error: any) {
      toast.update(REFRESH_ACCOUNT_TOAST_ID, {
        render: `Error while reloading state: ${error.message}`,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
      console.log("Error while reloading state");
      console.log(error);
    }
  }, [bankInfo, borrowOrLendAmount, currentAction, marginfiAccount, marginfiClient, reloadBanks]);

  return (
    <TableRow
      className="h-full w-full"
    >
      <TableCell
        className="text-white p-0 border-none font-aeonik"
        style={{ fontWeight: 300 }}
      >
        <div className="flex px-4 gap-4">
          {
            bankInfo.tokenIcon && 
            <Image
              src={bankInfo.tokenIcon}
              alt={bankInfo.tokenName}
              height={25}
              width={25}
            />
          }
          <div className="font-aeonik">{bankInfo.tokenName}</div>
        </div>
      </TableCell>

      <TableCell className="text-white border-none px-2 font-aeonik" align="right" style={{ fontWeight: 300 }}>
        {
          bankInfo.tokenPrice >= 0.01
          ? usdFormatter.format(bankInfo.tokenPrice)
          : `$${bankInfo.tokenPrice.toExponential(2)}`
        }
      </TableCell>

      <TableCell className="text-white border-none font-aeonik px-2" align="right" style={{ fontWeight: 300 }}>
        {
          percentFormatter.format(
            isInLendingMode ? bankInfo.lendingRate :
            bankInfo.borrowingRate
          )
        }
      </TableCell>

      <TableCell className="text-white border-none font-aeonik px-2" align="right" style={{ fontWeight: 300 }}>
        {
          isInLendingMode ?
            bankInfo.bank.config.assetWeightInit.toNumber().toFixed(2) + ' / ' + 
            bankInfo.bank.config.assetWeightMaint.toNumber().toFixed(2)
          :
          bankInfo.bank.config.liabilityWeightInit.toNumber().toFixed(2) + ' / ' + 
          bankInfo.bank.config.liabilityWeightMaint.toNumber().toFixed(2)
        }
      </TableCell>

      <TableCell className="text-white border-none font-aeonik px-2" align="right" style={{ fontWeight: 300 }}>
        {
          groupedNumberFormatter.format(
            isInLendingMode ?
            bankInfo.totalPoolDeposits
            :
            bankInfo.availableLiquidity,
          )
        }
      </TableCell>

      <TableCell className="text-white border-none font-aeonik px-2" align="right">
        {
          percentFormatter.format(bankInfo.utilizationRate/100)
        }
      </TableCell>

      <TableCell className="border-none p-0 w-full" colSpan={2}>
        <AssetRowInputBox
          value={borrowOrLendAmount}
          setValue={setBorrowOrLendAmount}
          maxValue={maxAmount}
          maxDecimals={bankInfo.tokenMintDecimals}
        />
      </TableCell>
      
      <TableCell className="text-white border-none font-aeonik p-0 px-2">
        <Tooltip
          title={marginfiAccount === null ? "User account while be automatically created on first deposit" : ""}
          placement="top"
        >
          <div className="h-full w-full flex justify-center items-center">
            <AssetRowAction onClick={borrowOrLend}>{currentAction}</AssetRowAction>
          </div>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

function getCurrentAction(isLendingMode: boolean, bankInfo: ExtendedBankInfo): ActionType {
  if (!isActiveBankInfo(bankInfo)) {
    return isLendingMode ? ActionType.Deposit : ActionType.Borrow;
  } else {
    if (bankInfo.position.isLending) {
      if (isLendingMode) {
        return ActionType.Deposit;
      } else {
        return ActionType.Withdraw;
      }
    } else {
      if (isLendingMode) {
        return ActionType.Repay;
      } else {
        return ActionType.Borrow;
      }
    }
  }
}

export { AssetRow };

// isInLendingMode ? bankInfo.lendingRate : bankInfo.borrowingRate


// <TableRow className="h-full flex justify-between items-center min-h-[56px] sm:h-[56px] flex-col sm:flex-row p-0 px-4 sm:p-2 lg:p-4 border-solid border-[#1C2125] border rounded-xl gap-2 lg:gap-4">

  {/* <TableCell
    className="text-white h-full w-full border-hidden px-0.5 lg:pr-0 flex justify-center sm:justify-start items-center max-w-[250px] gap-1 min-w-fit"
  > */}
    {/* <div className="flex justify-start items-center min-w-fit">
      {
        bankInfo.tokenIcon && 
        <Image 
          src={bankInfo.tokenIcon} 
          alt={bankInfo.tokenName} 
          height={25} 
          width={25} 
          className="mr-2" 
        />}
      <div>
        <div className="font-aeonik">{bankInfo.tokenName}</div>
      </div>
    </div> */}
  {/* </TableCell> */}

  {/* <div
      className={`font-aeonik flex justify-center items-center px-2 ${
        isInLendingMode ? "text-[#3AFF6C]" : "text-[#EEB9BA]"
      } ${isInLendingMode ? "bg-[#3aff6c1f]" : "bg-[#db383e4d]"} rounded-xl text-sm`}
    >
      {
        bankInfo.tokenPrice >= 0.01
        ? usdFormatter.format(bankInfo.tokenPrice)
        : `$${bankInfo.tokenPrice.toExponential(2)}`
      }
    </div> */}

  {/* <AssetRowHeader
    assetName={bankInfo.tokenName}
    apy={isInLendingMode ? bankInfo.lendingRate : bankInfo.borrowingRate}
    icon={bankInfo.tokenIcon}
    isInLendingMode={isInLendingMode}
  /> */}

  {/* <TableCell className="h-full w-full flex py-1 px-0 mb-5 sm:mb-0 h-10 border-hidden flex justify-center items-center w-full max-w-[600px] min-w-fit">
    <AssetRowMetric
      longLabel="Current Price"
      shortLabel="Price"
      value={
        bankInfo.tokenPrice >= 0.01
          ? usdFormatter.format(bankInfo.tokenPrice)
          : `$${bankInfo.tokenPrice.toExponential(2)}`
      }
      borderRadius={isConnected ? "10px 0px 0px 10px" : "10px 0px 0px 10px"}
    />
    <AssetRowMetric
      longLabel={isInLendingMode ? "Total Pool Deposits" : "Total Pool Borrows"}
      shortLabel={isInLendingMode ? "Deposits" : "Borrows"}
      value={groupedNumberFormatter.format(
        isInLendingMode ? bankInfo.totalPoolDeposits : bankInfo.totalPoolBorrows
      )}
      borderRadius={isConnected ? "" : "0px 10px 10px 0px"}
      usdEquivalentValue={usdFormatter.format(
        (isInLendingMode ? bankInfo.totalPoolDeposits : bankInfo.totalPoolBorrows) * bankInfo.tokenPrice
      )}
    />
    {isConnected && (
      <AssetRowMetric
        longLabel={isInLendingMode ? "Wallet Balance" : "Available Liquidity"}
        shortLabel="Available"
        value={groupedNumberFormatter.format(
          isInLendingMode
            ? bankInfo.tokenMint.equals(WSOL_MINT)
              ? bankInfo.tokenBalance + nativeSolBalance
              : bankInfo.tokenBalance
            : bankInfo.availableLiquidity
        )}
        borderRadius="0px 10px 10px 0px"
        usdEquivalentValue={usdFormatter.format(
          (isInLendingMode
            ? bankInfo.tokenMint.equals(WSOL_MINT)
              ? bankInfo.tokenBalance + nativeSolBalance
              : bankInfo.tokenBalance
            : bankInfo.availableLiquidity) * bankInfo.tokenPrice
        )}
      />
    )}
  </TableCell> */}

  {/* {isConnected && (
    <TableCell className="py-1 px-0 h-10 border-hidden flex justify-center items-center">
      <AssetRowInputBox
        value={borrowOrLendAmount}
        setValue={setBorrowOrLendAmount}
        maxValue={maxAmount}
        maxDecimals={bankInfo.tokenMintDecimals}
      />
    </TableCell>
  )} */}

  {/* <TableCell className="p-1 h-10 border-hidden flex justify-center items-center my-5 sm:my-0">
    <div className="h-full w-full">
      <Tooltip
        title={marginfiAccount === null ? "User account while be automatically created on first deposit" : ""}
        placement="top"
      >
        <div className="h-full w-full flex justify-center items-center">
          <AssetRowAction onClick={borrowOrLend}>{currentAction}</AssetRowAction>
        </div>
      </Tooltip>
    </div>
  </TableCell> */}
// </TableRow>
