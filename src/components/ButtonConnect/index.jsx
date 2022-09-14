import React, { useState, useEffect, memo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';

import ModalConnect from 'components/ModalConnect';

import { web3Ref, PROVIDER_TYPE, TOAST_MESSAGE } from 'constants';

import connectors from 'utils/connectors';
// import { toHex } from 'utils';
// import networkParams from 'utils/networks';

function ButtonConnect() {
  const {
    account,
    activate,
    deactivate,
    library,
    error: web3Error,
    // chainId,
  } = useWeb3React();
  // const [signature, setSignature] = useState('');
  // const [network, setNetwork] = useState(undefined);
  // const [message, setMessage] = useState('');
  // const [signedMessage, setSignedMessage] = useState('');
  // const [error, setError] = useState('');
  // const [verified, setVerified] = useState();

  const [show, setShow] = useState(false);

  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  // const handleNetwork = (e) => {
  //   const id = e.target.value;
  //   setNetwork(Number(id));
  // };

  // const handleInput = (e) => {
  //   const msg = e.target.value;
  //   setMessage(msg);
  // };

  // const switchNetwork = async () => {
  //   try {
  //     await library.provider.request({
  //       method: 'wallet_switchEthereumChain',
  //       params: [{ chainId: toHex(network) }],
  //     });
  //   } catch (switchError) {
  //     if (switchError.code === 4902) {
  //       try {
  //         await library.provider.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [networkParams[toHex(network)]],
  //         });
  //       } catch (e) {
  //         setError(e);
  //       }
  //     }
  //   }
  // };

  // const signMessage = async () => {
  //   if (!library) return;
  //   try {
  //     const signatureMess = await library.provider.request({
  //       method: 'personal_sign',
  //       params: [message, account],
  //     });
  //     setSignedMessage(message);
  //     setSignature(signatureMess);
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  // const verifyMessage = async () => {
  //   if (!library) return;
  //   try {
  //     const verify = await library.provider.request({
  //       method: 'personal_ecRecover',
  //       params: [signedMessage, signature],
  //     });
  //     setVerified(verify === account.toLowerCase());
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  const refreshState = () => {
    window.localStorage.setItem(PROVIDER_TYPE.PROVIDER, undefined);
    web3Ref.current = null;
    // setNetwork('');
    // setMessage('');
    // setSignature('');
    // setVerified(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem(PROVIDER_TYPE.PROVIDER);
    if (provider) activate(connectors[provider]);
  }, []);

  useEffect(() => {
    if (!library || !library?.provider) return;

    const { provider } = library;

    web3Ref.current = new Web3(provider);

    // if (provider?.on) {
    //   const handleAccountsChanged = (accounts) => {
    //     if (accounts) {
    //       console.log('accountsChanged', accounts);
    //     }
    //   };

    //   const handleChainChanged = (_hexChainId) => {
    //     console.log('handleChainChanged ~ _hexChainId', _hexChainId);
    //   };

    //   const handleDisconnect = () => {
    //     disconnect();
    //   };

    //   provider.on('accountsChanged', handleAccountsChanged);
    //   provider.on('chainChanged', handleChainChanged);
    //   provider.on('disconnect', handleDisconnect);

    //   // eslint-disable-next-line consistent-return
    //   return () => {
    //     if (provider.removeListener) {
    //       provider.removeListener('accountsChanged', handleAccountsChanged);
    //       provider.removeListener('chainChanged', handleChainChanged);
    //       provider.removeListener('disconnect', handleDisconnect);
    //     }
    //   };
    // }
  }, [library]);

  useEffect(() => {
    // Handle error from web3React library
    if (web3Error) {
      let isDisconnect = false;

      const { name, message } = web3Error;

      switch (true) {
        case name === 'UnsupportedChainIdError':
          toast.error(TOAST_MESSAGE.CHAIN_ID_NOT_SUPPORTED);
          isDisconnect = true;
          break;
        case name === 'UserRejectedRequestError':
          toast.error(message);
          break;
        case message.includes('Request of type \'wallet_requestPermissions\' already pending'):
          toast.warn(TOAST_MESSAGE.WAITING_USER_ACCEPT);
          break;
        default:
          break;
      }

      if (isDisconnect) disconnect();
    }
  }, [web3Error]);

  return (
    <div>
      {account ? (
        <button
          type="button"
          onClick={disconnect}
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          type="button"
          onClick={onShow}
        >
          Connect Wallet
        </button>
      )}

      <ModalConnect
        show={show}
        onClose={onClose}
      />
    </div>
  );
}

export default memo(ButtonConnect);
