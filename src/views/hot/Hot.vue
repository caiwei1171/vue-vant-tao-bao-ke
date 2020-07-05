<template>
    <div class="hot">
        <van-sticky>
            <!-- 头部导航 -->
            <div class="header">
                <van-row>
                    <van-col span="22">
                        <van-search shape="round" placeholder="短裤短袖女装" readonly @click="search"/>
                    </van-col>
                    <van-col span="2">
                        <van-icon class-prefix="iconfont icon-jiaoyin" size="0.6rem" color="#fff" @click="btnClick"/>
                    </van-col>
                </van-row>
            </div>
            <!-- tab标签页 -->
            <van-tabs @click="tabUrl" title-active-color="#ff80ab" :swipe-threshold="5">
                <van-tab :title="item.name" v-for="(item,index) in conditions" :key="index"></van-tab>
            </van-tabs>
        </van-sticky>
        <!-- 内容主体区 -->
        <!-- 下拉刷新 -->
        <van-pull-refresh  v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <div class="prodBox" ref="scroll">
                <div class="prodItem" v-for="(item,index) in recommend.data" :key="index" @click="prodUrl(item)">
                    <div><img class="item-image" :src="item.main_pic"/></div>
                    <div class="activity-good-title">{{item.dtitle}}</div>
                    <div class="activity-good-price">
                        <span class="activity-good-price-favour">￥{{item.original_price}}</span>
                        <span class="activity-good-price-original">￥{{item.price}}</span>
                        <span class="activity-good-tip" v-if="item.coupon_price > 0">{{item.coupon_price}}元券</span>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
        <!-- 帅选界面 -->
        <van-popup v-model="isShow" position="right" :style="{ height: '100%',width: '60%'}" @click-overlay="showScroll">
            <div class="drawer-condition-box">
				<div class="drawer-title">价格区间(元):</div>
				<div class="drawer-condition">
					<input
						id="start"
						class="drawer-conditon-text"
						maxlength="6"
						type="number"
						placeholder="最低价"
                        v-model="startPrice"
					/>
					-
					<input
						id="end"
						class="drawer-conditon-text"
						maxlength="6"
						type="number"
						placeholder="最高价"
                        v-model="endPrice"
					/>
				</div>
			</div>
            <div class="drawer-condition-font">
                <van-button type="primary" size="mini" color="#999" @click="reset">重置</van-button>
                <van-button type="primary" size="mini" color="#f00" @click="direction">确定</van-button>
            </div>
        </van-popup>
        <!-- 返回顶部按钮 -->
        <van-button round type="info" class="backButton" @click="backTop" v-if="scrollheight > 900"></van-button>
        <!-- tabbar -->
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import MainTabBar from "@/components/tabbar/MainTabBar"
import {mapGetters} from "vuex"
// 引入minxi
import {back} from "@/utils/mixin.js"
export default {
    mixins:[back],
    name:"Hot",
    data(){
        return {
            isShow:false,
            startPrice:"",//最低价格
            endPrice:"",//最高价格
            isLoading:false,//判断加载是否完成
            params:{},//存储发送网络请求的数据
            TEXT:"刷新成功",//下拉刷新的提示文本
            scrollheight:0,//通过它判断返回顶端按钮是否显示
            boxheight:null//盒子高度
        }
    },
    components:{
        MainTabBar
    },
    created(){
        this.getData()
    },
    computed:{
        ...mapGetters('good',{
			recommend:'recommend'
        })
    },
    methods:{
        // 页面一创建该方法就被触发,发送网络请求显示加载动画
        async getData(){
            this.params = {
				page:1,
				push:true
			}
            await this.$store.dispatch('good/GetRecommend',this.params)
            const duration = !this.recommend.data.length ? 0 : 1500
            this.$api(duration);
            this.backTop();
        },
        // tab标签的跳转
        tabUrl(idx){
            let condition = this.conditions[idx];
            // 帅选界面的显示
            if(idx == this.conditions.length - 1){
                this.reset();
                this.isShow = true;
                // 禁止主页滚动(方法在main.js中  定义在vue原型上)
                this.noScroll()
                return
            }
            this.backTop()
            let params = {}
			params['page'] = 1;
            params[condition.param] = this.params[condition.param] == 1 ? 2 : 1;
            this.params = params
            this.$store.dispatch("good/GetRecommend",this.params)
        },
        // 下拉刷新
        async onRefresh(){
            // 下拉时再次触发网络请求
            let params = {};
            params.page = this.recommend.page + 1;
            params.push = false;
            this.params = params;
            let goods = await this.$store.dispatch("good/GetRecommend",this.params);
            if(goods.length) this.isLoading = false;
        },
        // 商品详情
        async prodUrl(item){
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
        async handleScroll(e){
            // 商品盒子高度
            this.boxheight = this.$refs.scroll.scrollHeight;
            // 当前滑块隐藏部分高度
            this.scrollheight = e.path[1].scrollY;
            // 根据父盒子高度-滚动条高度判断是否上拉加载更多
            if(this.boxheight - this.scrollheight < 580){
                let params = {}
                params.push = true;
                params.page = this.recommend.page + 1;
                this.params = params
                let goods = await this.$store.dispatch("good/GetRecommend",this.params);
                if(goods.length) this.isLoading = false;
            }
        },
        showScroll(){
            // 让主页可以滚动(方法在main.js中  定义在vue原型上)
            this.canScroll();
        },
        // 确定
        async direction(){
            if(this.endPrice < this.startPrice){
				return;
			}
			let params = {}
			params['page'] = 1;
			params['start_price'] = this.startPrice;
			params['end_price'] = this.endPrice;
			this.params = params;
            let hotProd = await this.$store.dispatch('good/GetRecommend',this.params)
            if(hotProd.length){
                this.$toast.success("商品筛选成功！")
                this.isShow = false;
            }else{
                this.$toast.fail("商品筛选失败！")
            }
            this.canScroll();
            this.reset();
        },
        // 返回
        back(){
            this.$router.go(-1)
        },
        // 跳转足迹
        btnClick(){
            this.$router.push({path:"/profile/footPrint"});
        },
        // 搜索
        search(){
            this.$router.push({path:"/search"});
        }
    }
};
</script>

<style scoped lang="scss">
    //头部导航 
    /deep/ .van-row{
        background: #ff80ab;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;
        padding-left: 4px;
        .van-search{
            padding: 0;
            border-radius: 15px;
        }
        .van-col{
            text-align: center;
        }
    }
    // 商品列表
    .prodBox{
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 56px;
    }
    .item-image{
        width: 165px;
        height: auto;
        padding-top: 4px;
    }
    .prodItem{
        width: 48%;
        text-align: center;
        margin-top: 5px;
        border-radius: 5px;
        background-color: #fff;
    }
    .activity-good-title{
        margin: 8px auto;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 13px;
    }    
    .activity-good-price{
        font-size: 11px;
        margin: 2px;
        padding-bottom: 8px;
    }
    .activity-good-price-favour{
        color: #ccc;
        text-decoration: line-through;
    }
    .activity-good-price-original{
        color: #e80080;
        font-size: 12px;
    }
    .activity-good-price-original::after{
        content: "";
        width: 13px;
        height: auto;
        display: inline-block;
    }
    .activity-good-tip{
        background-color: #f33;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        padding: 2px 1px;
    }
    // 返回顶部
    .backButton{
        position: fixed;
        z-index: 20;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: #999;
        opacity: 0.5;
        border: none;
        right: 10px;
        top:-10px;
        top: 75%;
    }
    // 筛选
    .drawer-condition-box{
        padding: 38px;
    }
    .drawer-title{
        font-size: 17px;
        line-height: 17px;
        color: #777;
        position: relative;
    }
    .drawer-condition{
        margin-top: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .drawer-conditon-text{
        margin: 0 20px 0 20px;
        background: #dcdcdc;
        text-align: center;
        width: 60px;
        height: 24px;
        font-size: 12px;
        outline: none;
        border: none;
        padding: 0;
        margin: 0;
        text-decoration: inherit;
    }
    .drawer-condition-font{
        display: flex;
        justify-content: space-around;
    }
</style>