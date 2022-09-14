import { web3Ref } from 'constants';

const getContracts = () => {
  try {
    if (!web3Ref.current) {
      return {};
    }

    return {

    };
  } catch (error) {
    return null;
  }
};

export default getContracts;
