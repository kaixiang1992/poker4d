const network = {
    blockchain: 'eos',
    chainId: process.env.NODE_ENV == 'production' ? 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' : '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
    host: process.env.NODE_ENV == 'production' ? 'nodes.get-scatter.com' : 'dev.cryptolions.io',
    port: process.env.NODE_ENV == 'production' ? 443 : 18888,
    protocol: process.env.NODE_ENV == 'production' ? 'https' : 'http'
};

export default network;