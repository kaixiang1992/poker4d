<template>
    <section class="home">
       
        <!-- TODO: 本轮开奖通告 -->
        <div class="notice-box">
            <van-notice-bar color="#ffd926" :text="lotteryinfotext" left-icon="volume-o" />
        </div>
        <!-- 展示本轮扑克牌 -->
        <div class="poker_result">
            <!-- <template v-if="betstatus == 1">
                <div class="poker_lfresult">
                    <img src="http://www.poker4d.club/poker/0.jpg" class="pokerbg" alt="">
                </div>
                <div class="poker_rtresult">
                    <img src="http://www.poker4d.club/poker/0.jpg" class="pokerbg" alt="">
                </div>
            </template>
            <template v-if="betstatus == 2">
                <div class="poker_lfresult">
                    <img src="http://www.poker4d.club/poker/0.jpg" class="pokerbg pokerunopened" alt="" v-show="!lotteryinfo.dragonvalue"/>
                    <img :src="'http://www.poker4d.club/poker/'+lotteryinfo.dragonvalue+'.jpg'" class="pokerbg pokerunopened" alt="" v-if="lotteryinfo.dragonvalue"/>
                </div>
                <div class="poker_rtresult">
                    <img src="http://www.poker4d.club/poker/0.jpg" class="pokerbg pokerunopened" alt="" v-show="!lotteryinfo.tigervalue"/>
                    <img :src="'http://www.poker4d.club/poker/'+lotteryinfo.tigervalue+'.jpg'" class="pokerbg pokerunopened" alt="" v-if="lotteryinfo.tigervalue"/>
                </div>
            </template> -->
            <div class="poker_lfresult">
                <img src="http://www.poker4d.club/poker/0.jpg" class="pokerbg pokerunopened" alt="" v-show="!lotteryinfo.dragonvalue"/>
                <img :src="'http://www.poker4d.club/poker/'+lotteryinfo.dragonvalue+'.jpg'" class="pokerbg pokerunopened" alt="" v-if="lotteryinfo.dragonvalue"/>
            </div>
            <div class="poker_rtresult">
                <img src="http://www.poker4d.club/poker/0.jpg" class="pokerbg pokerunopened" alt="" v-show="!lotteryinfo.tigervalue"/>
                <img :src="'http://www.poker4d.club/poker/'+lotteryinfo.tigervalue+'.jpg'" class="pokerbg pokerunopened" alt="" v-if="lotteryinfo.tigervalue"/>
            </div>
        </div>
        <!-- TODO: 下注币种 -->
        <div class="app_header_coinbox">
            <div class="coin_item" :class="{active: betopt.coin == 'EOS'}" @click="changebetcoin('EOS')">
                <span>EOS</span>
            </div>
            <div class="coin_item" :class="{active: betopt.coin == 'GDT'}" @click="changebetcoin('GDT')">
                <span>GDT</span>
            </div>
        </div>
        <!-- TODO: 下注金额 -->
        <div class="bet">
            <div class="bet_amount">
                <div class="bet_title">
                    <span>投入金额：</span>
                    <!-- TODO:下注开奖倒计时 -->
                    <div class="countdown-box" v-if="betstatus">
                        <span v-if="betstatus == 1">下注倒计时：</span>
                        <span v-if="betstatus == 2">开奖倒计时：</span>
                        <vac ref="cutdown" tag="span" :left-time="countdown" v-if="countdown"
                        @onFinish="(vac) => finish(vac)" @onProcess="(vac) => process(vac)">
                            <span slot="process" slot-scope="{ timeObj }" class="countdown">{{ timeObj.h }}:{{ timeObj.m }}:{{ timeObj.s }}s</span>
                        </vac>
                    </div>
                </div> 
                <div class="bet_body">
                    <div class="bet_amount_option">
                        <input type="number" v-model="amountInput" class="bet_amount_input"> 
                        <div class="bet_coin_name" v-html="betopt.coin"></div>
                    </div> 
                    <div class="bet_amount_multiple" @click="changebetamount(0.5)">1/2</div> 
                    <div class="bet_amount_multiple" @click="changebetamount(2)">x2</div> 
                    <div class="bet_amount_multiple bet_amount_all"  @click="changebetamount('all')">全部</div>
                </div>
            </div>
        </div>
        <!-- 扑克下注面板 -->
        <div class="poker_panel">
            <div class="poker-betroutine">
                <div class="poker-betbigoptions">
                    <div class="poker-betrange" :class="{active: bet.typeenum == 1}" @click="changebettype(1, 1)">
                        <span>龙赢</span>
                        <em>1赔1</em>
                    </div>
                </div>
                <div class="poker-betbigoptions middle">
                    <div class="poker-betrange" :class="{active: bet.typeenum == 6}" @click="changebettype(6, 8)">
                        <span>和</span>
                        <em>1赔8</em>
                    </div>
                </div>
                <div class="poker-betbigoptions">
                    <div class="poker-betrange" :class="{active: bet.typeenum == 7}" @click="changebettype(7, 1)">
                        <span>虎赢</span>
                        <em>1赔1</em>
                    </div>
                </div>
            </div>
            <div class="poker-morebet">
                <div class="poker-morebetlf">
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 3}" @click="changebettype(3, 0.75)">
                        <span>龙单</span>
                        <em>0.75x</em>
                    </div>
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 2}" @click="changebettype(2, 1.05)"> 
                        <span>龙双</span>
                        <em>1.05x</em>
                    </div>
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 4}" @click="changebettype(4, 0.9)">
                        <span>龙黑</span>
                        <em>0.9x</em>
                    </div>
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 5}" @click="changebettype(5, 0.9)">
                        <span>龙红</span>
                        <em>0.9x</em>
                    </div>
                </div>
                <div class="poker-morebetrt">
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 8}" @click="changebettype(8, 1.05)">
                        <span>虎双</span>
                        <em>1.05x</em>
                    </div>
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 9}" @click="changebettype(9, 0.75)">
                        <span>虎单</span>
                        <em>0.75x</em>
                    </div>
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 11}" @click="changebettype(11, 0.9)">
                        <span>虎红</span>
                        <em>0.9x</em>
                    </div>
                    <div class="poker-morebet-item" :class="{active: bet.typeenum == 10}" @click="changebettype(10, 0.9)">
                        <span>虎黑</span>
                        <em>0.9x</em>
                    </div>
                </div>
            </div>
        </div>
        <!-- TODO: 开始下注 -->
        <div class="start_gamebtn">
            <button v-if="!account" @click="login"><span>登 录</span></button>
            <button v-else :disabled="bet.disabled" :class="{disabled: bet.disabled}" @click="doAction">
                <span>投注</span> 
                <span class="user_banlance">余额：<em v-html="betopt.balance"></em><em>{{betopt.coin}}</em></span>
            </button>
        </div>
    </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { numToString, fixed, changeamount, randomID, changeDecimalBuZero } from '@/utils/math.js';
