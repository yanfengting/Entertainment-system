<template>
    <div ref="videoRate">
        <div class="rate-content">
            <template v-for="item in star_list">
                <div class="star full" v-if="item === 2"></div>
                <div class="star null" v-if="item === 0"></div>
                <div class="star half" v-if="item === 1"></div>
            </template>
        </div>
    </div>
</template>
<style type="text/css">
    .rate-content {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }

    .star {
        margin: 2px;
        width: 10px;
        height: 10px;
    }

    .full {
        background: url("../../assets/images/full_star.png") no-repeat;
        background-position: center center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }

    .null {
        background: url("../../assets/images/null_star.png") no-repeat;
        background-position: center center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }

    .half {
        background: url("../../assets/images/half_star.png") no-repeat;
        background-position: center center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }
</style>
<script>
    export default {
        props: {
            score: {
                type: String,
                default() {
                    return '10'
                },
                required: true
            }
        },
        data() {
            return {
                star_list: [0, 0, 0, 0, 0]
            }
        },
        mounted() {
            console.log('获取到的分数为：' + this.score)
        },
        created() {
            let _this = this
            let sub = _this.score / 2
            let curScore = parseInt(sub)
            let i = 0
            // debugger
            let startArr = _this.star_list
            for (; i < curScore; i++) {
                startArr[i] = 2
            }
            if (i < _this.star_list.length) {
                startArr[i] = sub > curScore ? 1 : 0
            }
            _this.star_list = startArr
        }
    }
</script>
