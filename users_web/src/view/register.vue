<template>
  <div class="body-bg">
    <div class="page-register">
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>请注册</span>
        </div>
        <!-- card body -->
        <el-form
          class="card-body"
          ref="ruleForm"
          label-width="80px"
          :rules="rules"
          :model="model"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="model.email"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="model.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="again_password">
            <el-input
              type="password"
              v-model="model.again_password"
              prop="again_password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register('ruleForm')">注册</el-button>
            <div class="go_login" @click="() => $router.push('/login')">
              <span>登录账号</span>
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.model.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      model: {
        username: "",
        email: "",
        sex: "",
        password: "",
        again_password: "",
      },
      options: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "change" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "change" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "change" },
        ],
        again_password: [{required: true, validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    async register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = {
            username: this.model.username,
            email: this.model.email,
            sex: this.model.sex,
            password: this.model.password,
          };
          const res = await this.$http.post("/register", data);
          if (res.data.status === 0) {
            this.$router.push("/login");
            this.$message({
              type: "success",
              message: res.data.message,
            });
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
}
.page-register {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.page-register .card-view {
  width: 30%;
  padding: 2rem;
}
.page-register .card-body {
  margin-top: 2rem;
}
.page-register .go_login {
  float: right;
  cursor: pointer;
}
</style>
