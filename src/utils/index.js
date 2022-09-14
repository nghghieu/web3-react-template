import { toast } from 'react-toastify';

import { TOAST_MESSAGE } from 'constants';

export const apiErrorHandler = (error, showToast = true) => {
  let title = '';
  let message = TOAST_MESSAGE.SOMETHING_WENT_WRONG;

  if (error.response) {
    title = error.response.data.title;
    message = error.response.data.message;
  } else if (error.request) {
    // eslint-disable-next-line no-underscore-dangle
    message = error.request._response;
  } else {
    message = error.message;
  }

  if (showToast) {
    toast.error(message);
  }

  return { title, message };
};

export const formatPoint = (point) => {
  const balances = point / 10 ** 18;

  if (Number.isInteger(balances)) return balances;

  return balances.toFixed(2);
};

export const formatWalletAddress = (address) => {
  const walletAddress = `${address.slice(0, 4)}...${address.substr(-5)}`;

  return walletAddress;
};

export const compareWalletAddress = (walletAddress1, walletAddress2) => (
  walletAddress1.toLowerCase() === walletAddress2.toLowerCase()
);

export const onClickComingSoon = () => {
  toast.warn(TOAST_MESSAGE.FEATURE_COMING_SOON);
};

export const truncateAddress = (address) => {
  if (!address) return 'No Account';
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/,
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return `0x${val.toString(16)}`;
};

export const LIMIT_PRICE = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
