import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const CHAIN_IDS_SUPPORTED = [1, 3, 4, 5, 42];

const injected = new InjectedConnector({
  supportedChainIds: CHAIN_IDS_SUPPORTED,
});

const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

const connectors = {
  injected,
  walletConnect: walletconnect,
};

export default connectors;
