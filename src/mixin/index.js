import { mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(['account', 'coin'])
    },
    methods: {
        /**
         * @description 登录
         */
        login(){
            this.$eosuntil.login().then((res) => {
                if(res){
                    this.change_account(res);
                    this.getEOS(res.name, this.coin);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        /**
         * @description 获取账户EOS余额
         */
        getEOS(accountname = null, coin = null) { 
            if (!accountname) {
              this.change_betopt({
                balance: 0
              });
              return;
            }
            if(coin.toUpperCase() == 'EOS'){
                this.$eosuntil.getAccount(accountname).then((res) => {
                    if(res){
                        let coinreg = new RegExp(`\\s${coin.toUpperCase()}`);
                        let balance = Number(res.replace(coinreg, ''));
                        balance = balance <= 0 ? 0 : balance;
                        this.change_betopt({
                            balance
                        });
                    }else{
                        this.change_betopt({
                            balance: 0
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                this.$axios.get('/dtgame/getBalance', {params: {
                    contractName: 'poker4dtoken',
                    userName: accountname,
                    assetName: coin.toUpperCase()
                }}).then((res) => {
                    if(res.code == 0 && res.body){
                        this.change_betopt({
                            balance: res.body.amount
                        });
                    }else{
                        this.change_betopt({
                            balance: 0
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    this.change_betopt({
                        balance: 0
                    });
                });
            }
        },
        ...mapActions(['change_betopt', 'change_account'])
    }
}