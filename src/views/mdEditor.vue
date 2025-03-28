<template>
   <!-- <v-md-preview :text="text"></v-md-preview> -->
    <div class="markdown-body" v-html="text"></div>
</template>

<script>

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/atom-one-dark.css';
export default {
  data() {
    return {
      text: "",
      md: new MarkdownIt({
        html: true,        // 允许 HTML 标签
        breaks: true,      // 转换换行符为 <br>
        linkify: true,     // 自动转换 URL 为链接
        typographer: true , // 优化排版（如引号替换）
        highlight: (str, lang) => {
        // 如果指定了语言，尝试高亮
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `
              <pre class="hljs"><code>
                ${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}
              </code></pre>
            `;
          } catch (__) {
            // 如果高亮失败，返回原始内容
            return `
              <pre class="hljs"><code>
                ${this.md.utils.escapeHtml(str)}
              </code></pre>
            `;
          }
        }

    // 未指定语言或高亮失败时，使用默认处理
    return `
      <pre class="hljs"><code>${this.md.utils.escapeHtml(str)}</code></pre>
    `;
  }
      }),
    };
  },
  mounted() {
    this.updatePreview();
  },
  methods: {
    updatePreview() {
      fetch("/v2.md")
        .then((res) => {
          if (!res.ok) throw new Error('文件加载失败');
          return res.text();
        })
        .then((data) => {
          this.renderMarkdown(data);
        });
    },
    renderMarkdown(data) {
      this.text = this.md.render(data);
    },
    
  },
};
</script>
<style lang="scss" scoped>
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>