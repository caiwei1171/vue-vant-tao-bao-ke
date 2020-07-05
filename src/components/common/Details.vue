<template>
    <div>
        <van-sticky>
            <!-- navbar -->
            <main-nav-bar class="nav-bar">
                <div slot="zuobian">
                    <van-icon name="arrow-left" size="0.6rem" color="#fff"  @click="back"/>
                </div> 
                <div slot="biaoti">商品详情</div>   
                <div slot="youbian">
                    <van-icon class-prefix="iconfont icon-fenxiang" size="0.6rem" @click="showTpwd(1)"/>
                </div>        
            </main-nav-bar>
        </van-sticky>
        <!-- 主体内容 -->
        <div class="detailBox">
            <!-- 轮播图 -->
            <van-swipe class="my-swipe" :autoplay="3000">
                <van-swipe-item>
                    <img :src="good.main_pic" alt="" class="item-images"/>
                </van-swipe-item>
                <van-swipe-item v-for="(item,index) in good.small_images" :key="index">
                    <img :src="item" alt="" class="item-images"/>
                </van-swipe-item>
            </van-swipe>
            <div class="detail-good-info">
                <div class="detail-good-title">
                    <span class="detail-shop-type" v-if="good.shop_type == 1">天猫</span>
                    <span class="detail-shop-type" v-if="good.shop_type == 0">淘宝</span>
                    <span class="detail-good-title-text">{{good.title}}</span>
                </div>
                <div class="detail-good-price">
                    <div><span class="color-red">券后价<span class="detail-good-price-size">￥{{good.actual_price}}</span></span></div>
                    <div><span>已售{{good.month_sales}}件</span></div>
                </div> 
                <div class="detail-good-org-price">
                    <span v-if="good.shop_type == 1">天猫价</span>
                    <span v-if="good.shop_type == 0">淘宝价</span>
                    <span class="detail-good-price-size">￥{{good.original_price}}</span>
                </div>
                <div class="detail-good-quan" @click="onClickBuy">
					<div class="detail-good-quan-left">
						<div>￥{{good.coupon_price}}元优惠券</div>
						<div class="detail-good-quan-time">使用期限:{{good.coupon_end_time}}</div>
					</div>
					<div class="detail-good-quan-right">立即领取</div>
				</div>
				<div class="detail-good-introduce">
					{{good.desc}}
				</div>
            </div>
            <div class="detail-good-detail-info">
				<div class="detail-good-detail-info-title">宝贝详情</div>
				<div class="detail-good-images" v-if="good.detail_pics.length > 1">
					<div v-for="(pic,index) in good.detail_pics" :key="index">
						<img :src="pic" />
					</div>
				</div>
				<div class="detail-good-images" v-else>
					<div v-for="(pic,index) in good.small_images" :key="index">
						<img :src="pic" />
					</div>
				</div>
			</div>
        </div>
        <!-- 口令购买、领券购买 -->
        <div class="detail-foot-bar">
			<div class="detail-tab-bar">
				<div class="detail-tab-bar-tpwd" @click="showTpwd(0)"><div>口令购买</div></div>
				<div class="detail-tab-bar-coupon" @click="onClickBuy"><div>领券购买</div></div>
			</div>
		</div>
        <!-- 弹出层 -->
        <van-popup 
            position="center"
            v-model="showPopup"
            @click-overlay="showScroll">
            <div class="popup-center-box">
                <div class="popup-center-title">{{popupTitle}}</div>
                <div class="popup-center-txt"><span v-html="popupContent"></span></div>
                <div class="popup-center-button">
                    <div class="copy-button" @click="prodCopy">一键复制</div>
                </div>
            </div>
        </van-popup>
        <!-- 返回顶部按钮 -->
        <van-button round type="info" class="backButton" @click="backTop" v-if="scrollheight > 900"></van-button>
    </div>
</template>

