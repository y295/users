<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="用户列表" fixed placeholder> </van-nav-bar>
    </div>
    <div class="mian">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell v-for="item in list" :key="item.username">
          <!-- <template #left>
            <van-button square type="primary" text="选择" />
          </template> -->
          <div class="user_card">
            <van-image width="70" height="70" round :src="getPhoto(item.photoPath)" />
            <div class="card_text">
              <ul>
                <li>
                  <span><b>用户名:</b>{{ item.username }}</span>
                </li>
                <li>
                  <span><b>邮箱:</b>{{ item.email }}</span>
                </li>
              </ul>
            </div>
          </div>
          <template #right>
            <van-button
              square
              type="primary"
              text="编辑"
              @click="() => $router.push(`/home/editUsers/${item.id}`)"
            />
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
        <!-- <van-cell v-for="item in list" :key="item.username" :title="item.username" /> -->
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      listLength: 0,
    };
  },
  methods: {
    async onLoad() {
      console.log(this.listLength);
      const res = await this.$http.get(`/userListMobile/${this.listLength}`);
      this.list = this.list.concat(res.data);
      this.loading = false;
      if (!res.data.length) {
        this.finished = true;
      } else {
        this.listLength = this.listLength + res.data.length;
      }
      console.log(res.data);
      console.log(this.list);
    },

    getPhoto(photoPath) {
      return photoPath
        ? "http://192.168.0.178:3000/" + photoPath
        : "https://b.yzcdn.cn/vant/icon-demo-1126.png";
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f7f8fa;
}

.header {
  background-color: #ffffff;
  font-weight: 600;
  font-size: 17px;
}

/deep/.van-nav-bar__title {
  font-weight: 600;
  font-size: 17px;
  text-transform: capitalize;
}
.user_card {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  background-color: #ffffff;
  color: #323233;
  padding: 10px 0;
}

.user_card .van-image {
  margin-right: 10px;
  margin-left: 5px;
}

.user_card ul {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}
.user_card ul li {
  font-size: 14px;
}

.van-swipe-cell__right {
  height: inherit;
}

.van-swipe-cell__right .van-button {
  height: inherit;
}
</style>
