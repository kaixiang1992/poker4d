import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import network from "./scatternetwork";
ScatterJS.plugins( new ScatterEOS());

const appname = process.env.NODE_ENV == 'production' ? 'poker4dtgame' : 'poker4dtgame';
const contractName = process.env.NODE_ENV == 'production' ? 'poker4dtgame' : 'poker4dtgame';

class eosscatteruntils {    
    constructor(coin, balance, precision){
        this.coin = coin;
        this.balance = balance;
        this.precision = precision;
        this.account = null; //TODO: 账户信息
        this.scatter = null; //TODO: scatter对象
        this.connected = false; //TODO: 是否登录成功
        this.eos = null;
    }
    /**
     * @description 初始化连接钱包
     */
    init(){
        return new Promise((resolve, reject) => {
            ScatterJS.connect(appname, {network}).then(connected => {
                if(!connected){
                    this.connected = false;
                    resolve(false);
                }else{
                    this.scatter= ScatterJS.scatter;
                    this.connected = true;
                    resolve(true);
                }
            });
        });
    }
    /**
     * @description 账户登录
     */
    async login(){
        await ScatterJS.login();
        return new Promise((resolve,reject) => {
            try {
                this.eos = this.scatter.eos(network, Eos);
                const account = this.scatter.identity.accounts.find(x => x.blockchain === 'eos');
                this.account = account;
                if(!this.connected){
                    this.connected = true;
                }
                resolve(this.account);
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * @description 获取账户余额
     * @param {String} accountname 账户名
     */
    async getAccount(accountname = null){
        if(!accountname){
            accountname =  this.account.name;
        }
        return new Promise((resolve,reject) => {
            this.eos.getAccount(accountname).then(({core_liquid_balance}) => {
                resolve(core_liquid_balance);
            }).catch((err) => {
                reject(err);
            });
        });
    }   
    /**
     * @description 退出登录
     */    
    async logout(){
        await this.scatter.forgetIdentity();
        this.destroy();
        return Promise.resolve(true);
    }
    /**
     * @description 查表操作
     */
    async getTableRows(opt){
        return new Promise((resolve, reject) => {
            this.eos.getTableRows({scope: contractName, code: contractName, ...opt}).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * @description 调用合约转账
     */
    async transfer(from, amount, memo, tokenname){
        const opts = { authorization:[`${this.account.name}@${this.account.authority}`] };
        return new Promise((resolve, reject) => {
            this.eos.contract(tokenname, {requiredFields:{}}).then(contract => {
                contract.transfer(from, contractName, amount, memo, opts).then(trx => {
                    resolve(trx);
                }).catch(err => {
                    reject(err);
                })
            })
        });
    }
    /**
     * @description 销毁变量
     */
    destroy(){
        this.coin = null;
        this.balance = null;
        this.precision = null;
        this.connected = false; //TODO: 是否登录成功
        this.eos = null;
        this.account = null;
    }
}

export default eosscatteruntils;