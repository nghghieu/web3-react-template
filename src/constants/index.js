import { createRef } from 'react';

import { CHAIN_IDS_SUPPORTED } from 'utils/connectors';

export const web3Ref = createRef();

export const PROVIDER_TYPE = {
  PROVIDER: 'provider',
  INJECTED: 'injected',
  WALLET_CONNECT: 'walletConnect',
};

export const TOAST_MESSAGE = {
  // Metamask
  NOT_INSTALL_METAMASK: 'Please install metamask!',
  CHAIN_ID_NOT_SUPPORTED: `Current chain ID is not supported! We are supported ${CHAIN_IDS_SUPPORTED.join(', ')}`,
  WAITING_USER_ACCEPT: 'Waiting user accept',

  FEATURE_COMING_SOON: 'This feature is coming soon!',
  SOMETHING_WENT_WRONG: 'Something went wrong',
};
