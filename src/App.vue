<template>
  <div id="app" class="app">
    <tabheader></tabheader>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mixin from '@/mixin';
import tabheader from '@/base/tabheader/tabheader.vue';
export default {
  name: 'App',
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
    ...mapActions(['change_account'])
  },  
  components: {
    tabheader
  }
}
</script>
