import math from 'math';

export function numToString(num) {// 数字转string
    if (num != undefined || num != null) {
        let s = num.toString();
        let reg = /^(\d+)(.\d+)?(e)([-]?\d+)$/;
        let arr, len, zero = "";
        if (!reg.test(s)) {
            return num;
        } else {
            arr = reg.exec(s);
            len = Math.abs(arr[4]) - 1;
            for (let i = 0; i < len; i++) {
                zero += "0";
            }
            return "0." + zero + arr[1] + (arr[2] ? arr[2].substr(1) : "");
        }
    } else {
        return '';
    }
}

export function fixed(x, num) { //精确位数
    let m = 10 ** num
    return math.divide(math.floor(math.multiply(x, m)), m)
}

export function toceil(x, num){ //上取整
    let m = 10 ** num;
    return math.ceil(math.number(math.multiply(math.bignumber(x), math.bignumber(m))));
}

export function toNumber(x) {
    return math.number(x)
}

export function changeamount(v, m, type, min = null, max = null) { //加减乘除运算
    let x
    switch (type) {
        case '+': //加
            x = math.number(math.add(math.bignumber(v), math.bignumber(m)));
            break;
        case '-': //减
            x = math.number(math.subtract(math.bignumber(v), math.bignumber(m)));
            break;
        case '*': //乘
            x = math.number(math.multiply(math.bignumber(v), math.bignumber(m)));
            break;
        case '/': //除
            x = math.number(math.divide(math.bignumber(v), math.bignumber(m)));
            break;
    }
    if (min || min === 0) {
        x = x < min ? min : x;
    }
    if (max || max === 0) {
        x = x > max ? max : x;
    }
    x = math.number(math.divide(math.bignumber(math.number(math.multiply(math.bignumber(x), 10 ** 12))), 10 ** 12));
    x = !Number.isFinite(Number(x)) ? 0 : x;
    x = Number.isNaN(Number(x)) ? 0 : x;
    return x;
}

export function accurate(v, num) { //mathjs精确位数 1-16位
    if (v != null || v != undefined) {
        return math.format(parseFloat(v), { notation: "fixed", precision: num })
    } else {
        return 0
    }
}

export function randomID(len,pattern){ //生成随机字符串
    let possibilities = ["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789"];
	let chars = "";
	pattern = pattern ? pattern : "aA0";
	pattern.split('').forEach(function(a){
		if(!isNaN(parseInt(a))){
			chars += possibilities[2];
		}else if(/[a-z]/.test(a)){
			chars += possibilities[0];
		}else{
			chars += possibilities[1];
        }
	});
	len = len ? len : 7;
	let result = '';
	while(len--){
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	};
	return result;
}

export function changeDecimalBuZero(number, bitNum) {
    var f_x = parseFloat(number);
    if (isNaN(f_x)) {
        return 0;
    }
    var s_x = number.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + bitNum) {
        s_x += '0';
    }
    return s_x;
}