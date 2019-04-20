import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import eosscatteruntils from './utils/eosuntils';
import vueAwesomeCountdown from 'vue-awesome-countdown';

import './stylus/reset.styl';

Vue.use(vueAwesomeCountdown, 'vac');
Vue.config.productionTip = false;

const { coin, balance, precision } = store.state.betopt;
const until = new eosscatteruntils(coin, balance, precision);
until.init().then((res) => {
  store.dispatch('change_connected', res);
  if(!res){
    console.log('请先下载scatter插件钱包');
  }
});
Vue.prototype.$eosuntil = until;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
