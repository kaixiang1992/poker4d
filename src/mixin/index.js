import { mapActions, mapGetters } from "vuex";
import api from '@/utils/eos';
export default {
    computed: {
        ...mapGetters(['account'])
    },
    methods: {
        getEOS() { //获取EOS余额
            if (!this.account.name) {
              this.change_currentEOS(0);
              return;
            }
            return api.getAccount(this.account.name).then(({ core_liquid_balance }) => {
                let balance = Number(core_liquid_balance.replace(/\sEOS/, ''));
                balance = balance <= 0 ? 0 : balance;
                this.change_currentEOS(balance);
            });
        },
        ...mapActions(['change_currentEOS'])
    }
}