<script>
import MainNavBar from "../../components/navbar/MainNavBar.vue"
import {mapGetters} from "vuex"
// 引入minxi
import {back} from "@/utils/mixin.js"
export default {
    mixins:[back],
    name:"Details",
    data(){
        return {
            params:{},//存放网络请求数据
            current:0,//指针
            showPopup:false,//弹出层
            popupTitle:"复制淘口令购买",
            popupContent:"复制框内整段文字，打开【手淘App】即可领券购买",
            scrollheight:0//通过它判断返回顶端按钮是否显示
        }
    },
    components:{
        MainNavBar
    },
    computed:{
        ...mapGetters('good',{
			good:'good'
        })
    },
    methods:{
        // 点击购买、领券购买        
        onClickBuy(){
            let url = this.good.coupon_click_url;
            window.location.href = url
        },
        prodCopy(){
            this.$toast.success("口令复制成功！");
            this.showScroll();
        },
        // 弹框内容的显示
        showTpwd(type){
            // 禁止主页滚动(方法在main.js中  定义在vue原型上)
            this.noScroll();
            if(type == 0){
                this.popupTitle = "复制淘口令购买"
                let str = `复制框内整段文字，打开【手淘APP】即可领券购买。${this.good.tpwd}`;
                this.popupContent = str
            }else{
                this.popupTitle = "复制淘口令分享";
                let str = `${this.good.dtitle}<br/>
                    【原价】:${this.good.original_price}元<br/>
                    【优惠券】:${this.good.coupon_price}元<br/>
                    【券后价】:${this.good.actual_price}元<br/>
                    【淘口令下单】:复制这条信息，打开→手机淘宝领取优惠券${this.good.tpwd}<br/>
                    【推荐理由】：${this.good.desc}<br/>`;
                this.popupContent = str
            }
            this.showPopup = true;
        },
        showScroll(){
            // 让主页可以滚动(方法在main.js中  定义在vue原型上)
            this.canScroll();
            this.showPopup = false;
        },
        handleScroll(e){
            // 当前滑块隐藏部分高度
            this.scrollheight = e.path[1].scrollY;
        },
        // 返回
        back(){
            this.$router.go(-1)
        }
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
    // 轮播图
    .my-swipe .van-swipe-item{
        color: #fff;
        font-size: 20px;
        text-align: center;
        background-color: #39a9ed;
    }
    .item-images{
        display: block;
        width: 100%;
        height: 300px;
    }
    // 计时器
    .custom-indicator{
        position: absolute;
        right: 20px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
    // 商品信息
    .detail-good-info{
        padding-bottom: 8px;
        background-color: #fff;
    }
    .detail-good-title{
        font-size: 13px;
        padding: 11px 22px 11px 22px;
    }
    .detail-shop-type{
        border: 1px solid #f33;
        padding: 0 4px;
        font-size: 5px;
        color: #f33;
    }
    .detail-good-title-text{
        margin-left: 10px;
    }
    .detail-good-price{
        font-size: 12px;
        padding: 0px 22px 0px 22px;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
    }
    .detail-good-org-price{
        color: #999999;
        font-size: 11px;
        padding: 0px 22px 0px 22px;
        display: flex;
    }
    .detail-good-price-size{
        margin-left: 10px;
    }
    .color-red{
        color: red;
    }
    .detail-good-quan{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        height: 94px;
        background: url("../../assets/images/goods_quan.png") no-repeat;
        background-size: 100% 100%;
        font-size: 13px;
    }
    .detail-good-quan-left{
        color: #FFFFFF;
        text-align: center;
        -webkit-box-pack: center;
        justify-content: center;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        width: 60%;
        height: 100%;
        border-right: 2px dashed #FFFFFF;
    }
    .detail-good-quan-time{
        color: #F1F1F1;
        font-size: 9px;
    }
    .detail-good-quan-right{
        width: 40%;
        height: 100%;
        color: #FFFFFF;
        text-align: center;
        justify-content: center;
        display: flex;
        -webkit-box-orient: vertical;
        flex-direction: column;
    }
    .detail-good-introduce{
        padding: 0px 22px 0px 22px;
        font-size: 10px;
        color: #999999;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    .detail-good-detail-info{
        margin-top: 11px;
        margin-bottom: 55px;
        background: #FFFFFF;
    }
    .detail-good-detail-info-title{
        text-align: center;
        color: #999999;
        font-size: 13px;
        margin-bottom: 10px;
    }
    .detail-good-images{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .detail-good-images img{
        width: 100%;
        margin-top: -8px;
    }
    // 底部领券购买和口令购买
    .detail-foot-bar{
        position: fixed;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        z-index: 10;
        bottom: 0;
        box-shadow: 0px -2px 2px #CCCCCC;
        height: 55px;
        width: 100%;
        background: #FFFFFF;
        font-size: 13px;
    }
    .detail-tab-bar{
        padding: 0 5px 0 5px;
        height: 44px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .detail-tab-bar-tpwd{
        -webkit-box-align: center;
        align-items: center;
        color: #FF3333;
        border: 1px solid #FF3333;
        border-right: none;
        border-radius: 2px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        width: 50%;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
    }
    .detail-tab-bar-coupon{
        -webkit-box-align: center;
        align-items: center;
        color: #FFFFFF;
        width: 50%;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        background: linear-gradient(to left,#FA4DBF 0,#FBAA59 100%);
    }
    // 返回顶部
    .backButton{
        position: fixed;
        z-index: 1000;
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
    // 弹框
    .van-popup{
        border-radius: 4px;
        padding: 10px 12px;
    }
    .popup-center-box{
        width: 320px;
        height: 264px;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
    }
    .popup-center-title{
        text-align: center;
        font-size: 16px;
        color: #666666;
        line-height: 22px;
        margin-bottom: 10px;
    }
    .popup-center-txt{
        width: 298px;
        height: 110px;
        font-size: 12px;
        background: #F1F1F1;
        color: #333333;
        padding: 11px;
        border-radius: 6px;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        overflow: auto;
    }
    .popup-center-button{
        margin-top: 22px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        line-height: 38px;
    }
    .copy-button{
        color: #FFFFFF;
        font-size: 13px;
        text-align: center;
        width: 154px;
        border-radius: 6px;
        background: linear-gradient(to left,#FA4DBF 0,#FBAA59 100%);
    }
</style>