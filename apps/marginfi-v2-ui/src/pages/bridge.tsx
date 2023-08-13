'use client'

import {useState, useEffect, useCallback} from "react";
import {useWallet} from "@solana/wallet-adapter-react";
import config from "~/config";
import Script from 'next/script';
import {BorrowLendToggle} from '~/components/AssetsList/BorrowLendToggle';
import {Transaction} from "@solana/web3.js";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";
import { toast } from "react-toastify";

type MayanWidgetChainName = 'solana' | 'ethereum' | 'bsc' | 'polygon' | 'avalanche' | 'arbitrum' | 'aptos';

// visit the Figma link below to see the color palette
// https://www.figma.com/community/file/1236300242311853150/Mayan-Widget
type MayanWidgetColors = {
    N000?: string;
    N100?: string;
    N300?: string;
    N500?: string;
    N600?: string;
    N700?: string;
    N900?: string;
    tLightBlue?: string;
    green?: string;
    lightGreen?: string;
    red?: string;
    lightRed?: string;
    lightYellow?: string;
    primary?: string;
    primaryGradient?: string;
    tWhiteLight?: string;
    tWhiteBold?: string;
    tBlack?: string;
    mainBox?: string;
    background?: string;
    darkPrimary?: string;
    alwaysWhite?: string;
    tableBg?: string;
    transparentBg?: string;
    transparentBgDark?: string;
    buttonBackground?: string;
    toastBgRed?: string;
    toastBgNatural?: string;
    toastBgGreen?: string;
};
type MayanWidgetConfigType = {
    appIdentity: {
        uri: string,
        icon: string, //should be relative
        name: string,
    }, //use for  Wallet Adapter
    rpcs?: { [index in MayanWidgetChainName]?: string },
    sourceChains?: MayanWidgetChainName[],
    destinationChains?: MayanWidgetChainName[],
    tokens?: {
        from?: { [index in MayanWidgetChainName]?: string[] },
        to?: { [index in MayanWidgetChainName]?: string[] },
        featured?: { [index in MayanWidgetChainName]?: string[] },
    },
    defaultGasDrop?: { [index in MayanWidgetChainName]?: number },
    referrerAddress?: string,
    colors?: MayanWidgetColors,
}

type TransactionSigner = (transaction: Transaction) => Promise<Transaction> | null | undefined;
type SolanaWalletData = {
    publicKey?: string | null,
    signTransaction?: TransactionSigner | null,
    onClickOnConnect: () => void,
    onClickOnDisconnect: () => void,
}

type MayanWidgetSolanaConfigType = MayanWidgetConfigType & {
    solanaWallet: SolanaWalletData,
}

type MayanSwapInfo = {
    hash: string,
    fromChain: MayanWidgetChainName,
    toChain: MayanWidgetChainName,
    fromToken: string,
    toToken: string,
    fromAmount: number
}
declare global {
    interface Window {
        MayanSwap: {
            init: (id: string, config: MayanWidgetConfigType) => void;
            updateSolanaWallet: (newData: SolanaWalletData) => void;
            updateConfig: (newConfig: MayanWidgetConfigType | MayanWidgetSolanaConfigType) => void;
            setSwapInitiateListener(callback: (swap: MayanSwapInfo) => void): void;
            removeSwapInitiateListener(): void;
            setSwapCompleteListener(callback: (swap: MayanSwapInfo) => void): void;
            removeSwapCompleteListener(): void;
            setSwapRefundListener(callback: (swap: MayanSwapInfo) => void): void;
            removeSwapRefundListener(): void;
        };
    }
}
const tokens = [
    'So11111111111111111111111111111111111111112', // SOL
    '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT', // UXD
    'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
    'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', // jitoSOL
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj', // stSOL
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
    'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1', // bSOL
    '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', // ETH
    '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh', // BTC
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
    'DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ', // DUST
    'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6', // KIN
    'hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux', // HNT
];

const appIdentity = {
    name: 'mayan on marginfi',
    icon: './marginfi_logo.png',
    uri: 'https://app.marginfi.com/',
};

const colors: MayanWidgetColors = {
    mainBox: '#010101',
    background: '#050606',
};

