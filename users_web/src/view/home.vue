<template>
  <div class="container_wrap">
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu :default-openeds="['1']" router>
          <div class="title"><h1>用户管理系统</h1></div>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>用户</template>
            <el-menu-item-group>
              <el-menu-item index="/home/userList">用户列表</el-menu-item>
              <el-menu-item index="/home/addUsers">新增用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header height="60px">
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="12"
              ><el-input placeholder="用户名" type="search" v-model="searchValue">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="toSearch"
                ></el-button> </el-input
            ></el-col>
            <el-col :span="12">
              <div class="header_right">
                <el-dropdown @command="command">
                  <i class="el-icon-setting" style="margin-right: 15px"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="signOut">退出 </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span>{{ username }}</span>
              </div>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      searchValue: "",
    };
  },
  methods: {
    toSearch() {
      if (this.searchValue) {
        this.$router.push(`/home/searchList/${this.searchValue}`);
      }
    },
    command(item_command) {
      if (item_command === "signOut") {
        this.$router.push("/login");
      }
    },
  },
  created() {
    // PushMenu();
    if (sessionStorage.getItem("username")) {
      this.username = sessionStorage.getItem("username");
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.container_wrap,
.el-container,
.el-aside,
.el-menu {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  /* text-align: right; */
  font-size: 12px;
}
.el-header .el-input {
}
.header_right {
  float: right;
}
.el-aside {
  color: #333;
  background: #fff;
}

.title {
  display: flex;
  height: 60px;
  background: #fff;
  align-items: center;
}
.title h1 {
  background: #fff;
  /* margin: auto; */
  padding-left: 20px;
  /* height: 60px; */
}
.el-main {
  height: 100%;
  padding-top: 5px;
}
.el-input {
  width: 300px;
}
</style>
