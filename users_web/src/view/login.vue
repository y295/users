<template>
  <div class="body-bg" v-loading="loading" element-loading-text="登录中">
    <div class="page-login">
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>请登录</span>
        </div>
        <!-- card body -->
        <el-form
          class="card-body"
          ref="ruleForm"
          label-width="80px"
          :rules="rules"
          :model="model"
          @keyup.enter.native="login('ruleForm')"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" autofocus></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('ruleForm')">登录</el-button>
            <div class="go_register" @click="() => $router.push('/register')">
              <span>注册账号</span>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
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
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   alert("submit!");
          const res = await this.$http.post("/login", this.model);
          if (res.data.status === 0) {
            this.loading = true;
            setTimeout(() => {
              this.$message({
                type: "success",
                message: res.data.message,
              });
              sessionStorage.setItem("username", this.model.username);
              this.loading = false;
              this.$router.push("/");
            }, 3000);
          }
        } else {
          //   console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.body-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  min-width: 1280px;
}
.page-login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.page-login .card-view {
  width: 30%;
  padding: 2rem;
}
.page-login .card-body {
  margin-top: 2rem;
}
.page-login .go_register {
  float: right;
  cursor: pointer;
}
</style>
