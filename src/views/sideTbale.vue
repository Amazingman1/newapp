<template>
  <div>
    <h2>高清 Canvas 动态绘制表格</h2>
    <canvas ref="tableCanvas" style="width: 100%;"></canvas>
    <div id="inputContainer"></div>
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
        ["数据3-1", "数据3-2", "数据3-3"],
      ],
      cellWidth: 100,
      cellHeight: 40,
      buttonPositions: [], // 存储按钮位置
      inputValue: '',
      editingCell: null
    };
  },
  computed: {
    canvasLogicalWidth() {
      return (this.getHeaderLevels(this.headers) + this.rows[0].length) * this.cellWidth;
    },
    canvasLogicalHeight() {
      return this.getTotalColumns(this.headers) * this.cellHeight;
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
        let currentY = startY;
        headers.forEach((header, index) => {
          const rowSpan = this.getTotalColumns(header.children) || 1;
          const headerHeight = rowSpan * this.cellHeight;

          const headerWidth =
            header.children.length === 0
              ? (maxLevel - level + 1) * this.cellWidth
              : this.cellWidth;

          // 绘制背景
          ctx.fillStyle = "#f2f2f2";
          ctx.fillRect(startX, currentY, headerWidth, headerHeight);

          // 绘制边框
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#ccc";
          ctx.strokeRect(startX, currentY, headerWidth, headerHeight);

          // 绘制文字
          ctx.fillStyle = "#000";
          ctx.fillText(
            header.label,
            startX + headerWidth / 2,
            currentY + headerHeight / 2
          );

          // 绘制添加按钮
          const buttonX = startX + headerWidth - 20;
          const buttonY = currentY + 5;
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
            headerIndex: index,
            headers: headers
          });

          // 如果有子表头，递归绘制
          if (header.children.length > 0) {
            drawHeaders(
              header.children,
              startX + this.cellWidth,
              currentY,
              level + 1,
              maxLevel
            );
          }

          currentY += headerHeight;
        });
      };

      const maxLevel = this.getHeaderLevels(this.headers);
      drawHeaders(this.headers, 0, 0, 1, maxLevel);

      // 绘制表格数据
      this.rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const x = (maxLevel + colIndex) * this.cellWidth;
          const y = rowIndex * this.cellHeight;

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

      // 检查点击位置是否在按钮区域内
      let buttonClicked = false;
      this.buttonPositions.forEach(button => {
        if (
          logicalX >= button.x &&
          logicalX <= button.x + button.width &&
          logicalY >= button.y &&
          logicalY <= button.y + button.height
        ) {
          const numColumns = parseInt(prompt("请输入需要增加的列数："), 10);
          if (!isNaN(numColumns) && numColumns > 0) {
            this.addSubHeaders(button.headers, button.headerIndex, numColumns);
          }
          buttonClicked = true;
        }
      });

      if (!buttonClicked) {
        // 检查点击位置是否在单元格区域内
        const maxLevel = this.getHeaderLevels(this.headers);
        const rowIndex = Math.floor(logicalY / this.cellHeight);
        const colIndex = Math.floor((logicalX - maxLevel * this.cellWidth) / this.cellWidth);

        if (rowIndex >= 0 && rowIndex < this.rows.length && colIndex >= 0 && colIndex < this.rows[rowIndex].length) {
          this.editingCell = { rowIndex, colIndex };
          this.inputValue = this.rows[rowIndex][colIndex];
          this.renderInputBox(rect.left + (maxLevel + colIndex) * this.cellWidth, rect.top + rowIndex * this.cellHeight, this.cellWidth, this.cellHeight);
        }
      }
    },
    // 渲染输入框
    renderInputBox(left, top, width, height) {
      const inputContainer = document.getElementById('inputContainer');
      inputContainer.innerHTML = ''; // 清空之前的输入框

      const inputBox = document.createElement('input');
      inputBox.style.position = 'absolute';
      inputBox.style.left = `${left}px`;
      inputBox.style.top = `${top}px`;
      inputBox.style.width = `${width}px`;
      inputBox.style.height = `${height}px`;
      inputBox.style.fontSize = '14px';
      inputBox.style.textAlign = 'center';
      inputBox.value = this.inputValue;

      inputBox.addEventListener('blur', (e) => {
        this.handleInputBlur(e);
        inputBox.style.display = 'none';
      });
      inputBox.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
          this.handleInputEnter(e);
          inputBox.style.display = 'none';

        }
      });

      inputContainer.appendChild(inputBox);
      inputBox.focus();
    },
    // 处理输入框失去焦点事件
    handleInputBlur(e) {
      this.updateCellValue(e.target.value);
    },
    // 处理输入框按下回车事件
    handleInputEnter(e) {
      this.updateCellValue(e.target.value);
    },
    // 更新单元格值
    updateCellValue(val) {
      if (this.editingCell) {
        const { rowIndex, colIndex } = this.editingCell;
        this.rows[rowIndex].splice(colIndex, 1, val);
        this.editingCell = null;
        this.drawTable();
      }
    },
    // 添加子表头
    addSubHeaders(headers, headerIndex, numColumns) {
      const targetHeader = headers[headerIndex];
      for (let i = 0; i < numColumns; i++) {
        const newHeader = { label: `子列${headerIndex + 1}-${targetHeader.children.length + 1}`, children: [] };
        targetHeader.children.push(newHeader);
      }

      // 添加新行
      for (let i = 0; i < numColumns; i++) {
        const newRow = new Array(this.rows[0].length).fill(`数据${this.rows.length + 1}-${i + 1}`);
        this.rows.push(newRow);
      }

      this.$nextTick(() => {
        this.drawTable();
      });
    },
  },
  mounted() {
    this.drawTable();
    window.addEventListener('resize', this.drawTable);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.drawTable);
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  display: block;
  margin: 0 auto;
}
</style>