import card_map from '@/utils/config';
import mixin from '@/mixin';
import socket from "@/utils/socket.js";
import { constants } from 'crypto';
import { setTimeout } from 'timers';
export default {
    name: 'home',
    computed: {
        amountInput: {// 下注金额
            get() {
                if (!isNaN(Number(this.bet.amount))) {
                    return numToString(this.bet.amount);
                } else {
                    return 0
                }
            },
            set(v) {
                if (!isNaN(Number(v))) {
                    if (v < 0 || v == '' || v == null) v = 0;
                    if(v&&v.indexOf('.')!=-1){
                        let decimal=v.split('.')[1];
                        if(decimal.length>4){
                            this.bet.amount = fixed(v, 4); 
                        }else{
                            this.bet.amount = v; 
                        }
                    }else{
                       this.bet.amount = v; 
                    }
                } else {
                    this.bet.amount = 0;
                }
            }
        },
        lotteryinfotext(){
            if(this.betstatus == 1 && this.lotteryinfo.dragonvalue == '' && this.lotteryinfo.tigervalue == ''){
                if(this.betId){
                    return `第${this.betId}轮下注中...`;
                }else{
                    return '等待中...';
                }
            }else{
                let str = '';
                if(this.betId){
                    str +=`第${this.betId}轮，`;
                }
                if(this.lotteryinfo.resultstatus == 1){
                    str +=`龙胜，`;
                    this.lotteryinfo.dragonNumbertype == 'odd' ?  str +=`龙单数胜，` : str +=`龙双数胜，`;
                    this.lotteryinfo.dragonColor == 'black' ?  str +=`龙黑色胜` : str +=`龙红色胜`;
                    return str;
                }else if(this.lotteryinfo.resultstatus == 2){
                    str +=`虎胜，`;
                    this.lotteryinfo.tigerNumbertype == 'odd' ?  str +=`虎单数胜，` : str +=`虎双数胜，`;
                    this.lotteryinfo.tigerColor == 'black' ?  str +=`虎黑色胜` : str +=`虎红色胜`;
                    return str;
                }else if(this.lotteryinfo.resultstatus == 3){
                    str +=`和胜`;
                    return str;
                }else{
                    return '等待中...';
                }
            }
        },
        ...mapGetters(['betopt','account','coin'])
    },
    watch: {
        account(val,old){
            if(val){
                this.getnextgameid();
            }
        }  
    },
    data () {
        return {
            socket: null, //TODO: socket对象
            betId: null, // TODO: 当前下注betID    
            betstatus: null, //TODO: 1下注，2开奖倒计时
            countdown: null, //TODO: 倒计时
            cardMapArray: null, //TODO: 扑克数组
            bet: {
                amount: 1,
                typeenum: 6,
                randomstr: null,
                disabled: false
            },
            lotteryinfo: { //TODO: 开奖信息
                result: '', //TODO: 开奖结果
                resultstatus: 0, //TODO: 开奖结果状态码
                dragonvalue: '', //TODO: 龙牌value
                dragondesc: '', //TODO: 龙牌描述
                dragonColor: '', //TODO: 龙牌颜色
                dragonNumbertype: '', //TODO: 龙牌单双
                tigervalue: '', //TODO: 虎牌value
                tigerdesc: '', //TODO: 虎牌描述
                tigerColor: '', //TODO: 虎牌颜色
                tigerNumbertype: '' //TODO: 虎牌单双
            }
        }
    },
    created () {
        this.cardMapArray = Array.from(card_map);
        this.bet.randomstr = randomID();
    },
    mounted(){
        // TODO: 初始化websocket连接
        this.socket = new socket('wss://www.poker4d.club:10086/poker4d/webSocket');
        this.socket.doOpen();
        this.socket.on('open',() => {
            // TODO: 页面初始化后请求币种信息
            this.socket.send(JSON.stringify({
                methodName: "addMsgOrder", 
                body:{
                    userName: ""
                }}
            ));
        });
        this.socket.on('message', this.onMessage.bind(this));
        this.socket.on('close', this.onClose.bind(this));
    },
    mixins: [mixin],
    methods: {
        /**
         * @description 快捷改变下注额
         */
        changebetamount(val){ 
            if(val=='all'){
                if(this.account){ //已登录
                    this.bet.amount = parseFloat(fixed(this.betopt.balance, 4));
                }else{
                    this.$toast.fail('请先登录');
                }
            }else{
                this.bet.amount = parseFloat(fixed(changeamount(this.bet.amount, val, '*', 0), 4));
            }
        },
        /**
         * @description 快捷改变下注项
         */
        changebettype(type, odds){
            this.bet.typeenum = type;
        },
        /**
         * @description 获取当前下注ID
         */
        async getnextgameid(){
            try {
                let res = await this.$eosuntil.getTableRows({ 
                    "table":"vardic", 
                    "json": true
                });
                if(res.rows && res.rows.length){
                    let findbetiditem = res.rows.find( item => item.id == 6);
                    if(findbetiditem){
                        this.betId = parseInt(findbetiditem.value - 1);
                    }else{
                        this.betId = 1;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description 下注功能
         */
        doAction(){ //下注
            if(!this.account){
                this.$toast.fail('请先登录');
                return 
            }else{
                if(this.bet.amount == '' || this.bet.amount == null || isNaN(Number(this.bet.amount)) || !isFinite(Number(this.bet.amount))){
                    this.$toast('请输入投注金额');
                    return
                }
                if(Number(this.bet.amount) < this.betopt.minbet){
                    this.$toast(`投注金额>=${this.betopt.minbet}${this.betopt.coin}`);
                    return
                }
                if(Number(this.bet.amount) > Number(this.betopt.balance)){
                    this.$toast(`最大下注${this.betopt.balance}${this.betopt.coin}`);
                    return
                }
                let quantity = parseFloat(fixed(this.bet.amount, 4));
                quantity = changeDecimalBuZero(quantity, 4);
                let betopt = {
                    from: this.account.name, 
                    quantity: `${quantity} ${this.betopt.coin}`,
                    memo: `gamebet:${this.betId}:${this.bet.typeenum}:${this.bet.randomstr}` 
                }
                if(this.betopt.coin == 'EOS'){
                    betopt.tokenname = 'eosio.token'
                }
                if(this.betopt.coin == 'GDT'){
                    betopt.tokenname = 'poker4dtoken'
                }
                console.log('下注参数.....');
                console.log(betopt);
                this.bet.disabled = true;
                this.$eosuntil.transfer(betopt.from, betopt.quantity, betopt.memo, betopt.tokenname).then((res) => {
                    if(res.broadcast){
                        this.getBetresult();
                        this.getEOS(this.account.name, this.betopt.coin);
                    }else{
                        this.bet.disabled = false;
                    }
                }).catch((err) => {
                    this.$toast('下注异常或用户取消');
                    this.bet.disabled = false;
                    console.log(err);
                });
            }
        },
        /**
         * @description 获取投注结果
         */
        async getBetresult(){
            try {
                let res = await this.$eosuntil.getTableRows({ 
                    "table": "bet", 
                    "lower_bound":4,
                    "limit": 50,
                    "json": true
                });
                console.log('获取投注结果....');
                console.log(res);
                this.bet.disabled = false;
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description 倒计时进行中
         */
        process(vac){
            if(this.betstatus == 1 && (this.lotteryinfo.dragonvalue || this.lotteryinfo.tigervalue) && vac.runTimes >= 10){
                this.resetlotteryinfo();
                this.getnextgameid();
            }
        },
        /**
         * @description 倒计时结束
         */
        finish(vac){
            if(this.betstatus == 1){ //TODO: 投注倒计时结束\
                this.countdown = null;
                this.bet.disabled = true;
                this.betstatus = 2;
                setTimeout(() => {
                    this.countdown = 14000;
                }, 200);
            }else{
                this.bet.randomstr = randomID();
                // this.getnextgameid();
                this.countdown = null;
                this.betstatus = null;
            }
        },
        /**
         * @description 计算开奖结果
         * @param {Number} card_number1
         * @param {Number} card_number2
         */
        computedresult(card_number1, card_number2){
            this.lotteryinfo.dragonvalue = this.cardMapArray[card_number1][0];
            this.lotteryinfo.dragondesc = `${this.cardMapArray[card_number1][1].card_color_desc}${this.cardMapArray[card_number1][1].card_value}`;
            this.lotteryinfo.tigervalue = this.cardMapArray[card_number2][0];
            this.lotteryinfo.tigerdesc = `${this.cardMapArray[card_number2][1].card_color_desc}${this.cardMapArray[card_number2][1].card_value}`;
            let dragon_value = Math.floor(this.cardMapArray[card_number1][0] % 100);
            let dragon_color = Math.floor(this.cardMapArray[card_number1][0] / 100);
            let tiger_value = Math.floor(this.cardMapArray[card_number2][0] % 100);
            let tiger_color = Math.floor(this.cardMapArray[card_number2][0] / 100);
            // TODO: 判断输赢 和
            if (dragon_value < tiger_value) {
                this.lotteryinfo.result = 'dragonWin'; //TODO: 龙赢
                this.lotteryinfo.resultstatus = 1;
            }else if (dragon_value == tiger_value) {
                if (dragon_color < tiger_color) { 
                    this.lotteryinfo.result = 'dragonWin'; //TODO: 龙赢
                    this.lotteryinfo.resultstatus = 1;
                } else if (dragon_color == tiger_color) { 
                    this.lotteryinfo.result = 'same'; //TODO: 和
                    this.lotteryinfo.resultstatus = 3;
                } else { 
                    this.lotteryinfo.result = 'tigerWin'; //TODO: 和
                    this.lotteryinfo.resultstatus = 2;
                } 
            }else { 
                this.lotteryinfo.result = 'tigerWin'; //TODO: 和
                this.lotteryinfo.resultstatus = 2;
            } 
            // TODO: 判断颜色
            if (dragon_color == 1 || dragon_color == 3) {
                this.lotteryinfo.dragonColor = 'black';
            } else { 
                this.lotteryinfo.dragonColor = 'red';
            } 
            if (tiger_color == 1 || tiger_color == 3) { 
                this.lotteryinfo.tigerColor = 'black';
            } else { 
                this.lotteryinfo.tigerColor = 'red';
            } 
            // TODO: 判断单双
            if (dragon_value % 2 == 1 || dragon_value == 12) { 
                this.lotteryinfo.dragonNumbertype = 'odd';
            } else { 
                this.lotteryinfo.dragonNumbertype = 'even';
            } 
            if (tiger_value % 2 == 1 || tiger_value == 12) { 
                this.lotteryinfo.tigerNumbertype = 'odd';
            } else { 
                this.lotteryinfo.tigerNumbertype = 'even';
            } 
        },
        /**
         * @description 重置开奖信息
         */
        resetlotteryinfo(){
            this.lotteryinfo = Object.assign(this.lotteryinfo, {
                result: '', 
                resultstatus: 0,
                dragondesc: '',
                dragonColor: '',
                dragonvalue: '',
                dragonNumbertype: '',
                tigerdesc: '',
                tigerColor: '',
                tigervalue: '',
                tigerNumbertype: ''
            });
        },
        /**
         * @description 接收websocket消息
         */
        onMessage(e){
            let obj = e;
            switch (obj.msgType) {
                case 'BET': //TODO: 下注阶段
                {
                    if(this.betstatus != 2 && !this.countdown){
                        this.bet.disabled = false;
                        let diff = parseInt(obj.body) * 1000;
                        this.countdown = diff;
                        this.betstatus = 1;
                    }
                };
                break;
                case 'LF':
                {
                    this.computedresult(obj.body.dragonValue, obj.body.tigerValue);
                };
                break;
                default:
                break;
            }
        },
        /**
         * @deprecated 关闭websocket 
         */
        onClose(e){
            console.log(e);
        },
        /**
         * @description 切换下注币种
         */
        changebetcoin(coin){
            if(this.betopt.coin.toUpperCase() == coin){
                return 
            }
            this.change_betopt({
                coin: coin.toUpperCase()
            });
            if(this.account){
                this.getEOS(this.account.name, coin);
            }else{
                this.getEOS(null, coin);
            }
        },
        ...mapActions(['change_account','change_betopt'])
    }
}
</script>
<style lang="stylus">
@import '../../stylus/home.styl';
</style>

