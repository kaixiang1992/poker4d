<template>
    <header class="app-header">
        <div class="app-header-left">
            <div class="nologin" @click="login" v-if="!account">登录</div>
            <div class="afterlogin" v-else>
                <img src="http://test.gdice.ppset.com.cn/Gdice/m_images/useravatar.png" alt="头像" class="img-response"/>
                <span class="username" v-html="account.name"></span>
                <!-- <span class="username">,{{currentEOS}} EOS</span> -->
            </div>
        </div>
        <!-- <div class="app-header-logo">
            <img src="https://www.gdice.one/Gdice/images/logo.png" alt="Gdice" class="img-response"/>
        </div> -->
        <div class="app-header-menu">
            <i class="icon iconfont icon-menu-two"></i>
        </div>
    </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import mixin from '@/mixin';
import config from '@/utils/network.js';
export default {
    name: 'app-header',
    computed: {
        ...mapGetters(['account','currentEOS'])
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
@import './tabheader.styl';
</style>
