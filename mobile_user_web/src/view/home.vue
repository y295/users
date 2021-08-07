<template>
  <div class="container">
    <div class="main">
      <router-view />
    </div>
    <div class="footer">
      <van-tabbar v-model="active" fixed route placeholder>
        <van-tabbar-item icon="home-o" to="/home">用户列表</van-tabbar-item>
        <van-tabbar-item icon="plus" to="/home/addUsers">添加用户</van-tabbar-item>
        <van-tabbar-item icon="search" to="/2">搜索</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  /* align-items: center; */
}
.main {
  height: 100%;
  /* margin-top: auto;
  margin-bottom: auto; */
}
</style>
