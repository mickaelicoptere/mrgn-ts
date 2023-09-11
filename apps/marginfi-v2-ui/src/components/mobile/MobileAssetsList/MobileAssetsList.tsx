import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import { Skeleton, Switch, Typography } from "@mui/material";

import { useMrgnlendStore, useUserProfileStore } from "~/store";
import { useWalletContext } from "~/hooks/useWalletContext";
import { BorrowLendToggle } from "~/components/common/AssetList";
import { MrgnTooltip } from "~/components/common/MrgnTooltip";

import { AssetCard } from "./AssetCard";

export const MobileAssetsList: FC = () => {
  const [isFiltered, setIsFiltered] = useState(false);
  const togglePositions = () => setIsFiltered((previousState) => !previousState);

  const { connected } = useWalletContext();
  const [isStoreInitialized, sortedBanks, nativeSolBalance, selectedAccount] = useMrgnlendStore((state) => [
    state.initialized,
    state.extendedBankInfos,
    state.nativeSolBalance,
    state.selectedAccount,
  ]);
  const [lendZoomLevel, showBadges, setShowBadges] = useUserProfileStore((state) => [
    state.lendZoomLevel,
    state.showBadges,
    state.setShowBadges,
  ]);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [isInLendingMode, setIsInLendingMode] = useState(true);

  return (
    <>
      <div className="col-span-full">
        <BorrowLendToggle isInLendingMode={isInLendingMode} setIsInLendingMode={setIsInLendingMode} />
      </div>
      <div className="flex flex-row gap-1 col-span-full">
        <Switch checked={isFiltered} onChange={togglePositions} inputProps={{ "aria-label": "controlled" }} />
        <div className="my-auto">Filter my positions</div>
      </div>
      <div className="col-span-full">
        <div className="font-aeonik font-normal flex items-center text-2xl text-white pb-2">Global pool</div>
        <div className="flex flew-row flex-wrap gap-4">
          {sortedBanks
            .filter((b) => !b.info.state.isIsolated)
            .filter((b) => (isFiltered ? b.isActive : true))
            .map((bank, i) =>
              isStoreInitialized ? (
                <AssetCard
                  key={bank.meta.tokenSymbol}
                  nativeSolBalance={nativeSolBalance}
                  bank={bank}
                  isInLendingMode={isInLendingMode}
                  isConnected={connected}
                  marginfiAccount={selectedAccount}
                  inputRefs={inputRefs}
                />
              ) : (
                <Skeleton
                  key={bank.meta.tokenSymbol}
                  sx={{ bgcolor: "grey.900" }}
                  variant="rounded"
                  width={390}
                  height={215}
                />
              )
            )}
        </div>
      </div>
      <div className="col-span-full">
        <div className="font-aeonik font-normal flex gap-1 items-center text-2xl text-white pb-2">
          Isolated pool
          <MrgnTooltip
            title={
              <>
                <Typography color="inherit" style={{ fontFamily: "Aeonik Pro" }}>
                  Isolated pools are risky ⚠️
                </Typography>
                Assets in isolated pools cannot be used as collateral. When you borrow an isolated asset, you cannot
                borrow other assets. Isolated pools should be considered particularly risky. As always, remember that
                marginfi is a decentralized protocol and all deposited funds are at risk.
              </>
            }
            placement="top"
          >
            <Image src="/info_icon.png" alt="info" height={16} width={16} />
          </MrgnTooltip>
        </div>
        <div className="flex flew-row flex-wrap gap-4">
          {sortedBanks
            .filter((b) => b.info.state.isIsolated)
            .filter((b) => (isFiltered ? b.isActive : true))
            .map((bank, i) =>
              isStoreInitialized ? (
                <AssetCard
                  key={bank.meta.tokenSymbol}
                  nativeSolBalance={nativeSolBalance}
                  bank={bank}
                  isInLendingMode={isInLendingMode}
                  isConnected={connected}
                  marginfiAccount={selectedAccount}
                  inputRefs={inputRefs}
                />
              ) : (
                <Skeleton
                  key={bank.meta.tokenSymbol}
                  sx={{ bgcolor: "grey.900" }}
                  variant="rounded"
                  width={365}
                  height={215}
                />
              )
            )}
        </div>
      </div>
    </>
  );
};