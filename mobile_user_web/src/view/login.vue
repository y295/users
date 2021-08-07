<template>
  <div class="login_wrap">
    <div class="demo-nav"><div class="demo-nav__title">登录</div></div>
    <van-loading size="24px" v-if="loading">登录中...</van-loading>
    <div class="login">
      <van-form @submit="login">
        <van-field
          v-model="model.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="rules.username"
        />
        <van-field
          v-model="model.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="rules.password"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      model: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          {
            validator: (value) => {
              //   console.log(value.length);
              if (value.length < 3 || value.length > 12) {
                return false;
              }
            },
            message: "长度在 3 到 12 个字符",
          },
        ],
        password: [
          { required: true, message: "请输入密码" },
          {
            validator: (value) => {
              //   console.log(value.length);
              if (value.length < 6 || value.length > 12) {
                return false;
              }
            },
            message: "长度在 6 到 12 个字符",
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("/login", this.model);
      if (res.data.status === 0) {
        this.loading = true;
        setTimeout(() => {
          this.$notify({
            type: "success",
            message: res.data.message,
          });
          sessionStorage.setItem("username", this.model.username);
          this.loading = false;
          this.$router.push("/");
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.login_wrap {
  height: 100%;
  display: flex;
  flex-direction: column;

  /* flex-direction:column;; */
  background-color: #f7f8fa;
}
.login {
  /* justify-self: center; */
  margin-top: auto;
  margin-bottom: auto;
}
.van-form {
}
.demo-nav {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 56px;
  background-color: #fff;
}
.demo-nav__title {
  font-weight: 600;
  font-size: 17px;
  text-transform: capitalize;
}
.van-loading {
  align-self: center;
  margin-top: 10px;
}

/* .loading_wrap {
    position: absolute;
    height: 100%;
    width: 100%;
}
.loading {
    display:flex;
    height: 100%;
    flex-direction:column;
    align-items: center;
    justify-content: center;

} */
</style>
