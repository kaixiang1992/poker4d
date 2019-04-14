<template>
    <footer class="footerbet">
        <div class="footerbet-left">
            <div class="footerbet-options bigAssButtonPulse">
                <span class="footerbet-number">0.5</span>
                <span class="footerbet-currenty">EOS</span>
            </div>
            <div class="footerbet-options bigAssButtonPulse">
                <span class="footerbet-number">1</span>
                <span class="footerbet-currenty">EOS</span>
            </div>
            <div class="footerbet-options bigAssButtonPulse">
                <span class="footerbet-number">2</span>
                <span class="footerbet-currenty">EOS</span>
            </div>
            <div class="footerbet-options bigAssButtonPulse">
                <span class="footerbet-number">+0.5</span>
                <span class="footerbet-currenty">EOS</span>
            </div>
        </div>
        <div class="footerbet-right">
            <button class="redPulse" v-if="!account">登录</button>
            <button class="redPulse" v-else>投注</button>
        </div>
    </footer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import mixin from '@/mixin';
import config from '@/utils/network.js';
export default {
    name: 'footerbet',
    computed: {
        ...mapGetters(['account'])
    },
    data () {
        return {
                 
        }
    },
    mixins: [mixin],
    methods: {
        login() { //用户登录
            scatter.getIdentity({
                accounts: [config.network]
            }).then(() => {
                const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
                if (!account) return;
                this.change_account(account).then(() => {
                    this.getEOS();
                });
            }).catch(e => {
                console.log(e);
            });
        },
        ...mapActions(['change_account'])
    }
}
</script>
<style lang="stylus">
@import './footerbet.styl';
</style>


