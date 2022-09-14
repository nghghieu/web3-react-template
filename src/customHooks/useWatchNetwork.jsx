import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';

function useWatchNetwork() {
  const user = useSelector((state) => state.userState.me);

  const handleChangeNetwork = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(process.env.REACT_APP_CHAIN_ID) }],
      });
    } catch (error) {
      if (process.env.REACT_APP_ENVIRONMENT === 'development') {
        console.log(error); // eslint-disable-line no-console
      }
    }
  }, []);

  const fetchNetworkInfo = useCallback(async () => {
    try {
      let chainId = null;
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

      await web3.eth.getChainId((_err, _chainId) => {
        chainId = _chainId;
      });

      if (chainId !== Number(process.env.REACT_APP_CHAIN_ID)) {
        handleChangeNetwork();
      }
    } catch (error) {
      if (process.env.REACT_APP_ENVIRONMENT === 'development') {
        console.log(error); // eslint-disable-line no-console
      }
    }
  }, [handleChangeNetwork]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      if (typeof window.ethereum !== 'undefined' && !!user.walletAddress) {
        fetchNetworkInfo();

        window.ethereum?.on?.('chainChanged', fetchNetworkInfo);

        window.ethereum?.on?.('accountsChanged', window.location.reload);

        return () => {
          window.ethereum?.removeListener?.('chainChanged', fetchNetworkInfo);
          window.ethereum?.removeListener?.(
            'accountsChanged',
            window.location.reload,
          );
        };
      }
    } catch (error) {
      if (process.env.REACT_APP_ENVIRONMENT === 'development') {
        console.log(error); // eslint-disable-line no-console
      }
    }
  }, [fetchNetworkInfo, user]);
}

export default useWatchNetwork;
