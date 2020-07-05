<template>
    <div>
        <van-sticky>
            <!-- 头部导航 -->
            <div class="header">
                <van-row>
                    <van-col span="2">
                        <van-icon name="arrow-left" size="0.6rem" color="#fff"  @click="back"/>
                    </van-col>
                    <van-col span="18">
                        <van-search shape="round" clearable placeholder="短裤短袖女装" v-model="value"/>
                    </van-col>
                    <van-col span="2">
                        <div class="head-btn" @click="btnSearch">搜券</div>
                    </van-col>
                </van-row> 
            </div>
            <!-- tab标签页 -->
            <van-tabs title-active-color="#ff80ab" :swipe-threshold="5" v-if="!isHistory" @click="btn">
                <van-tab :title="item.name" v-for="(item,index) in conditions" :key="index"></van-tab>
            </van-tabs>
        </van-sticky>
        <div class="search" v-if="isHistory">
            <div class="search-hot-box" v-if="hotSearchList.length > 0">
                <div class="search-title">热门搜索</div>
                <div class="search-tag-view" v-for="(item,index) in hotSearchList" :key="index">
                    <van-tag @click="tagUrl(item)">{{item.world}}</van-tag>
                </div>
            </div>
            <div class="search-history-box" v-if="historyList.length > 0">
                <div class="search-title">历史搜索</div>
                <div>
                    <div class="search-tag-view" v-for="(item,index) in historyList" :key="index">
                        <van-tag @click="tagUrl(item)">{{item.world}}</van-tag>
                    </div>
                </div>
                <div class="search-clear-history" @click="CLEAR">
                    <span class="text-icons">
                        <van-icon class-prefix="iconfont icon-shanchu" color="red" size="0.4rem"/>
                    </span>
                    <span class="search-delete-text">清除历史记录</span>
                </div>
            </div>
        </div>
        <div v-else class="search-good-view">
            <van-pull-refresh  v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
                <div class="prodBox" ref="scroll">
                    <div class="prodItem" v-for="(item,index) in showSearchList.data" :key="index" @click="prodUrl(item)">
                        <div><img class="item-image" :src="item.main_pic"/></div>
                        <div class="activity-good-title">{{item.dtitle}}</div>
                        <div class="activity-good-price">
                            <span class="activity-good-price-favour" v-if="item.istmall">天猫价￥{{item.original_price}}</span>
                            <span class="activity-good-price-favour" v-else>淘宝价￥{{item.original_price}}</span>
                            <span class="activity-sell-number">已售{{item.sales_num}}件</span>
                        </div>
                        <div class="activity-good-price">
                            <span class="activity-good-price-original" v-if="item.coupon_price > 0">券后价￥{{item.price}}</span>
                            <span class="activity-good-price-original" v-else>{{item.price}}</span>
                            <span class="activity-good-tip" v-if="item.coupon_price > 0">{{item.price}}元券</span>
                        </div>
                    </div>
                    <div v-if="show" class="dialog">已经没有更多数据了！</div>
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
        </div>
        <!-- 返回顶部按钮 -->
        <van-button round type="info" class="backButton" @click="backTop" v-if="scrollheight > 600"></van-button>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
