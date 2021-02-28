<template>
  <div class="addUsers_wrap">
    <div class="page-addUsers">
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <h1>新建用户</h1>
        </div>
        <!-- card body -->
        <userForm v-model="model" @add_user="addUsers" :buttonValue="text"></userForm>
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
      model: {
        username: "",
        email: "",
        sex: "",
        password: "",
        again_password: "",
      },
      text: "提交",
    };
  },
  methods: {
    async addUsers(data) {
      const res = await this.$http.post("/addUsers", data);
      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: res.data.message,
        });
      }
    },
  },
};
</script>

<style scoped>
.addUsers_wrap {
  height: 100%;
}
.page-addUsers {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.page-addUsers .card-view {
  width: 40%;
  padding: 2rem;
}
.page-addUsers .card-view h1 {
  margin: 0;
}
</style>
