// TODO: 扑克点数
const card_value = ["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// TODO: 扑克颜色
const card_color = [
    {card_color_index: 0, card_color_desc: ''},
    {card_color_index: 1, card_color_desc: '黑桃'},
    {card_color_index: 2, card_color_desc: '红桃'},
    {card_color_index: 3, card_color_desc: '樱花'},
    {card_color_index: 4, card_color_desc: '方片'}
];

// TODO: 扑克配置
const card_map = function(){
    let map = new Map();
    card_color.forEach((item, index) => {
        if(item.card_color_index > 0){
            card_value.forEach((subitem, subindex) => {
                if(subindex < 10){
                    map.set(`${item.card_color_index}0${subindex}`, {
                        card_color: item.card_color_index,
                        card_color_desc: item.card_color_desc,
                        card_value: subitem
                    });
                }else{
                    map.set(`${item.card_color_index}${subindex}`, {
                        card_color: item.card_color_index,
                        card_color_desc: item.card_color_desc,
                        card_value: subitem
                    });
                }
            });
        }
    });
    return map;
}

export default card_map();