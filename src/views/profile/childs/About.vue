<template>
    <div class="center">
        <!-- navbar -->
        <main-nav-bar class="nav-bar">
            <div slot="zuobian">
                <van-icon name="arrow-left" size="0.6rem" color="#fff"  @click="back"/>
            </div> 
            <div slot="biaoti">关于我们</div>          
        </main-nav-bar>
        <!-- 内容 -->
        <div class="about">
            <div class="title">桔子精选</div>
            <span class="content">
                桔子精选所有商品和优惠均来自互联网，由于商品信息未及时更新等不可抗原因，可能到时商品和优惠信息与实际有所不同，所有商品信息请以对应店铺内显示的信息为准。
            </span>
            <span class="content">
                桔子精选提醒用户，购买商品前请注意谨慎核实商品相关信息。如对商品/服务的标题、价格、详情等任何信息有任何疑问，请在购买前与商品所在店铺经营者沟通确认。            </span>
            <span class="content">
                桔子精选存在海量的商品信息，如您返现商品中有任何违法/违规信息，请联系客户进行反馈帮助我们变得更好！
            </span>
            <div class="footer">Copyright © 桔子精选版权所有</div>
        </div>
    </div>
</template>

<script>
import MainNavBar from "../../../components/navbar/MainNavBar.vue"
export default {
    name:"About",
    components:{
        MainNavBar
    },
    data(){
        return {}
    },
    methods:{
        back(){
            this.$router.push({path:"/profile"})
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
    .about{
        padding-top: 10px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 15px;
    }
    .title{
        color: #333;
        font-size: 25px;
        text-align: center;
    }
    .content{
        padding: 0 22px;
        color: #8f8f94;
        margin-top: 22px;
    }
    .footer{
        margin-top: 55px;
        color: #8F8F94;
        text-align: center;
    }
</style>