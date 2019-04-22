<template>
    <div class="betrecord">
        <div class="betrecord-icon">
            <i class="icon iconfont iconchiping1" v-show="data.resulttype == 'same'"></i>
            <i class="icon iconfont iconlong" v-show="data.resulttype == 'dragon'"></i>
            <i class="icon iconfont iconArtboard" v-show="data.resulttype == 'tiger'"></i>
        </div>
        <div class="betrecord-player" v-html="data.player"></div>
        <div class="betrecord-zhdesc" v-html="data.resultzhdesc"></div>
        <div class="betrecord-amount">
            <span class="betamount-money" v-html="data.betAssetAmount"></span>
            <span class="betamount-coin" v-html="data.betAssetName"></span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: null
        }
    }
}
</script>

