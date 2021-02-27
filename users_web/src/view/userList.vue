<template>
  <div>
    <el-row :gutter="20" type="flex" justify="start">
      <el-col :span="10">
        <h1>用户列表</h1>
      </el-col>
    </el-row>
    <tableData :data="allUserList" @table_updata="getUserList"></tableData>
  </div>
</template>

<script>
import tableData from "../components/tableData.vue";
export default {
  components: {
    tableData,
  },
  data() {
    return {
      allUserList: [],
    };
  },
  computed: {},
  methods: {
    async getUserList() {
      const res = await this.$http.get("/userList" + "?data=" + new Date().getTime());
      this.allUserList = res.data;
      console.log("111");
    },
  },
  mounted() {},
  created() {
    this.getUserList();
    // if (sessionStorage.getItem("currentPage")) {
    //   this.currentPage = sessionStorage.getItem("currentPage");
    // }
  },
};
</script>

<style>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
