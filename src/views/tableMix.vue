<template>
  <div>
    <Tooltip content="这是一个提示" placement="top" theme="dark">
      <button>Hover me</button>
    </Tooltip>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180">
        <template slot-scope="scope">
          <Tooltip content="名字提示" placement="top">
            <span>{{ scope.row.name }}</span>
          </Tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Tooltip from "@/components/MyTooltip";

export default {
  components: { Tooltip },
  data() {
    return {
      tableData: [
        { name: "John Doe" },
        { name: "Jane Smith" },
      ],
    };
  },
};
</script>
