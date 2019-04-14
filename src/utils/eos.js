import Eos from 'eosjs';
import config from './network';

export default Eos({
  httpEndpoint: `${config.network.protocol}://${config.network.host}:${config.network.port}`,
  chainId: config.network.chainId
}); 
