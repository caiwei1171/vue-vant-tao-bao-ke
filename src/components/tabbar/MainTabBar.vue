<template>
    <van-tabbar v-model="active" active-color="#f00" inactive-color="#000" route>
        <van-tabbar-item replace :to="'/home/homeItem/id=' + id">
            <van-icon class-prefix="iconfont icon" name="shouye" />
            <div>首页</div>
        </van-tabbar-item>
        <van-tabbar-item replace to="/hot">
            <van-icon class-prefix="iconfont icon" name="hot" />
            <div>推荐</div>
        </van-tabbar-item>
        <van-tabbar-item replace to="/category">
            <van-icon class-prefix="iconfont icon" name="fenlei" />
            <div>分类</div>
        </van-tabbar-item>
        <van-tabbar-item replace to="/profile">
            <van-icon class-prefix="iconfont icon" name="wode" />
            <div>我的</div>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    name:"MainTabBar",
    data(){
        return {
            active: 0,
        }
    },
    computed:{
        id(){
            return this.$store.state.id
        }
    }
}
</script>

<style scoped>
    .van-tabbar-item{
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    div{
        margin-top: 4px;
    }
</style>