// 引入minxi
import {back} from "@/utils/mixin.js"
export default {
    inject:['reload'],//此方法定义在App.vue
    mixins:[back],
    name:"Search",
    data(){
        return {
            isShow:false,
            startPrice:"",//最低价格
            endPrice:"",//最高价格
            isHistory:true,//空搜索的显示
            historyList:[],//历史记录
            value:"",//搜索框内容
            params:{},//保存网络请求的参数
            isLoading:false,//是否继续加载
            flag:true,
            show:false,
            scrollheight:0,//通过它判断返回顶端按钮是否显示
            world:""
        }
    },
    computed:{
        ...mapGetters("search",{
            hotSearchList:'search',
            showSearchList:"add_search_list"
        })
    },
    created(){
        this.getData()
    },
    methods:{
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
        // 确定
        async direction(){
            if(this.endPrice < this.startPrice){
				return;
			}
			let params = {}
            params['world'] = this.world;
            params['page'] = 1;
			params['start_price'] = this.startPrice;
			params['end_price'] = this.endPrice;
			params['push'] = true;
            this.params = params;
            let searchList = await this.$store.dispatch('search/SearchGoods',this.params)
            if(searchList.data.goods.length){
                this.$toast.success("商品筛选成功！")
                this.isShow = false;
            }else{
                this.$toast.fail("商品筛选失败！")
            }
            this.canScroll();
            this.reset();
        },
        showScroll(){
            // 让主页可以滚动(方法在main.js中  定义在vue原型上)
            this.canScroll();
        },
        // // 重置
        // reset(){
        //     this.startPrice = "";
        //     this.endPrice = "";
        // },
        // tab标签的跳转
        async btn(idx){
            let condition = this.conditions[idx]
            // 帅选界面的显示
            if(idx == this.conditions.length - 1){
                this.reset();
                this.isShow = true;
                // 禁止主页滚动(方法在main.js中  定义在vue原型上)
                this.noScroll()
                return
            }
            let params = {}
            params['world'] = this.world;
			params['page'] = 1;
			params['push'] = true;
            params[condition.param] = this.params[condition.param] == 1 ? 2 : 1;
            this.params = params
            let searchList = await this.$store.dispatch('search/SearchGoods',this.params)
            const duration = !Object.keys(searchList.data.goods).length ? 0 : 1500
            this.$api(duration);
            this.backTop()
        },
        // 获取初始数据
        async getData(){
            await this.$store.dispatch("search/GetSearch")
            const duration = !this.hotSearchList.length ? 0 : 800
            this.$api(duration);
            this.historyList = JSON.parse(localStorage.getItem("history_list")) || [];
        },
        // 滚动条事件
        async handleScroll(e){
            // 商品盒子高度
            this.boxheight = this.$refs.scroll.scrollHeight;
            // 当前滑块隐藏部分高度
            this.scrollheight = e.path[1].scrollY;
            if(this.boxheight-this.scrollheight < 640){
                if(this.flag){
                    let params = {};
                    params['page'] = this.showSearchList.page + 1;
                    params['push'] = true;
                    this.params = params;
                    let searchList = await this.$store.dispatch('search/SearchGoods',this.params);
                    console.log(searchList)
                    if(searchList.data.goods.length){
                        this.isLoading = false;
                        this.show = true;
                    }
                    this.flag = false;
                }else{
                    this.flag = true;
                }
                
            }
        },
        // 下拉刷新
        async onRefresh(){
            // 下拉时再次触发网络请求
            let params = {};
            params.page = this.showSearchList.page + 1;
            params.push = false;
            this.params = params;
            let searchList = await this.$store.dispatch("search/SearchGoods",this.params);
            if(searchList.data.goods.length) this.isLoading = false;
        },
        // 搜券记录的添加
        btnSearch(){
            if(!this.value.length) return;
            this.tagUrl({world:this.value})
        },
        // 历史记录数据处理
        handleData(res){
            let that = this
            var has = function(g){
                for(let i of that.historyList){
                    if(i.world == g.world){
                        return false
                    }
                }
                return true
            }
            if(has(res)){
                if(this.historyList.length >= 15){
                    this.historyList = this.historyList.splice(1)
                }
                this.historyList.push(res)
                localStorage.setItem("history_list",JSON.stringify(this.historyList))
            }
        },
        CLEAR(){
            this.$dialog("提示","确定删除浏览记录吗?删除无法恢复！").then(() => {
                localStorage.removeItem("history_list")
                this.$toast.success('清除缓存成功！');
                this.reload()
            })
        },
        // 跳转,并将数据存储于本地缓存
        async tagUrl(item){
            this.world = item.world;
            this.isHistory = false;
            if(this.isHistory === false && this.params.world == item.world){
                return
            }
            let params = {};
            params['world'] = item.world;
			params['page'] = 1;
			params['score'] = 1;
            params['push'] = true;
            this.params = params;
            let searchList = await this.$store.dispatch('search/SearchGoods',this.params)
            if(Object.keys(searchList.data.goods.length).length){
                this.handleData(item);
                this.$api(1500);
            }
        },
        // 返回
        back(){
            this.$router.go(-1)
        }
    }
}
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
        .van-search{
            padding: 0;
            border-radius: 15px;
        }
        .van-col{
            text-align: center;
        }
    }
    .head-btn{
        position: relative;
        margin: 0 2px;
        word-break: keep-all;
        white-space: pre;
        cursor: pointer;
        font-size: 18px;
        font-weight: 100;
        color: #fff;
    }
    // 热门搜索
    .search{
        padding: 0 16px 16px;
        .search-title{
            font-size: 17px;
            line-height: 17px;
            color: #777;
            position: relative;
            margin: 22px 0;
        }
        .search-tag-view{
            margin: 5px 11px;
            display: inline-block;
        }
        .search-clear-history{
            font-size: 12px;
            margin-top: 11px;
            width: 100%;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            .text-icons{
                font-family: "text-icons" !important;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
            }
        }
    }
    .van-tag{
        box-sizing: border-box;
        padding: 0px 17px;
        height: 33px;
        line-height: calc(33px - 2px);
        font-size: 15px;
        display: inline-block;
        color: #333;
        border-radius: 16px;
        background-color: #f8f8f8;
        border: 1px solid #f8f8f8;
    }
    // 产品列表
    .search-good-view{
        -webkit-box-flex: 1;
        flex: 1;
        width: 100%;
        height: 100%;
    }
    // 商品列表
    .prodBox{
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: auto;
        margin: 0 6px 4px 6px;
    }
    .item-image{
        width: 165px;
        height: auto;
        padding-top: 4px;
    }
    .prodItem{
        width: 49%;
        text-align: center;
        margin-top: 5px;
        border-radius: 5px;
        background-color: #fff;
        padding-bottom: 10px;
    }
    .activity-good-title{
        margin: 8px 0;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 14px;
    }    
    .activity-good-price{
        font-size: 11px;
        margin: 2px;
    }
    .activity-good-price-favour{
        color: #ccc;
        text-decoration: line-through;
    }
    .activity-good-price-favour::after{
        content: "";
        width: 14px;
        height: auto;
        display: inline-block;
    }
    .activity-sell-number{
        color: #cccccc;
        font-size: 12px;
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
    .dialog{
        color: #999;
        font-size: 14px;
        text-align: center;
        width: 100%;
    }
    // 帅选
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
        top: 80%;
    }
</style>