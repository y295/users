<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
        title="编辑用户"
        left-text="返回"
        left-arrow
        fixed
        placeholder
        @click-left="() => $router.back()"
      >
      </van-nav-bar>
    </div>
    <div>
      <van-form class="edit">
        <van-field
          v-model="model.username"
          label="用户名"
          placeholder="用户名"
          :rules="rules.username"
        />
        <van-field
          v-model="model.email"
          type="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="rules.email"
        />
        <van-field
          v-model="model.sex"
          readonly
          clickable
          label="性别"
          placeholder="性别"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          v-model="model.password"
          type="password"
          label="密码"
          placeholder="密码"
        />
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      showPicker: false,
      columns: ["男", "女"],
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          {
            validator: (value) => {
              //   console.log(value.length);
              if (value.length < 3 || value.length > 12) {
                return false;
              }
            },
            message: "长度在 3 到 12 个字符",
          },
        ],
        email: [
          { required: true, message: "请邮箱地址" },
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: "邮箱格式错误",
          },
        ],
      },
      model: {},
    };
  },
  methods: {
    onConfirm(value) {
      this.model.sex = value;
      this.showPicker = false;
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f7f8fa;
}
.edit {
  margin-top: 15px;
}
</style>
