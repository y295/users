<template>
  <div>
    <el-row :gutter="20" type="flex" justify="start">
      <el-col :span="10">
        <h1>搜索结果</h1>
      </el-col>
    </el-row>
    <tableData :data="allSearchList" @table_updata="getSearchList"></tableData>
  </div>
</template>

<script>
import tableData from "../components/tableData.vue";
export default {
  components: {
    tableData,
  },
  props: ["value"],
  data() {
    return {
      allSearchList: [],
      //   currentPage: 1,
    };
  },
  computed: {
    // allPage() {
    //   return Math.ceil(this.allSearchList.length / 12);
    // },
    // currentSearchList() {
    //   return this.allSearchList.slice((this.currentPage - 1) * 12, this.currentPage * 12);
    // },
  },
  methods: {
    async getSearchList() {
      const res = await this.$http.get(`/searchList/${this.value}`);
      this.allSearchList = res.data;
      if (!this.allSearchList.length) {
        this.noSearch = "无搜索结果";
      }
    },
    // async deleted(id) {
    //   const res = await this.$http.delete(`/delete/${id}`);
    //   if (res.data.status === 0) {
    //     await this.getSearchList();
    //     this.$message({
    //       type: "success",
    //       message: res.data.message,
    //     });
    //     // await this.getUserList();
    //     // console.log(this.currentSearchList);
    //     if (!this.currentSearchList.length && this.currentPage != 1) {
    //       this.currentPage--;
    //     }
    //   }
    // },
    // getCurrentPage(currentPage) {
    //   this.currentPage = currentPage;
    // },
  },
  mounted() {},
  created() {
    this.getSearchList();
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
