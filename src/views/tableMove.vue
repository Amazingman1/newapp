<template>
  <div>
    <h2>高清 Canvas 动态绘制表格</h2>
    <canvas ref="tableCanvas" style="width: 100%;"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { label: "列1", children: [] },
        { label: "列2", children: [] },
        { label: "列3", children: [] },
      ],
      rows: [
        ["数据1-1", "数据1-2", "数据1-3"],
        ["数据2-1", "数据2-2", "数据2-3"],
      ],
      cellWidth: 100,
      cellHeight: 40,
      buttonPositions: [] // 存储按钮位置
    };
  },
  computed: {
    canvasLogicalWidth() {
      return this.getTotalColumns(this.headers) * this.cellWidth;
    },
    canvasLogicalHeight() {
      return (this.getHeaderLevels(this.headers) + this.rows.length) * this.cellHeight;
    },
  },
  methods: {
    // 获取表头最大层级数
    getHeaderLevels(headers, level = 1) {
      let maxLevel = level;
      headers.forEach(header => {
        if (header.children.length > 0) {
          maxLevel = Math.max(maxLevel, this.getHeaderLevels(header.children, level + 1));
        }
      });
      return maxLevel;
    },
    // 获取总列数
    getTotalColumns(headers) {
      return headers.reduce((sum, header) => {
        if (header.children.length > 0) {
          return sum + this.getTotalColumns(header.children);
        }
        return sum + 1;
      }, 0);
    },
    // 绘制表格
    drawTable() {
      const canvas = this.$refs.tableCanvas;
      const ctx = canvas.getContext("2d");

      // 获取设备像素比
      const dpr = window.devicePixelRatio || 1;

      // 设置实际宽高和逻辑宽高比例
      canvas.width = this.canvasLogicalWidth * dpr;
      canvas.height = this.canvasLogicalHeight * dpr;
      canvas.style.width = `${this.canvasLogicalWidth}px`;
      canvas.style.height = `${this.canvasLogicalHeight}px`;

      // 缩放绘图上下文以适配高分辨率
      ctx.scale(dpr, dpr);

      // 设置通用样式
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      this.buttonPositions = []; // 清空按钮位置

      const drawHeaders = (headers, startX, startY, level, maxLevel) => {
        let currentX = startX;
        headers.forEach((header, index) => {
          const colSpan = this.getTotalColumns(header.children) || 1;
          const headerWidth = colSpan * this.cellWidth;

          const headerHeight =
            header.children.length === 0
              ? (maxLevel - level + 1) * this.cellHeight
              : this.cellHeight;

          // 绘制背景
          ctx.fillStyle = "#f2f2f2";
          ctx.fillRect(currentX, startY, headerWidth, headerHeight);

          // 绘制边框
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "#000";
          ctx.strokeRect(currentX, startY, headerWidth, headerHeight);

          // 绘制文字
          ctx.fillStyle = "#000";
          ctx.fillText(
            header.label,
            currentX + headerWidth / 2,
            startY + headerHeight / 2
          );

          // 绘制添加按钮
          const buttonX = currentX + headerWidth - 20;
          const buttonY = startY + 5;
          const buttonWidth = 15;
          const buttonHeight = 15;

          ctx.fillStyle = "#007bff";
          ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
          ctx.fillStyle = "#fff";
          ctx.fillText("+", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);

          // 存储按钮位置
          this.buttonPositions.push({
            x: buttonX,
            y: buttonY,
            width: buttonWidth,
            height: buttonHeight,
            headerIndex: index
          });

          // 如果有子表头，递归绘制
          if (header.children.length > 0) {
            drawHeaders(
              header.children,
              currentX,
              startY + this.cellHeight,
              level + 1,
              maxLevel
            );
          }

          currentX += headerWidth;
        });
      };

      const maxLevel = this.getHeaderLevels(this.headers);
      drawHeaders(this.headers, 0, 0, 1, maxLevel);

      // 绘制表格数据
      this.rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const x = colIndex * this.cellWidth;
          const y = (maxLevel + rowIndex) * this.cellHeight;

          // 绘制背景
          ctx.fillStyle = rowIndex % 2 === 0 ? "#ffffff" : "#f9f9f9";
          ctx.fillRect(x, y, this.cellWidth, this.cellHeight);

          // 绘制边框
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#ccc";
          ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);

          // 绘制文字
          ctx.fillStyle = "#000";
          ctx.fillText(cell, x + this.cellWidth / 2, y + this.cellHeight / 2);
        });
      });

      // 添加点击事件监听器
      canvas.addEventListener('click', this.handleCanvasClick);
    },
    // 处理 Canvas 点击事件
    handleCanvasClick(event) {
      const canvas = this.$refs.tableCanvas;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const dpr = 1 || 1;
      const logicalX = x * dpr;
      const logicalY = y * dpr;
      console.log(logicalX, logicalY);
      // 检查点击位置是否在按钮区域内
      this.buttonPositions.forEach(button => {
      console.log('buttonXY：',button.x, button.y);
      console.log('buttonX+W：', button.x + button.width);
      console.log('buttonY+H：', button.y + button.height);
      console.log('buttonX：',  logicalX >= button.x);
      console.log('buttonX+W：', logicalX <= button.x + button.width );
        if (
          logicalX >= button.x &&
          logicalX <= button.x + button.width &&
          logicalY >= button.y &&
          logicalY <= button.y + button.height
        ) {
          const numColumns = parseInt(prompt("请输入需要增加的列数："), 10);
          if (!isNaN(numColumns) && numColumns > 0) {
            this.addSubHeaders(button.headerIndex, numColumns);
          }
        }
      });
    },
    // 添加子表头
    addSubHeaders(headerIndex, numColumns) {
      const targetHeader = this.headers[headerIndex];
      for (let i = 0; i < numColumns; i++) {
        const newHeader = { label: `子列${headerIndex + 1}-${targetHeader.children.length + 1}`, children: [] };
        targetHeader.children.push(newHeader);

        // 在行数据中添加新列
        this.rows.forEach(row => row.push(`数据${row.length + 1}`));
      }

      this.$nextTick(() => {
        this.drawTable();
      });
    },
  },
  mounted() {
    this.drawTable();
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  display: block;
  margin: 0 auto;
}
</style>