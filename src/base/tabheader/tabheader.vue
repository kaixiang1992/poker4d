<template>
    <header class="app-header">
        <div class="app-header-left">
            <div class="nologin" @click="login" v-if="!account">登录</div>
            <div class="afterlogin" v-else @click="moremenu">
                <img src="http://test.gdice.ppset.com.cn/Gdice/m_images/useravatar.png" alt="头像" class="img-response"/>
                <span class="username" v-html="account.name"></span>
            </div>
        </div>
        <div class="app-header-menu" @click="moremenu">
            <i class="icon iconfont icon-menu-two"></i>
        </div>
    </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import mixin from '@/mixin';
export default {
    name: 'app-header',
    computed: {
        ...mapGetters(['account','connected'])
    },
    mixins: [mixin],
    watch: {
        connected(val,old){
            if(val){
                this.login();
            }
        }
    },
    methods: {
        /**
         * @description 退出登录等菜单
         */
        moremenu(){
            this.$emit('success', {
                methodsName: 'moremenu',
                data: true
            });
        },
        ...mapActions(['change_account'])
    }
}
</script>
<style lang="stylus">
@import './tabheader.styl';
</style>
