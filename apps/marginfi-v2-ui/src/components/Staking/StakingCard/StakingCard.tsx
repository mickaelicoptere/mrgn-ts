import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { TextField, Typography } from "@mui/material";
import * as solanaStakePool from "@solana/spl-stake-pool";
import { WalletIcon } from "./WalletIcon";
import { PrimaryButton } from "./PrimaryButton";
import { useJupiterStore, useLstStore } from "~/pages/stake";
import { useWalletContext } from "~/components/useWalletContext";
import { Wallet, numeralFormatter, processTransaction, shortenAddress } from "@mrgnlabs/mrgn-common";
import { ArrowDropDown } from "@mui/icons-material";
import { StakingModal } from "./StakingModal";
import Image from "next/image";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useJupiter } from "@jup-ag/react-hook";
import JSBI from "jsbi";
import { usePrevious } from "~/utils";

const SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");

const SUPPORTED_TOKENS = [
  new PublicKey("So11111111111111111111111111111111111111112"),
  new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"),
];

export interface TokenData {
  mint: PublicKey;
  symbol: string;
  iconUrl: string;
  balance: number;
}

export const StakingCard: FC = () => {
  const { connection } = useConnection();
  const { connected, wallet, walletAddress,  openWalletSelector } = useWalletContext();
  const [lstData, userData] = useLstStore((state) => [state.lstData, state.userData]);
  const [tokenMap, tokenAccountMap] = useJupiterStore((state) => [state.tokenMap, state.tokenAccountMap]);

  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [selectedMint, setSelectedMint] = useState<PublicKey>(SOL_MINT);

  const jupiter = useJupiter({
    amount: JSBI.BigInt(1 * 10 ** 6), // raw input amount of tokens
    inputMint: selectedMint,
    outputMint: SOL_MINT,
    slippageBps: 1, // 0.1% slippage
    debounceTime: 250, // debounce ms time before refresh
  });
  
  const prevWalletAddress = usePrevious(walletAddress);
  useEffect(() => {
    if (!walletAddress && prevWalletAddress || walletAddress && !prevWalletAddress) {
      setDepositAmount(0);
      setSelectedMint(SOL_MINT);
    }
  }, [walletAddress, prevWalletAddress]);

  const maxDeposit: number | null = useMemo(() => userData?.nativeSolBalance ?? null, [userData]);

  const selectedMintInfo: TokenData | undefined = useMemo(() => {
    if (!userData || tokenMap.size === 0) return undefined;

    const tokenInfo = tokenMap.get(selectedMint.toString());
    if (!tokenInfo) throw new Error(`Token ${selectedMint.toBase58()} not found`);

    let walletBalance: number;
    if (selectedMint.equals(SOL_MINT)) {
      walletBalance = userData.nativeSolBalance;
    } else {
      const tokenAccount = tokenAccountMap.get(selectedMint.toString());
      if (!tokenAccount) throw new Error(`Token account ${selectedMint.toBase58()} not found`);
      walletBalance = tokenAccount.balance;
    }

    return {
      mint: selectedMint,
      symbol: tokenInfo.symbol,
      iconUrl: tokenInfo.logoURI ?? "/info_icon.png",
      balance: walletBalance,
    };
  }, [selectedMint, userData, tokenMap, tokenAccountMap]);

  const supportedTokensForUser: TokenData[] = useMemo(() => {
    if (!userData || !tokenAccountMap) return [];
    const ownedMints = SUPPORTED_TOKENS.filter((mint) => tokenAccountMap.has(mint.toString()));
    return ownedMints.map((mint) => {
      const tokenInfo = tokenMap.get(mint.toString());
      if (!tokenInfo) throw new Error(`Token ${mint.toBase58()} not found`);

      let walletBalance: number;
      if (selectedMint.equals(SOL_MINT)) {
        walletBalance = userData.nativeSolBalance;
      } else {
        const tokenAccount = tokenAccountMap.get(selectedMint.toString());
        if (!tokenAccount) throw new Error(`Token account ${selectedMint.toBase58()} not found`);
        walletBalance = tokenAccount.balance;
      }

      return {
        mint,
        symbol: tokenInfo.symbol,
        iconUrl: tokenInfo.logoURI ?? "/info_icon.png",
        balance: walletBalance,
      };
    });
  }, [userData, tokenAccountMap, tokenMap, selectedMint]);

  const onChange = useCallback(
    (event: NumberFormatValues) => setDepositAmount(event.floatValue ?? 0),
    [setDepositAmount]
  );

  const onMint = useCallback(async () => {
    if (!lstData || !wallet) return;
    console.log("depositing", depositAmount, selectedMint);
    try {
      await depositToken(lstData.poolAddress, depositAmount, selectedMint, connection, wallet);
    } finally {
      setDepositAmount(0);
    }
  }, [connection, depositAmount, lstData, selectedMint, wallet]);

  return (
    <>
      <div className="relative flex flex-col gap-3 rounded-xl bg-[#1C2023] px-8 py-6 max-w-[480px] w-full">
        <div className="flex flex-row justify-between w-full">
          <Typography className="font-aeonik font-[400] text-lg">Deposit</Typography>
          {connected && maxDeposit !== null && (
            <div className="flex flex-row gap-2 items-center">
              <div className="leading-5">
                <WalletIcon />
              </div>
              <Typography className="font-aeonik font-[400] text-sm leading-5">
                {userData ? numeralFormatter(userData.nativeSolBalance) : "-"}
              </Typography>
              <a
                className={`font-aeonik font-[700] text-base leading-5 ml-2 ${
                  !maxDeposit ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-[#DCE85D]"
                }`}
                onClick={() => setDepositAmount(maxDeposit)}
              >
                MAX
              </a>
            </div>
          )}
        </div>

        <NumericFormat
          placeholder="0"
          value={depositAmount}
          allowNegative={false}
          decimalScale={9}
          onValueChange={onChange}
          thousandSeparator=","
          customInput={TextField}
          size="small"
          isAllowed={(values) => {
            const { floatValue } = values;
            if (maxDeposit === null) return true;
            if (maxDeposit === 0) return false;
            return floatValue ? floatValue < maxDeposit : true;
          }}
          sx={{
            input: { textAlign: "right", MozAppearance: "textfield" },
            "input::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderWidth: "0px",
              },
            },
          }}
          className="bg-[#0F1111] p-2 rounded-xl"
          InputProps={
            tokenMap.size > 0
              ? {
                  className: "font-aeonik text-[#e1e1e1] p-0 m-0",
                  startAdornment: (
                    <DropDownButton
                      supportedTokens={supportedTokensForUser}
                      depositAmount={depositAmount}
                      setDepositAmount={setDepositAmount}
                      selectedMintInfo={
                        selectedMintInfo ?? {
                          mint: SOL_MINT,
                          iconUrl: "/info_icon.png",
                          symbol: "SOL",
                        }
                      }
                      setSelectedMint={setSelectedMint}
                    />
                  ),
                }
              : {}
          }
        />

        <div className="flex flex-row justify-between w-full my-auto pt-2">
          <Typography className="font-aeonik font-[400] text-lg">You will receive</Typography>
          <Typography className="font-aeonik font-[700] text-xl text-[#DCE85D]">
            {lstData ? numeralFormatter(depositAmount / lstData.lstSolValue) : "-"} $LST
          </Typography>
        </div>
        <div className="py-7">
          <PrimaryButton disabled={connected && (!maxDeposit || depositAmount == 0)} onClick={connected ? onMint : openWalletSelector}>
            {connected ? "Mint" : "Connect"}
          </PrimaryButton>
        </div>
        <div className="flex flex-row justify-between w-full my-auto">
          <Typography className="font-aeonik font-[400] text-base">Current price</Typography>
          <Typography className="font-aeonik font-[700] text-lg">
            1 $LST = {lstData ? lstData.lstSolValue : "-"} SOL
          </Typography>
        </div>
        <div className="flex flex-row justify-between w-full my-auto">
          <Typography className="font-aeonik font-[400] text-base">Deposit fee</Typography>
          <Typography className="font-aeonik font-[700] text-lg">0%</Typography>
        </div>
      </div>
    </>
  );
};

