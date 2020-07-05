<template>
    <div>
        <!-- 吸顶 -->
        <van-sticky>
            <div style="background:#fff">
                <!-- navbar -->
                <main-nav-bar class="nav-bar">
                    <div slot="zuobian" @click="refresh">桔子精选</div>
                    <div slot="biaoti">
                        <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" readonly @click="search" input-align="center"/>
                    </div>
                    <div slot="youbian"><van-icon class-prefix="iconfont icon-jiaoyin" size="0.6rem" @click="footprint"/></div>
                </main-nav-bar> 
                <!-- tab标签 -->
                <van-tabs v-model="active" swipeable animated title-active-color="#ff80ab">
                    <van-tab v-for="(item,index) in categorys" :title="item.name" :key="index">
                        <div>
                            <van-grid square :column-num="5" :border="false">
                                <van-grid-item v-for="(value,index1) in item.sub_categorys" @click="tabUrl(value)" :key="index1">
                                    <van-image width="1rem" height="1rem" fit="cover" :src="value.icon" />
                                    <div class="text">{{value.name}}</div>
                                </van-grid-item>
                            </van-grid>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </van-sticky>
        <div class="containt-box">
            <router-view></router-view>
        </div>
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
import MainNavBar from "../../components/navbar/MainNavBar.vue"
import MainTabBar from "@/components/tabbar/MainTabBar"
export default {
    name:"Home",
    components:{
        MainNavBar,
        MainTabBar
    },
    data(){
        return {
            active:0,//swiper与tab标签相关联
            value:'',
            products:[],
        }
    },
    created(){
       this.getData();
    },
    computed:{
        ...mapGetters("category",{
            categorys:'tcategorys'
        })
    },
    methods:{
        async tabUrl(item){
            this.params = {
                cid:this.active + 1,
                scid:item.id,
                score:1,
                page:1,
                id:0
            }
            await this.$store.dispatch('good/GetActGoods',this.params)
            this.$store.state.id = item.id;//将点击的id保存至vuex中使tabbar点击时颜色有变化
            this.$router.push({path:"/home/homeItem/id=" + item.id,query:{name:item.name}})
        },
        // 加载动画
        lodingAnimation(){
            const duration = !this.categorys.length ? 0 : 1500
            this.$api(duration);
        },
        // 获取页面数据
        async getData(){
            // 获取tab标签内容
            await this.$store.dispatch('category/GetCategory');
            this.lodingAnimation();
        },
        // 点击刷新页面
        refresh(){
            this.getData();
        },
        search(){
            this.$router.push({path:"/Search"})
        },
        // 跳转足迹
        footprint(){
            this.$router.push({path:"/profile/footPrint"});
        }
    }
}
</script>

<style scoped lang="scss">
    /deep/ .nav-bar{
        background: #ff80ab;
        .van-nav-bar__left,.van-nav-bar__right{
            padding: 0 4px;
            font-size: 18px;
            color: #fff;
            position: static;
        }
        .van-nav-bar__right{
            width: 60px;
            display: flex;
            justify-content: center;
        }
        .van-icon{
            width: 25px;
            height: 25px;
        }
        .van-search{
            padding: 0;
            border-radius: 15px;
        }
    }
    /deep/ .van-hairline--bottom{
        &::after{
            border: none;
        }
    }
    .text{
        font-size:13px;
    }
    .containt-box{
        background: rgb(255,255,255);
    }
</style>
