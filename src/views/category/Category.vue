<template>
    <div>
        <van-sticky>
            <!-- 头部导航 -->
            <div class="header">
                <van-row>
                    <van-col span="22">
                        <van-search v-model="value" shape="round" placeholder="短裤短袖女装" readonly @click="search"/>
                    </van-col>
                    <van-col span="2">
                        <van-icon class-prefix="iconfont icon-jiaoyin" size="0.6rem" color="#fff" @click="btnClick"/>
                    </van-col>
                </van-row>
            </div>
        </van-sticky>
        <div class="conter-box">
            <!-- 侧边栏 -->
            <van-sidebar v-model="activeKey" @change="onChange">
                <van-sidebar-item 
                    v-for="(item,index) in categorys"
                    :key="index"
                    :title="item.name"/>
            </van-sidebar>
            <!-- 商品展示区 -->
            <div class="center-right"> 
                <div class="nav-right-item" v-for="(item,index) in products.sub_categorys" :key="index" @click="TabUrl(item)">
                    <img :src="item.icon" alt=""/>
                    <div>{{item.name}}</div>
                </div>
            </div>
        </div>
        <!-- 底部tabbar -->
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
import MainTabBar from "@/components/tabbar/MainTabBar"
export default {
    name:"Category",
    data(){
        return {
            value:"",
            activeKey:0,
            products:"",
            params:""
        }
    },
    components:{
        MainTabBar
    },
    created(){
        this.getData()  
    },
    computed:{
        ...mapGetters("category",{
            categorys:'tcategorys'
        })
    },
    methods:{
        async getData(){
            await this.$store.dispatch('category/GetCategory');
            const duration = !this.categorys.length ? 0 : 1500
            this.$api(duration);
            this.products = this.categorys[this.activeKey]
        },
        btnClick(){
            this.$router.push({path:"/profile/footPrint"});
        },
        onChange(index){
            this.products = this.categorys[index]
        },
        TabUrl(res){
            this.params = {
                cid:this.products.id,
                scid:res.id,
                name:res.name,
                score:1,
                page:1,
                id:0
            }
            this.$router.push({path:"/productItem",query:this.params})
        },
        search(){
            this.$router.push({path:"/Search"})
        }
    }
}
</script>

<style lang="scss" scoped>
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
    .conter-box{
        width: 100%;
        display: flex;
        .van-sidebar{
            text-align: center;
        }
    }
    .center-right{
        width: 80%;
        background:#FFFFFF;
	}
	.nav-right-item{
        width: 33.333%;
        height: 80px;
		text-align: center;
        font-size: 14px;
        padding: 4px 0;
        float: left;
	}
	.nav-right-item img{
		width: 55px;
        height: 55px;
        padding-bottom: 2px;
    }
</style>