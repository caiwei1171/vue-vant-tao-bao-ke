<template>
    <div class="center">
        <!-- navbar -->
        <main-nav-bar class="nav-bar">
            <div slot="youbian">
                <van-icon class-prefix="iconfont icon-yunliankeji_gongyinglianfuben" color="#fff" size="0.6rem" @click="btnClick('设置')"/>
            </div>           
        </main-nav-bar>
        <!-- 头像、标题 -->
        <div class="center-top">
            <div class="center-logo">
                <img class="center-logo-img" src="@/assets/images/logo.png" alt="">
                <div class="center-logo-title">
                    <div class="center-user-name">
                        <span>桔子精选</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 列表项 -->
        <van-cell-group> 
            <van-cell v-for="(item,index) in titles" 
            :key="index" 
            :title="item" 
            is-link 
            arrow-directio 
            size="large" 
            @click="btnClick(item)"/>
        </van-cell-group>
        <!-- 分享页面 -->
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect"/>
        <!-- tabbar -->
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import MainNavBar from "../../components/navbar/MainNavBar.vue"
import MainTabBar from "@/components/tabbar/MainTabBar"
export default {
    name:"Profile",
    components:{
        MainNavBar,
        MainTabBar
    },
    data(){
        return {
            showShare: false,
            titles:["我的足迹","联系客服","领券帮助","分享App","版本更新","关于"],
            options: [
                [
                    { name: '微信', icon: 'wechat' },
                    { name: '微博', icon: 'weibo' },
                    { name: 'QQ', icon: 'qq' },
                ],
                [
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' },
                ],
            ]
        }
    },
   
    methods:{
        btnClick(res){
            switch(res){
                case "联系客服": this.$dialog("联系客服","QQ群：200910943")
                break;
                case "领券帮助": this.$toast("功能完善中，请耐心等待!")
                break;
                case "版本更新": this.$dialog("版本更新","versionName:v1.0.0")
                break;
                case "分享App": this.showShare = true;
                break;
                default: this.isShow(res)
            }
        },
        onSelect(option){
            this.$toast(option.name);
            this.showShare = false;
        },
        isShow(res){
            if(res == "设置") this.$router.push({path:"/profile/setting"});
            if(res == "我的足迹") this.$router.push({path:"/profile/footPrint"});
            if(res == "关于") this.$router.push({path:"/profile/about"});
        }
    }
}
</script>

<style scoped lang="scss">
    /deep/ .nav-bar{
        background: #ff80ab;
    }
    /deep/ .van-hairline--bottom{
        &::after{
            border: none;
        }
    }
    .center{
        height: 100%;
        flex-direction: column;
    }
    .center-top{
        width: 100%;
        height: 170px;
        margin-top: -1px;
    }
    .center-top .center-logo{
        width: 100%;
        height: 170px;
        padding: 52px 10px 10px 10px;
        box-sizing: border-box;
        background-color: #ff80ab;
        flex-direction: row;
        display: flex;
        align-items: center;
    }
    .center-logo-img{
        width: 75px;
        height: 75px;
        border-radius: 75px;
    }
    .center-logo-title{
        width: 270px;
        height: 75px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .center-user-name{
        color: #fff;
        font-size: 19px;
        height: 30px;
        line-height: 30px;
    }
    .van-cell-group{
        margin-top: 10px;
    }
    .container{
        width: 100%;
        height: auto;
    }
</style>
