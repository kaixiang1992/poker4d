<template>
  <div id="app" class="app">
    <tabheader @success="success"></tabheader>
    <router-view></router-view>
    <!-- TODO: 退出登录 -->
    <van-actionsheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mixin from '@/mixin';
import tabheader from '@/base/tabheader/tabheader.vue';
export default {
  name: 'App',
  data(){
    return {
      show: false,
      actions: [
        {
          name: '退出登录',
          methodsName: 'logout'
        }
      ]
    }
  },
  mixins: [mixin],
  mounted() {
    this.initaccount();
  },
  methods: {
    initaccount(){ //初始化用户账户
      new Promise(r => {
        document.addEventListener('scatterLoaded', r);
      }).then(() => {
        if (!scatter.identity) return;
        const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
        if(!account) return;
        this.change_account(account).then(() => {
          this.getEOS();
        });
      });
    },
    /**
     * @description 退出登录等菜单
     */
    success(obj){
      switch (obj.methodsName) {
        case "moremenu":
        {
          this.show = obj.data;
        };
        break;
        case "logout": 
        {
          scatter.forgetIdentity().then((res) => {
            this.show = obj.data;
            this.change_account(null);
            this.change_betopt({
              balance: 0 //当前余额
            });
          }).catch((err) => {
            console.log(err);
          });
        };
        break;
        default:
        break;
      }
    },
    /**
     * @description 退出登录
     */
    onSelect(item) {
      this.success({
        methodsName: item.methodsName,
        data: false
      });
    },
    ...mapActions(['change_account', 'change_betopt'])
  },  
  components: {
    tabheader
  }
}
</script>
