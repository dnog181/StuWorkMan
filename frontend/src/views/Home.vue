<script setup>
    import { useUserStore } from '../store/user.js'
    const user = useUserStore()

</script>
<template>
    <div>
        Home 页面
    </div>
    <span>{{user.token}}</span>
    <div @click="user.zj">退出登录</div>
    
</template>

<style scoped lang="scss">
    .search {
        width: 40px;
        height: 40px;
        color: red;
    }

    div {
        color: skyblue;
    }
</style>