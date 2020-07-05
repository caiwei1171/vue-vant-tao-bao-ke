<template>
    <div class="center">
        <!-- navbar -->
        <main-nav-bar class="nav-bar">
            <div slot="zuobian">
                <van-icon name="arrow-left" size="0.6rem" color="#fff"  @click="back"/>
            </div> 
            <div slot="biaoti">设置</div>           
        </main-nav-bar>
        <!-- 列表 -->
        <van-cell-group>
            <van-cell title="清除缓存" value="点击清除" large @click="clear"/>
        </van-cell-group>
    </div>
</template>

<script>
import MainNavBar from "../../../components/navbar/MainNavBar.vue"
export default {
    name:"Setting",
    components:{
        MainNavBar
    },
    methods:{
        back(){
            this.$router.push({path:"/profile"})
        },
        clear(){
            this.$dialog("提示","是否清除缓存？").then(() => {
                // on confirm
                localStorage.clear()
                this.$toast.success('清除缓存成功！');
            }).catch(() => {
                // on cancel
                this.$toast.fail("清除缓存失败！")
            });
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
</style>