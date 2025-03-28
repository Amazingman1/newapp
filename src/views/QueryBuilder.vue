<template>
  <div class="query-builder">
    <div class="logic-wrapper">
      <div class="vertical-line top"></div>
      <!-- <select 
        v-model="node.logical"
        class="logic-select"
        v-if="node.type === 'group'"
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select> -->
      <el-radio-group
        class="logic-select"
        v-if="node.type === 'group'"
        v-model="node.logical"
        size="small"
      >
            <el-radio-button label="AND" style="margin-bottom: 0px">且</el-radio-button>
            <el-radio-button label="OR">或</el-radio-button>
          </el-radio-group>
      <div class="vertical-line bottom"></div>
    </div>
    <div class="group-container" :style="{ marginLeft:  10 + 'px' }">
      <div class="group-header">
        
        <button @click="addCondition" class="action-btn">
          <i class="fas fa-plus-circle"></i>
          添加条件
        </button>

        <button 
          v-if="node.type === 'group'"
          @click="addGroup"
          class="action-btn"
        >
          <i class="fas fa-layer-group"></i>
          添加组
        </button>
        <button 
          v-if="depth > 0"
          @click="$emit('remove')"
          class="delete-btn"
        >
          ×
        </button>
      </div>

      <div class="group-body">
        <template v-for="(child, index) in node.children">
          <query-builder
            v-if="child.type === 'group'"
            :key="`group-${index}`"
            :node="child"
            :depth="depth + 1"
            :fields="fields"
            @remove="removeChild(index)"
            class="nested-group"
          />
          
          <condition-row
            v-else
            :key="`condition-${index}`"
            :condition="child"
            :fields="fields"
            @remove="removeChild(index)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ConditionRow from './ConditionRow.vue'

export default {
  name: 'QueryBuilder',
  components: { ConditionRow },
  props: {
    node: { type: Object, required: true },
    depth: { type: Number, default: 0 },
    fields: { type: Array, required: true }
  },
  methods: {
    addCondition() {
      this.node.children.push({
        type: 'condition',
        field: '',
        operator: 'eq',
        value: ''
      })
    },
    
    addGroup() {
      this.node.children.push({
        type: 'group',
        logical: 'AND',
        children: []
      })
    },
    
    removeChild(index) {
      this.node.children.splice(index, 1)
    }
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .group-header {
    flex-wrap: wrap;
  }
  
  .action-btn {
    font-size: 0;
    padding: 8px;
  }
  
  .action-btn i {
    font-size: 14px;
  }
}





</style>
<!-- QueryBuilder.vue 样式改进 -->
<style scoped>
.vertical-line {
  /* position: absolute; */
  left: 50%;
  width: 2px;
  background: #409EFF;
  transform: translateX(-50%);
}

.vertical-line.top {
  top: 0;
  height: calc(50% - 25px); /* 留出选择框空间 */
}

.vertical-line.bottom {
  bottom: 0;
  height: calc(50% - 25px);
}
.query-builder{
  display: flex;
  align-items: center;
}
.group-container {
  flex: 1;
  position: relative;
  margin: 12px 0;
  padding-left: 32px;
  transition: all 0.3s ease;
}

/* .group-container::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 40px;
  bottom: 16px;
  width: 2px;
  background: var(--primary-color);
  opacity: 0.6;
} */

.group-header {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
}


.action-btn {
  padding: 6px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
.query-group {
  position: relative;
  margin: 16px 0;
  padding-left: 24px;
}

/* 连接线容器 */
.connector-line {
  position: absolute;
  left: 0;
  top: 50%;
  width: 24px;
  height: 2px;
  background: #409EFF;
  transform: translateY(-50%);
}

/* 逻辑选择器容器 */
.logic-wrapper {
  align-self: stretch;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 0;

}

.logic-select {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  
}

/* 垂直连接线 */
.query-group::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  bottom: -16px;
  width: 2px;
  background: #409EFF;
  transform: translateX(-50%);
}

/* 操作按钮调整 */
.group-header {
  position: relative;
  min-height: 40px;
  padding-left: 32px;
}

/* 嵌套层级的连接线调整 */
.query-group .query-group::before {
  left: -42px; /* 30px margin + 12px offset */
}

.query-group .query-group .logic-wrapper {
  /* left: -42px; */
}
</style>