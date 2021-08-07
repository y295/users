<template>
  <div class="editUsers_wrap">
    <div class="page-editUsers">
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <h1>编辑用户</h1>
        </div>
        <!-- card body -->
        <userForm v-model="model" @add_user="editUsers" :buttonValue="text"></userForm>
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
  props: ["id"],
  data() {
    return {
      model: {
        username: "",
        email: "",
        sex: "",
        password: "",
        again_password: "",
      },
      text: "保存",
    };
  },
  methods: {
    async editUsers(data) {
      data.id = this.id;
      const res = await this.$http.post(`/editUsers/${this.id}`, data);
      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: res.data.message,
        });
        this.$router.push("/home");
      }
    },
    async getUser() {
      const res = await this.$http.get(`/getUser/${this.id}`);
      //   console.log(res.data);
      this.model = res.data;
      this.model.again_password = res.data.password;
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style scoped>
.editUsers_wrap {
  height: 100%;
}
.page-editUsers {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.page-editUsers .card-view {
  width: 40%;
  padding: 2rem;
}
.page-editUsers .card-view h1 {
  margin: 0;
}
</style>
