<template>
  <div>
    <el-table :data="currentUserList" style="width: 100%" @row-click="goUser">
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
            @click.stop="() => $router.push(`/home/editUsers/${scope.row.id}`)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click.stop="isDelete(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="20%"
      :lock-scroll="true"
      :modal="false"
      :append-to-body="true"
      ref="dialog"
    >
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
          :total="data.length"
          :page-size="11"
          :current-page="currentPage"
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
      showHidden: true,
    };
  },
  computed: {
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
      // await this.tableUpdata();
      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: res.data.message,
        });
        this.dialogVisible = false;
        this.$emit("table_updata");
        // await this.getUserList();
        if (this.currentUserList.length == 1 && this.currentPage != 1) {
          this.currentPage--;
          sessionStorage.setItem("currentPage", this.currentPage);
        }
      }
    },
    getCurrentPage(currentPage) {
      this.currentPage = currentPage;
      sessionStorage.setItem("currentPage", this.currentPage);
    },
    async tableUpdata() {
      this.$emit("table_updata");
    },
    goUser(row) {
      this.$router.push(`/home/userinfo/${row.id}`);
    },
  },
  mounted() {},
  created() {
    // this.getUserList();
    if (sessionStorage.getItem("currentPage")) {
      this.currentPage = parseInt(sessionStorage.getItem("currentPage"));
    }
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
