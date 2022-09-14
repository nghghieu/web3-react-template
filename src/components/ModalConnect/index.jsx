import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import connectors from 'utils/connectors';

import { PROVIDER_TYPE, TOAST_MESSAGE } from 'constants';

function ModalConnect(props) {
  const {
    show,
    onClose,
  } = props;
  const { activate } = useWeb3React();

  const handleLogin = useCallback((providerType) => () => {
    if (providerType === PROVIDER_TYPE.INJECTED && !window?.ethereum) {
      return toast.error(TOAST_MESSAGE.NOT_INSTALL_METAMASK);
    }

    let active = null;
    let provider = null;

    switch (providerType) {
      case PROVIDER_TYPE.INJECTED:
        active = connectors.injected;
        provider = PROVIDER_TYPE.INJECTED;
        break;
      case PROVIDER_TYPE.WALLET_CONNECT:
        active = connectors.walletConnect;
        provider = PROVIDER_TYPE.WALLET_CONNECT;
        break;
      default:
        break;
    }

    activate(active);
    window.localStorage.setItem(PROVIDER_TYPE.PROVIDER, provider);
    onClose();

    return null;
  }, [activate]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <Button
            onClick={handleLogin(PROVIDER_TYPE.INJECTED)}
          >
            Metamask
          </Button>
        </div>
        <div>
          <Button
            onClick={handleLogin(PROVIDER_TYPE.WALLET_CONNECT)}
          >
            WalletConnect
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ModalConnect.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(ModalConnect);
