<template>
  <el-form
    class="card-body"
    ref="ruleForm"
    label-width="80px"
    :rules="rules"
    :model="value"
    @keyup.enter.native="submit('ruleForm')"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="value.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="value.email"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="value.sex" placeholder="请选择">
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
      <el-input type="password" v-model="value.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="again_password">
      <el-input
        type="password"
        v-model="value.again_password"
        prop="again_password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('ruleForm')">{{ buttonValue }}</el-button>
      <div class="link" @click="() => $router.push(link.path)">
        <span>{{ link.name }}</span>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "userForm",
  props: {
    value: {
      type: Object,
      default: () => ({
        username: "",
        email: "",
        sex: "",
        password: "",
        again_password: "",
      }),
    },
    link: {
      type: Object,
      default: () => ({
        name: "",
        path: "",
      }),
    },
    buttonValue: {
      type: String,
      default: "",
    },
  },
  // props: ["link", "value"],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.value.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //   model: {
      //     username: "",
      //     email: "",
      //     sex: "",
      //     password: "",
      //     again_password: "",
      //   },
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
        again_password: [{ required: true, validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    async submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = {
            username: this.value.username,
            email: this.value.email,
            sex: this.value.sex,
            password: this.value.password,
          };
          this.$emit("add_user", data);
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
.card-body {
  margin-top: 2rem;
}
.link {
  float: right;
  cursor: pointer;
}
</style>