interface DropDownButtonProps {
  supportedTokens: TokenData[];
  depositAmount: number;
  setDepositAmount: Dispatch<SetStateAction<number>>;
  selectedMintInfo: { mint: PublicKey; symbol: string; iconUrl: string };
  setSelectedMint: Dispatch<SetStateAction<PublicKey>>;
  disabled?: boolean;
}

const DropDownButton: FC<DropDownButtonProps> = ({ supportedTokens, selectedMintInfo, setSelectedMint, disabled }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`flex flex-row justify-between items-center py-2 px-3 text-white bg-[#303030] rounded-lg ${
          disabled ? "opacity-50" : "cursor-pointer hover:bg-[#2D2D2D]"
        }`}
      >
        <div className="w-[24px] mr-2">
          <Image src={selectedMintInfo.iconUrl} alt="token logo" height={24} width={24} />
        </div>
        <Typography className="font-aeonik font-[500] text-lg mr-1">{selectedMintInfo.symbol}</Typography>
        <ArrowDropDown sx={{width: "20px", padding: 0 }} />
      </div>

      <StakingModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        supportedTokens={supportedTokens}
        setSelectedMint={setSelectedMint}
      />
    </>
  );
};

async function depositToken(
  stakePoolAddress: PublicKey,
  depositAmount: number,
  mint: PublicKey,
  connection: Connection,
  wallet: Wallet
) {
  if (!mint.equals(SOL_MINT)) throw new Error("Only SOL is supported for now");
  console.log("1 depositing", depositAmount, mint);
  const _depositAmount = depositAmount * 1e9;
  console.log("2 depositing", _depositAmount, mint);

  const { instructions, signers } = await solanaStakePool.depositSol(
    connection,
    stakePoolAddress,
    wallet.publicKey,
    _depositAmount,
    undefined
  );

  const tx = new Transaction().add(...instructions);

  const sig = await processTransaction(connection, wallet, tx, signers, { dryRun: false });

  console.log(`Staked ${depositAmount} ${shortenAddress(mint)} with signature ${sig}`);
}
