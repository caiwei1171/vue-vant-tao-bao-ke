<template>
    <van-nav-bar>
        <template #left>
            <slot name="zuobian"></slot>
        </template>
        <template #title>
            <slot name="biaoti"></slot>
        </template>
        <template #right>
            <slot name="youbian"></slot>
        </template>
    </van-nav-bar>
</template>

<script>
export default {
    name:"MainNavBar",
    data(){
        return {
            
        }
    }
}
</script>

<style scoped lang="scss">
 
</style>
