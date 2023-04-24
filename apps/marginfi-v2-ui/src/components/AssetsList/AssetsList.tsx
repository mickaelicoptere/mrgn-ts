import React, { FC, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, Skeleton, Table, TableHead, TableBody, TableContainer, TableRow, TableCell } from "@mui/material";
import { useBanks, useProgram, useUserAccounts } from "~/context";
import { BorrowLendToggle } from "./BorrowLendToggle";
import AssetRow from "./AssetRow";

const AssetsList: FC = () => {
  const [isInLendingMode, setIsInLendingMode] = useState(true);
  const { mfiClient } = useProgram();
  const { reload } = useBanks();
  const { extendedBankInfos, selectedAccount, nativeSolBalance } = useUserAccounts();
  const wallet = useWallet();

  // Hack required to circumvent rehydration error
  const [hasMounted, setHasMounted] = React.useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="col-span-full">
        <BorrowLendToggle isInLendingMode={isInLendingMode} setIsInLendingMode={setIsInLendingMode} />
      </div>

      <div className="col-span-full">
        <Card elevation={0} className="bg-[rgba(0,0,0,0)] w-full">
          <TableContainer>
            <Table className="table-fixed">
              <TableHead>
                <TableCell className="border-none"></TableCell>
                <TableCell className="text-white text-sm border-none px-2" style={{ fontFamily: "Aeonik Pro", fontWeight: 300, }} align="right">Price</TableCell>
                <TableCell className="text-white text-sm border-none px-2" style={{ fontFamily: "Aeonik Pro", fontWeight: 300, }} align="right">
                  {
                    isInLendingMode ? 'Lend APY' : 'Borrow APR' 
                  }
                </TableCell>
                <TableCell className="text-white text-sm border-none px-2" style={{ fontFamily: "Aeonik Pro", fontWeight: 300, }} align="right">
                  {
                    isInLendingMode ? 'Lend weights' : 'Borrow weights'
                  }
                </TableCell>
                <TableCell className="text-white text-sm border-none px-2" style={{ fontFamily: "Aeonik Pro", fontWeight: 300, }} align="right">
                  {
                    isInLendingMode ? 'Deposits' : 'Available'
                  }
                </TableCell>
                <TableCell className="text-white text-sm border-none px-2" style={{ fontFamily: "Aeonik Pro", fontWeight: 300, }} align="right">
                  Pool utilization
                </TableCell>
                {/* <TableCell className="text-white text-sm border-none px-2" style={{ fontFamily: "Aeonik Pro", fontWeight: 300, }} align="right"></TableCell> */}
                <TableCell className="border-none"></TableCell>
                <TableCell className="border-none"></TableCell>
              </TableHead>
              <TableBody>
                {extendedBankInfos.length > 0 ? (
                  extendedBankInfos.map((bankInfo) => (
                    <AssetRow
                      key={bankInfo.tokenName}
                      nativeSolBalance={nativeSolBalance}
                      bankInfo={bankInfo}
                      isInLendingMode={isInLendingMode}
                      isConnected={wallet.connected}
                      marginfiAccount={selectedAccount}
                      marginfiClient={mfiClient}
                      reloadBanks={reload}
                    />
                  ))
                ) : (
                  <LoadingAssets />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </>
  );
};

const LOADING_ASSETS = 3;

const LoadingAssets = () => (
  <>
    {[...new Array(LOADING_ASSETS)].map((_, index) => (
      <TableRow key={index}>
        <Skeleton
          component="td"
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          animation="wave"
          className="flex justify-between items-center h-[78px] p-0 px-2 sm:p-2 lg:p-4 border-solid border-[#1C2125] border rounded-xl gap-2 lg:gap-4"
        />
      </TableRow>
    ))}
  </>
);

export { AssetsList };
