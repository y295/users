<template>
  <div class="userinfo_wrap">
    <div class="page-userinfo">
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <h1>用户详情</h1>
        </div>
        <!-- card body -->
        <div class="card-body">
          <div class="photo">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              shape="square"
              :size="100"
            ></el-avatar>
            <el-upload
              class="upload-demo"
              name="upload"
              action="http://localhost:3000/web/api/changePhoto"
              :data="user"
              :show-file-list="false"
              :on-success="submitSuccess"
              :before-upload="beforeSubmit"
            >
              <el-button size="small" type="primary">更改头像</el-button>
            </el-upload>
          </div>
          <ul>
            <li>
              <b>用户id:</b> <span>{{ model.id }}</span>
            </li>
            <li>
              <b> 用户名:</b> <span>{{ model.username }}</span>
            </li>
            <li>
              <b>邮箱:</b> <span>{{ model.email }}</span>
            </li>
            <li>
              <b> 性别:</b><span>{{ model.sex }}</span>
            </li>
            <li>
              <b> 密码:</b><span>{{ model.password }}</span>
            </li>
          </ul>
          <div class="goEdit">
            <el-button
              type="primary"
              @click.stop="() => $router.push(`/home/editUsers/${model.id}`)"
              >编辑</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      model: {},
    };
  },
  computed: {
    user() {
      return {
        id: this.id,
      };
    },
  },
  methods: {
    async getUser() {
      const res = await this.$http.get(`/getUser/${this.id}`);
      //   console.log(res.data);
      this.model = res.data;
      this.model.again_password = res.data.password;
    },
    beforeSubmit(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitSuccess() {},
  },
  created() {
    this.getUser();
  },
};
</script>

<style scoped>
.userinfo_wrap {
  height: 100%;
}
.page-userinfo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.page-userinfo .card-view {
  width: 40%;
  padding: 2rem;
}
.page-userinfo .card-view h1 {
  margin: 0;
}
.page-userinfo .card-body {
  margin-top: 2rem;
}
.photo {
  padding-inline-start: 40px;
  display: flex;
  align-items: flex-end;
}
.el-avatar {
  margin-right: 1rem;
}
ul li {
  list-style: none;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
ul li span {
  margin-left: 0.5rem;
}
.goEdit {
  padding-inline-start: 40px;
}
</style>
