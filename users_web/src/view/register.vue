<template>
  <div class="body-bg" v-loading="loading" element-loading-text="注册中">
    <div class="page-register">
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>请注册</span>
        </div>
        <userForm
          v-bind:link="link_value"
          v-model="model"
          @add_user="register"
          :buttonValue="text"
        ></userForm>
        <!-- card body -->
      </el-card>
    </div>
  </div>
</template>

<script>
import userForm from "../components/userForm";
export default {
  components: {
    userForm,
  },
  data() {
    return {
      loading: false,
      link_value: {
        name: "去登录",
        path: "/login",
      },
      model: {
        username: "",
        email: "",
        sex: "",
        password: "",
        again_password: "",
      },
      text: "注册",
    };
  },
  methods: {
    async register(data) {
      const res = await this.$http.post("/register", data);
      if (res.data.status === 0) {
        this.loading = true;
        setTimeout(() => {
          this.$message({
            type: "success",
            message: res.data.message,
          });
          this.loading = false;
          this.$router.push("/login");
        }, 3000);
      }
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
</style>
