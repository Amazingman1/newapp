<template>
  <div class="custom-select-wrapper">
    <!-- 自定义选择框 -->
    <div class="custom-select" @click="toggleDropdown" ref="selectBox">
      <input 
        type="text" 
        v-model="customSelected" 
        :placeholder="placeholder" 
        readonly
        class="select-input"
      />
      <!-- 下拉箭头 -->
      <span class="arrow" :class="{'active': isDropdownVisible}"></span>
    </div>

    <!-- 下拉菜单 -->
    <div v-if="isDropdownVisible" class="dropdown-menu" :style="dropdownStyles">
      <div 
        v-for="(option, index) in options" 
        :key="index" 
        class="dropdown-item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholder: '请选择', // 输入框的占位符
      selectedValue: null,   // 绑定选中的值
      customSelected: '',    // 用来显示自定义内容
      isDropdownVisible: false, // 控制下拉菜单的显示
      options: [
        { value: '1', label: '苹果' },
        { value: '2', label: '香蕉' },
        { value: '3', label: '橙子' }
      ],
      dropdownStyles: {
        top: '100%', // 下拉框的位置
        left: '0',
        width: '100%' // 下拉框的宽度
      }
    };
  },
  methods: {
    toggleDropdown() {
      // 切换下拉菜单的显示和隐藏
      this.isDropdownVisible = !this.isDropdownVisible;

      // 计算下拉菜单的位置
      this.calculateDropdownPosition();
    },
    selectOption(option) {
      // 选择选项时，设置选中值并关闭下拉菜单
      this.selectedValue = option.value;
      this.customSelected = `你选择了: ${option.label}`; // 自定义选中项显示的内容
      this.isDropdownVisible = false; // 选择后关闭下拉菜单
    },
    calculateDropdownPosition() {
      // 获取选择框的位置信息
      const selectBox = this.$refs.selectBox;
      const rect = selectBox.getBoundingClientRect();

      // 动态设置下拉框的位置
      this.dropdownStyles.top = `${rect.bottom + window.scrollY}px`;
      this.dropdownStyles.left = `${rect.left + window.scrollX}px`;
      this.dropdownStyles.width = `${rect.width}px`; // 确保下拉框宽度与选择框一致
    },
    closeDropdown() {
      // 点击页面其他地方时关闭下拉菜单
      this.isDropdownVisible = false;
    }
  },
  mounted() {
    // 监听点击事件，点击其他地方时关闭下拉菜单
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    // 组件销毁前移除事件监听
    document.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style scoped>
.custom-select-wrapper {
  position: relative;
  width: 200px; /* 自定义宽度 */
}

.custom-select {
  position: relative;
  width: 100%;
  font-size: 14px;
}

.select-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  transition: transform 0.3s ease;
}

.arrow.active {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>