const rpcs = {
    solana: config.rpcEndpoint,
    ethereum: 'https://snowy-solemn-sea.discover.quiknode.pro',
    bsc: 'https://necessary-fabled-friday.bsc.quiknode.pro',
    polygon: 'https://cosmological-palpable-season.matic.quiknode.pro',
    avalanche: 'https://holy-empty-borough.avalanche-mainnet.quiknode.pro/',
    arbitrum: 'https://indulgent-light-scion.arbitrum-mainnet.quiknode.pro',
}
const referrerAddress = 'GhQ3NxahWcddaMa71rkDp1FdTfs2jBpjzCq3kzkv1mNZ';

const configs: MayanWidgetConfigType[] = [
    {
        appIdentity,
        colors,
        rpcs,
        referrerAddress,
        tokens: {
            to: {
                solana: tokens,

            }
        },
        sourceChains: ['ethereum', 'arbitrum', 'bsc', 'avalanche'],
        destinationChains: ['solana'],
    },
    {
        colors,
        appIdentity,
        rpcs,
        referrerAddress,
        tokens: {
            from: {
                solana: tokens,
            }
        },
        sourceChains: ['solana'],
        destinationChains: ['ethereum', 'arbitrum', 'bsc', 'polygon', 'avalanche'],
    }
];
const BridgePage = () => {
    const {publicKey, signTransaction, connect, disconnect, wallet} = useWallet();
    const {setVisible, visible} = useWalletModal();
    const [isBridgeIn, setIsBridgeIn] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const handleConnect = useCallback(async () => {
        try {
            if (!wallet) {
                setVisible(!visible);
            } else {
                await connect();
            }
        } catch (err) {
            console.error(err);
        }
    }, [connect, setVisible, wallet, visible, publicKey]);


    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.MayanSwap !== 'undefined') {
            window.MayanSwap.updateSolanaWallet({
                signTransaction,
                publicKey: publicKey ? publicKey.toString() : null,
                onClickOnConnect: handleConnect,
                onClickOnDisconnect: disconnect,
            })
        }
    }, [publicKey, signTransaction, handleConnect, disconnect]);

    const handleLoadMayanWidget = () => {
        const configIndex = isBridgeIn ? 0 : 1;
        const config = {
            ...configs[configIndex],
            solanaWallet: {
                publicKey: publicKey ? publicKey.toString() : null,
                signTransaction,
                onClickOnConnect: handleConnect,
                onClickOnDisconnect: disconnect,
            }
        };
        window.MayanSwap.init('swap_widget', config);
        window.MayanSwap.setSwapInitiateListener((data: MayanSwapInfo) => {
            toast.loading("Cross-chain swap/bridge in progress", {
                toastId: data.hash,
            });
        });
        window.MayanSwap.setSwapCompleteListener((data: MayanSwapInfo) => {
            toast.update(data.hash, {
                render: "Cross-chain swap/bridge done",
                toastId: data.hash,
                type: toast.TYPE.SUCCESS,
                autoClose: 5000,
                isLoading: false,
            });
        });
        window.MayanSwap.setSwapRefundListener((data: MayanSwapInfo) => {
            toast.update(data.hash, {
                render: "Cross-chain swap/bridge refunded",
                toastId: data.hash,
                type: toast.TYPE.WARNING,
                autoClose: 5000,
                isLoading: false,
            });
        });
        setIsLoaded(true);
    };

    const handleUpdateConfig = () => {
        const newConfigIndex = isBridgeIn ? 1 : 0;
        const config = {
            ...configs[newConfigIndex],
            solanaWallet: {
                publicKey: publicKey ? publicKey.toString() : null,
                signTransaction,
                onClickOnConnect: handleConnect,
                onClickOnDisconnect: disconnect,
            }
        };
        if (window.MayanSwap) {
            window.MayanSwap.updateConfig(config);
        } else {
            return;
        }
        setIsBridgeIn(prevState => !prevState);
    }


    return (
        <>
            <div
                className="w-full h-full flex flex-col justify-start items-center content-start py-[96px] sm:py-[32px] gap-8 w-4/5 max-w-7xl">
                <Script
                    src="https://cdn.mayan.finance/widget_solana-0-4-5.js"
                    integrity="sha256-mTVQLKvE422WDwtZQUcz/9u5ZK3T1vMfSO0omQvla0E="
                    crossOrigin="anonymous"
                    onReady={handleLoadMayanWidget}
                />
                <BorrowLendToggle isInLendingMode={isBridgeIn} setIsInLendingMode={handleUpdateConfig} leftTitle="In"
                                  rightTitle="Out" paddingConfigs={{left: "38px", right: "32px"}}/>
                <div id="swap_widget"></div>
            </div>
        </>
    );
};

export default BridgePage;