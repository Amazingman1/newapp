<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="字段key" :label-width="formLabelWidth">
        <el-input v-model="form.prop" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="值" :label-width="formLabelWidth">
        <el-input v-model="form.label" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        label: '',
        prop: '',
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    showDialog() {
      this.form = {
        label: '',
        prop: '',
      };
      this.dialogFormVisible = true;
    },
    handleSave() {
      this.$emit("save", this.form);
      this.dialogFormVisible = false;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>