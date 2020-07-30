<template>
    <div class="center">
        <van-sticky>
            <!-- navbar -->
            <main-nav-bar class="nav-bar">
                <div slot="zuobian">
                    <van-icon name="arrow-left" size="0.6rem" color="#fff"  @click="back"/>
                </div> 
                <div slot="biaoti">足迹</div>   
                <div slot="youbian">
                    <van-icon class-prefix="iconfont icon-shanchu" size="0.5rem" @click="clearProd"/>
                </div>        
            </main-nav-bar>
        </van-sticky>
        <!-- 主体内容区域 -->
        <div class="ProdList">
            <div class="clear-invalid-good" v-if="Object.keys(goods).length > 0"><span class="text">清空失效产品</span></div>
            <van-empty description="您没有任何浏览记录" v-if="isShow"/>
            <div class="index-list-cell"  @click="tabUrl(item)" v-for="(item,index) in goods" :key="index" v-else>
                <div class="good-list">
					<img class="good-list-logo" :src="item.main_pic" />
					<div class="good-list-body">
						<div class="good-list-text-top">{{item.dtitle}}</div>
						<div class="good-list-text-bottom">
							<span v-if="item.istmall" class="good-price-favour">天猫价￥{{item.original_price}}</span>
							<span v-else class="good-price-favour">淘宝价￥{{item.original_price}}</span>
							<span class="good-sell-number">已售{{item.sales_num}}件</span>
						</div>
						<div class="good-list-text-bottom">
							<span class="good-price">券后￥{{item.price}}</span>
							<span class="good-quan">￥{{item.coupon_price}}元券</span>
						</div>
					</div>
				</div>
            </div>
        </div>
    </div>
</template>

<script>
import MainNavBar from "../navbar/MainNavBar.vue"
import {mapGetters} from "vuex"
export default {
    // 注入依赖
    inject:['reload'],//此方法定义在App.vue
    name:"FootPrint",
    components:{
        MainNavBar
    },
    data(){
        return {
            isShow:true
        }
    },
    computed:{
        ...mapGetters('footprint',{
			goods:'goods'
        })
    },
    created(){
        this.getData()
    },    
    methods:{
        // 获取刚进足迹页面时的数据
        async getData(){
            let goodData = localStorage.getItem("footprint_goods");
            if(goodData){
                this.isShow = false;
                await this.$store.dispatch('footprint/GetGoods',goodData);            
            }  
        },
        // 跳转详情按钮
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
        // 清除缓存与vuex中的数据
        clearProd(){
            this.$dialog("提示","确定删除浏览记录吗?删除无法恢复！").then(() => {
                localStorage.removeItem("footprint_goods")
                this.$toast.success('清除缓存成功！');
                this.$store.dispatch('footprint/CleanGoods');
                this.isShow = true;
                // this.reload()//定义在App.vue强制全局刷新页面
            })
        },
        // 返回
        back(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .van-nav-bar{
        background-color: #ff80ab !important;
        
    }
    /deep/ .van-nav-bar{
        color: #fff;
    }
    /deep/ .van-cell__value{
        color: rgb(211, 211, 207);
    }
    /deep/ .van-nav-bar__title{
        color: #fff;
    }
    // 商品列表
    .clear-invalid-good{
        background: #FFFFFF;
        display: flex;
        height: 55px;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        margin: 5px 0 5px 0;
        font-size: 13px;
    }
    .text{
        color: #e80080;
        height: 27px;
        line-height: 27px;
        border: 1px solid #e80080;
        padding: 0 5px 0 5px;
        border-radius: 5px;
    }
    .index-list-cell{
        width: 100%;
        margin-bottom: 5px;
        border-radius: 5px;
        background: #FFFFFF;
    }
    .good-list{
        padding: 6px;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        margin-bottom: 6px auto;
    }
    .good-list-logo{
        height: 110px;
        width: 110px;
        margin-right: 8px;
    }
    .good-list-body{
        height: 110px;
        display: flex;
        -webkit-box-flex: 1;
        flex: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: start;
        align-items: flex-start;
        overflow: hidden;
    }
    .good-list-text-top{
        width: 100%;
        line-height: 19px;
        font-size: 14px;
    }
    .good-list-text-bottom{
        width: 100%;
        line-height: 20px;
        font-size: 14px;
        color: #8f8f94;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }
    .good-price-favour{
        color: #888888;
        text-decoration: line-through;
        margin-left: 4px;
    }
    .good-sell-number{
        right: 4px;
        padding: 0 4px;
    }
    .good-list-text-bottom{
        width: 100%;
        line-height: 20px;
        font-size: 14px;
        color: #8f8f94;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }
    .good-price{
        color: #e80080;
        margin-left: 4px;
    }
    .good-quan{
        position: absolute;
        right: 7px;
        color: #e80080;
        padding: 0 4px;
        border: 1px solid #e80080;
    }
</style>