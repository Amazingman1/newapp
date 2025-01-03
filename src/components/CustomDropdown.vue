<template>
  <div class="custom-dropdown" ref="dropdown">
    <!-- 触发按钮 -->
    <div class="trigger" @click="toggleDropdown">
      <slot name="trigger"></slot>
    </div>

    <!-- 下拉菜单内容 -->
    <transition name="fade">
      <div
        v-if="visible"
        class="dropdown-menu"
        ref="menu"
        @click.stop
        style="z-index: 1050;"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CustomDropdown",
  data() {
    return {
      visible: false, // 下拉菜单显示状态
    };
  },
  methods: {
    toggleDropdown() {
      this.visible = !this.visible
    },
    closeDropdown() {
      this.visible = false;
    },
    handleClickOutside(event) {
      // 点击外部关闭下拉菜单
      if (
        this.visible &&
        !this.$refs.menu.contains(event.target) &&
        !this.$refs.dropdown.contains(event.target)
      ) {
        this.closeDropdown();
      }
    },
  },
  mounted() {

    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.custom-dropdown {
  position: relative;
  display: inline-block;


}

.trigger {
  cursor: pointer;
}

.dropdown-menu {
  position: relative;
  top: 100%;  /* 确保在触发器下方显示 */
  left: 0;
  z-index: 1000;  /* 确保菜单在其他元素之上 */
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-width: 220px;
  max-height: 300px; /* 限制最大高度，防止溢出 */
  overflow-y: auto; /* 当内容多时出现滚动条 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
