<template>
  <div 
    v-if="visible" 
    class="context-menu" 
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
  >
    <ul>
      <li v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      visible: false,
      position: { x: 0, y: 0 },
      menuItems: [],
    };
  },
  methods: {
    openMenu(event, items) {
      event.preventDefault();
      this.menuItems = items;
      this.position = { x: event.clientX, y: event.clientY };
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    },
    handleMenuClick(item) {
      this.$emit("menu-click", item); // 触发菜单项点击事件
      this.closeMenu();
    },
  },
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.context-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.context-menu li {
  padding: 8px 16px;
  cursor: pointer;
}

.context-menu li:hover {
  background: #f0f0f0;
}
</style>
