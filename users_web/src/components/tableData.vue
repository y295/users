<template>
  <div>
    <el-table :data="currentUserList" style="width: 100%">
      <el-table-column prop="username" label="用户名" min-width="200"> </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="200"> </el-table-column>
      <el-table-column prop="sex" label="性别" min-width="200"> </el-table-column>
      <el-table-column prop="password" label="密码" min-width="200"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="() => $router.push(`/home/editUsers/${scope.row.id}`)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="isDelete(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>是否删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleted">确 定</el-button>
      </span>
    </el-dialog>
    <el-row :gutter="20" type="flex" justify="end">
      <el-col :span="10" :pull="1">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="allPage"
          @current-change="getCurrentPage"
        >
        </el-pagination
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "tableData",
  props: ["data"],
  data() {
    return {
      currentPage: 1,
      dialogVisible: false,
      deletedOptionId: "",
    };
  },
  computed: {
    allPage() {
      return Math.ceil(this.data.length / 11);
    },
    currentUserList() {
      return this.data.slice((this.currentPage - 1) * 11, this.currentPage * 11);
    },
  },
  methods: {
    isDelete(deletedOptionId) {
      this.dialogVisible = true;
      this.deletedOptionId = deletedOptionId;
    },
    async deleted() {
      const res = await this.$http.delete(`/delete/${this.deletedOptionId}`);
      this.tableUpdata;
      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: res.data.message,
        });
        this.dialogVisible = false;

        // await this.getUserList();
        console.log(this.currentUserList);
        console.log(this.currentPage);
        if (!this.currentUserList.length && this.currentPage != 1) {
          this.currentPage--;
          console.log(this.currentUserList);
        }
      }
    },
    getCurrentPage(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },
    tableUpdata() {
      this.$emit("table_updata");
    },
  },
  mounted() {},
  created() {
    // this.getUserList();
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
