<template>
    <div>
        <div class="banner" v-if="banner">
            <img src="../../../assets/images/banner.png" alt="" sizes="" srcset="">
        </div>
        <div class="van-hairline--surround" v-else><p class="text-title">{{$route.query.name}}</p></div>
        <div>
            <van-card
                :origin-price="item.original_price"
                :price="item.price"
                :title="item.dtitle"
                :thumb="item.main_pic"
                v-for="(item,index) in actGoods.data"
                :key="index">
                <template #footer>
                    <van-button size="mini" @click="tabUrl(item)">购买</van-button>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    name:"HomeItem",
    data(){
        return {
            banner:true
        }
    },
    computed: {
		...mapGetters('good', {
			actGoods: 'actGoods'
		})
    },
    methods:{
        async tabUrl(item){
            let params = {
				id: item.id,
				numm_id: item.goods_id
            };
            let good = await this.$store.dispatch('good/GetGoodDetail',params);
            const duration = !Object.keys(good).length ? 0 : 1500
            this.$api(duration);
            setTimeout(() => {
                this.$router.push({path:"/productItem/details",query:params});
            },1500)
        },
    },
    updated(){
        this.banner = this.$route.query.name.length < 0 ? true : false
    }
}
</script>

<style scoped lang="scss">
    // 标题
    .text-title{
        color: #999;
        font-size: 18px;
        padding-left: 20px;
        line-height: 40px;
        height: 40px;
    }
    .banner{
        img{
            width: 100%;
            height: 300px;
        }
    }
</style>