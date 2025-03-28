<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button v-if="file" @click="startUpload">开始上传</button>
    <div v-if="progress !== null">
      <p>上传进度：{{ progress }}%</p>
      <progress :value="progress" max="100"></progress>
    </div>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,                // 当前选择的文件
      chunkSize: 5 * 1024 * 1024,  // 每个分片的大小，5MB
      totalChunks: 0,            // 总分片数量
      uploadedChunks: [],        // 已上传的分片
      progress: null,            // 上传进度
      errorMessage: '',          // 错误信息
    };
  },
  methods: {
    // 处理文件选择
    handleFileChange(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.totalChunks = Math.ceil(this.file.size / this.chunkSize);  // 计算总分片数
        this.uploadedChunks = [];  // 重置上传的分片
        this.progress = 0;         // 重置进度
        this.errorMessage = '';    // 清空错误信息
      }
    },
    
    // 开始上传
    startUpload() {
      if (!this.file) {
        this.errorMessage = '请先选择一个文件！';
        return;
      }
      this.uploadChunks(0);  // 从第一个分片开始上传
    },

    // 上传指定分片
    async uploadChunk(chunkIndex) {
      const start = chunkIndex * this.chunkSize;
      const end = Math.min(start + this.chunkSize, this.file.size);
      const chunk = this.file.slice(start, end);  // 获取当前分片

      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('chunkIndex', chunkIndex);
      formData.append('totalChunks', this.totalChunks);
      formData.append('fileName', this.file.name);

      try {
        const response = await this.$axios.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.success) {
          this.uploadedChunks.push(chunkIndex);  // 记录已上传的分片
          this.updateProgress();
          return true;  // 上传成功
        } else {
          throw new Error('上传失败');
        }
      } catch (error) {
        console.error(`分片 ${chunkIndex} 上传失败`, error);
        return false;  // 上传失败
      }
    },

    // 更新上传进度
    updateProgress() {
      const uploadedCount = this.uploadedChunks.length;
      this.progress = Math.floor((uploadedCount / this.totalChunks) * 100);
      
      if (uploadedCount < this.totalChunks) {
        this.uploadChunks(uploadedCount);  // 上传下一个分片
      }
    },

    // 分片上传：从当前上传的分片开始
    async uploadChunks(chunkIndex) {
      if (chunkIndex >= this.totalChunks) {
        console.log('所有分片上传完成');
        return;
      }

      const success = await this.uploadChunk(chunkIndex);
      if (success) {
        this.uploadChunks(chunkIndex + 1);  // 上传下一个分片
      } else {
        // 上传失败时的处理，可以加入重试机制
        this.errorMessage = `分片 ${chunkIndex} 上传失败，请稍后重试。`;
      }
    }
  }
};
</script>

<style scoped>
progress {
  width: 100%;
  height: 20px;
  margin-top: 10px;
}
</style>
