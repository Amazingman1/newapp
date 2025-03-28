<template>
  <div id="app">
    <div class="container">
      <h1>SQL 风格树形筛选器</h1>
      
      <!-- 查询构建器 -->
      <query-builder 
        :node="conditionTree"
        :fields="fields"
        :rawData="rawData"
        @change="handleQueryChange"
      />

    </div>
  </div>
</template>

<script>
import QueryBuilder from './QueryBuilder.vue'
import {constantRoutes,group} from './cc.js'

export default {
  components: { QueryBuilder },
  data() {
    return {
      // 原始数据
      rawData: [
        { id: 1, name: '张三', age: 25, status: 'active', joinDate: '2023-01-15' },
        { id: 2, name: '李四', age: 32, status: 'inactive', joinDate: '2022-11-01' },
        { id: 3, name: '王五', age: 28, status: 'active', joinDate: '2023-03-20' }
      ],
      
      // 字段配置
      fields: [
        { key: 'name', label: '姓名', type: 'string' },
        { key: 'age', label: '年龄', type: 'number' },
        { key: 'status', label: '状态', type: 'enum', options: ['active', 'inactive'] },
        { key: 'joinDate', label: '加入日期', type: 'date' }
      ],
      
      // 条件树结构
      conditionTree: {
        type: 'group',
        logical: 'AND',
        children: [
          {
            type: 'condition',
            field: 'status',
            operator: 'eq',
            value: 'active'
          }
        ]
      }
    }
  },
  computed: {
    filteredData() {
      return this.evaluateQuery(constantRoutes)
    }
  },
  created() {
   console.log(this.transformStructure(constantRoutes)) 
   console.log(this.reverseTransform(this.transformStructure(constantRoutes)))
  },
  methods: {
    handleQueryChange(newTree) {
      console.log('条件树更新:', newTree)
    },
   transformStructure(origin) {
  // 基础类型校验
  if (!origin || typeof origin !== 'object') return origin;

  // 处理分组结构
  if (origin.type === 'group') {
    return {
      logic: origin.logic,
      children: origin.children.map(child => {
        // 子元素是条件
        if (!child.type || child.type !== 'group') {
          return { comp: child };
        }
        // 子元素是分组
        return { 
          group: this.transformStructure(child) 
        };
      })
    };
  }

  // 处理普通条件
  return { comp: origin };
},

reverseTransform(transformed) {
  return {
    type: 'group',
    logic: transformed.logic,
    children: transformed.children.map(item => {
      if (item.comp) return item.comp;
      if (item.group) return this.reverseTransform(item.group);
      return null;
    }).filter(Boolean)
  };
},
    evaluateQuery(node) {
      const evaluator = {
        condition: (cond) => {
          return this.rawData.filter(item => this.checkCondition(cond, item))
        },
        group: (group) => {
          const results = group.children.map(child => this.evaluateQuery(child))
          return group.logical === 'AND' 
            ? results.reduce((a, b) => a.filter(x => b.includes(x)))
            : [...new Set(results.flat())]
        }
      }
      return evaluator[node.type](node)
    },
    
    checkCondition(cond, item) {
      const field = this.fields.find(f => f.key === cond.field)
      if (!field) return false
      
      const itemValue = item[cond.field]
      const condValue = this.parseValue(cond.value, field.type)
      
      const operators = {
        eq: (a, b) => a == b,
        neq: (a, b) => a != b,
        gt: (a, b) => a > b,
        gte: (a, b) => a >= b,
        lt: (a, b) => a < b,
        lte: (a, b) => a <= b,
        contains: (a, b) => String(a).includes(b),
        startsWith: (a, b) => String(a).startsWith(b),
        endsWith: (a, b) => String(a).endsWith(b),
        between: (a, [min, max]) => a >= min && a <= max
      }
      
      return operators[cond.operator]?.(itemValue, condValue) ?? false
    },
    
    parseValue(value, type) {
      switch (type) {
        case 'number': return Number(value)
        case 'date': return new Date(value).getTime()
        case 'boolean': return Boolean(value)
        default: return value
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.results {
  margin-top: 30px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

pre {
  background: white;
  padding: 10px;
  border-radius: 4px;
  max-height: 400px;
  overflow: auto;
}


/* 卡片式容器 */
.container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 24px;
  margin: 20px auto;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 条件组展开动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
