import { providers } from 'ethers';
import addresses from '../lib/addresses';
import ABIS from '../lib/abis/index';

const SUPPORTED_NETWORKS = {
  1: 'mainnet',
  2: 'ropsten',
  42: 'kovan',
};

class ContractSettings {
  /**
   * @constructor
   * @param provider {Object} - ethers.js provider object - default ethers.providers.getDefaultProvider()
   * @param signer {Object} - one of 4 provided signers or a custom ethers.js compatible signer. Use Metamask for Dapp browser support
   * @param networkId {Number} - default 1 - mainnet, also supports 42 (Kovan)
   */
  constructor(contractSettings) {
    contractSettings = contractSettings || {};
    let { provider, signer, networkId } = contractSettings;
    this.provider = provider || providers.getDefaultProvider();
    if (!provider && networkId) {
      this.provider = providers.getDefaultProvider(SUPPORTED_NETWORKS[Number(networkId)]);
    }
    this.signer = signer;
    this.networkId = networkId || 42;
    this.addressList = addresses[this.networkId];
    this.ABIS = ABIS;
  }
}

ContractSettings.SUPPORTED_NETWORKS = SUPPORTED_NETWORKS;

export default ContractSettings;
