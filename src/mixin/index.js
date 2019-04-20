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

        },
        ...mapActions(['change_betopt', 'change_account'])
    }
}