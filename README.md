# poker4d
EOS 龙虎斗游戏

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 麒麟测试网
https://kylin.eosx.io/tools/account/create

# 账户
{
    "msg": "succeeded", 
    "keys": {
        "active_key": {
            "public": "EOS6wnKfXPgQCDkv1B4SjDra5A6wuZG2jiTHtRZFwtcjyMCoPdeEN", 
            "private": "5JgFEvF4Cg8F9K1vUgcuVMrQbNipJttxq3LBKgtGkjUfLeWxFMK"}, 
        "owner_key": {
            "public": "EOS8KuYLpX4uuJJfvRdTRgjobDRaNfzLMpMbS1Lb7zTac8KyB5EVe", 
            "private": "5JJbbCKLLFSQfYAfYEjxnf2xM9eKbJuvHha5LbwMXXd5tvNqdTh"
        }
    }, 
    "account": "eospokerdt14"
}

# 合约地址
https://kylin.eosx.io/account/myeosgame111?mode=contract&sub=tables&table=bet&lowerBound=&upperBound=&limit=100

# 扑克素材
http://www.58pic.com/newpic/10185276.html

# 赔率
enum bet_type_enum : int8_t {
    DRAGON_WIN = 1, // 龙赢
    DRAGON_EVEN = 2, // 龙双
    DRAGON_ODD = 3, // 龙单
    DRAGON_BLACK = 4, // 龙黑
    DRAGON_RED = 5, // 龙红
    SAME = 6,
    TIGER_WIN = 7, // 虎赢
    TIGER_EVEN = 8, // 虎双
    TIGER_ODD = 9, // 虎单
    TIGER_BLACK = 10, // 虎黑
    TIGER_RED = 11, // 虎红
};

static const map<int,int> wins_map = { 
    { DRAGON_WIN, 100 },
    { DRAGON_EVEN, 105 },
    { DRAGON_ODD, 75 },
    { DRAGON_BLACK, 90 },
    { DRAGON_RED, 90 },
    { SAME, 800 },
    { TIGER_WIN, 100 },
    { TIGER_EVEN, 105 },
    { TIGER_ODD, 75 },
    { TIGER_BLACK, 90 },
    { TIGER_RED, 90 },
};

# 所有扑克牌
200
2,0,0
2 红桃
0 代表 2

/ static vector<string> card_value = { "2","3","4","5","6","7","8", "9","10","J","Q","K","A"};
// static vector<string> card_color = {"", "黑桃", "红桃", "樱花", "方片"};
static vector<int> 
cards = {
    100,101,102,103, //黑桃2,黑桃3
    104,105,106,107,
    108,109,110,111,
    112,
    200,201,202,203,204,205,206,207,208,209,210,211,212,
    300,301,302,303,304,305,306,307,308,309,310,311,312,
    400,401,402,403,404,405,406,407,408,409,410,411,412
}; // 所有得扑克牌 
302 就代表 樱花 4

# 使用示例

cleos --url http://kylin.fn.eosbixin.com push action eosio.token transfer '[ "yanwankun111", "gentelmen123", "1.0000 EOS", "gamebet:4:1:test"]' -p yanwankun111
gamebet : 这个是固定前缀
4 : 是代表gameid
1 ： 是代表下注类型 enum bet_type_enum : int8_t {
DRAGON_WIN = 1, // 龙赢
DRAGON_EVEN = 2, // 龙双
DRAGON_ODD = 3, // 龙单
DRAGON_BLACK = 4, // 龙黑
DRAGON_RED = 5, // 龙红
SAME = 6,
TIGER_WIN = 7, // 虎赢
TIGER_EVEN = 8, // 虎双
TIGER_ODD = 9, // 虎单
TIGER_BLACK = 10, // 虎黑
TIGER_RED = 11, // 虎红
};
test : 自己得随机因子

# 接口文档
https://github.com/cherish0921/poker_game/blob/master/dragontiger/myeosgame111.md

# eosjs调用示例
https://github.com/qq776355102/eos_dapp_development_cn/blob/master/docs/eosjs_manual.md

# 倒计时插件
https://vac.js.org/