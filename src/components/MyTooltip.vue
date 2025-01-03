<template>
  <div class="tooltip-wrapper" ref="triggerElement">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyTooltip",
  props: {
    content: { type: [String, Object], required: true }, // Tooltip 的内容（文本或 DOM）
    placement: { type: String, default: "top" }, // 方向，可选值：top, bottom, left, right
    offset: { type: Number, default: 8 }, // Tooltip 的偏移量
    theme: { type: String, default: "dark" }, // 主题，可选值：dark, light
    trigger: { type: String, default: "hover" }, // 触发方式：hover 或 click
  },
  data() {
    return {
      tooltipContainer: null,
      visible: false,
      tooltipStyles: {
        top: "0px",
        left: "0px",
        position: "absolute",
      },
    };
  },
  methods: {
    showTooltip() {
      this.visible = true;
      this.createTooltipContainer();
      this.$nextTick(() => {
        this.updatePosition();
      });
    },
    hideTooltip() {
      this.visible = false;
      this.removeTooltipContainer();
    },
    updatePosition() {
      const triggerEl = this.$refs.triggerElement;
      const tooltipEl = this.tooltipContainer;

      if (!triggerEl || !tooltipEl) return;

      // 获取触发元素和 Tooltip 的位置信息
      const triggerRect = triggerEl.getBoundingClientRect();
      const tooltipRect = tooltipEl.getBoundingClientRect();

      // 当前页面的滚动偏移
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      let top = 0;
      let left = 0;

      // 根据 placement 设置 Tooltip 的位置
      switch (this.placement) {
        case "top":
          top = triggerRect.top - tooltipRect.height - this.offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + this.offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - this.offset;
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + this.offset;
          break;
      }

      // 加上页面滚动的偏移
      top += scrollY;
      left += scrollX;

      // 设置 Tooltip 样式
      Object.assign(this.tooltipContainer.style, {
        top: `${top}px`,
        left: `${left}px`,
        position: "absolute",
        zIndex: 2000,
      });
    },
    createTooltipContainer() {
      if (!this.tooltipContainer) {
        this.$nextTick(() => {
          // 创建 Tooltip 容器
          this.tooltipContainer = document.createElement("div");
          this.tooltipContainer.className = `tooltip tooltip-${this.theme}`;
          document.body.appendChild(this.tooltipContainer);

          // 设置 Tooltip 内容
          if (typeof this.content === "string") {
            this.tooltipContainer.innerHTML = this.content;
          } else {
            this.tooltipContainer.appendChild(this.content);
          }
        });
      }
    },
    removeTooltipContainer() {
      if (this.tooltipContainer) {
        document.body.removeChild(this.tooltipContainer);
        this.tooltipContainer = null;
      }
    },
  },
  mounted() {
    const triggerEl = this.$refs.triggerElement;

    if (this.trigger === "hover") {
      triggerEl.addEventListener("mouseenter", this.showTooltip);
      triggerEl.addEventListener("mouseleave", this.hideTooltip);
    } else if (this.trigger === "click") {
      triggerEl.addEventListener("click", () => {
        if (this.visible) {
          this.hideTooltip();
        } else {
          this.showTooltip();
        }
      });
      document.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target) && this.visible) {
          this.hideTooltip();
        }
      });
    }
  },
  beforeDestroy() {
    this.removeTooltipContainer();

    const triggerEl = this.$refs.triggerElement;
    if (this.trigger === "hover") {
      triggerEl.removeEventListener("mouseenter", this.showTooltip);
      triggerEl.removeEventListener("mouseleave", this.hideTooltip);
    } else if (this.trigger === "click") {
      triggerEl.removeEventListener("click", this.showTooltip);
    }
  },
};
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
  position: relative;
}

.tooltip {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.2s;
  opacity: 0;
}

.tooltip-dark {
  background-color: #333;
  color: #fff;
}

.tooltip-light {
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
}

.tooltip-visible {
  opacity: 1;
}
</style>
