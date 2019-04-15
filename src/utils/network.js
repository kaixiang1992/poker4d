const config = {
    contractName: process.env.NODE_ENV != 'production' ? 'poker4dtgame' : 'poker4dtgame',
    network: {
        blockchain: 'eos',
        host: process.env.NODE_ENV != 'production' ? 'api1.eosasia.one' : '//api-kylin.eosasia.one',
        port: 443, 
        protocol: 'https',
        chainId: process.env.NODE_ENV != 'production' ? 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' : '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191' 
    }
}

export default config;