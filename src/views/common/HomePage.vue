<script setup lang="ts">
import { Fast } from '@/modules/service'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
// eslint-disable-next-line import/no-extraneous-dependencies
import hljs from 'highlight.js'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'highlight.js/styles/vs.css'
import mdAttrs from 'markdown-it-attrs'
import mdEmoji from 'markdown-it-emoji'

const md: any = new MarkdownIt({
  html: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`
        // eslint-disable-next-line no-empty
      } catch (__) {
      }
    }
    return `<pre class="hljs"><code>${  md.utils.escapeHtml(str)  }</code></pre>`
  }
})
md.use(mdAttrs)
md.use(mdEmoji)

const route = useRoute()

const loading = ref(false)
const question = ref(route.query.q)
const test = [{'role':'user','content':'你好'}]

const text = ref('')
const markdownText: any = ref()

console.log(JSON.stringify(test))

async function search() {
  markdownText.value = ''
  text.value = ''
  loading.value = true
  const sse = new EventSource(`https://api.miragari.com/fast/streamChat?q=${question.value}`)
  sse.onmessage = e => {
    const result = JSON.parse(e.data).choices[0].delta
    if(result.content){
      text.value += result.content
    }
    markdownText.value = md.render(text.value)
  }
  sse.addEventListener('stop',event => {
    sse.close()
    loading.value = false
  })
}

if (question.value !== undefined) {
  search()
}

</script>

<template>
  <TheContainer>
    <div class="main">
      <div class="mainText">
        <div style="font-size: 96px">快速发起一次<span style="color: #f17eb8;">AI</span>问答</div>
        <div>Powered by GPT-3.5 AI</div>
      </div>
      <el-input class="infoCard" style="min-height: 60px;" v-model="question" @keyup.enter="search" :disabled="loading"
                placeholder="输入问题，回车发送" />
      <el-card shadow="never" class="infoCard" style="min-height: 180px;">
        <div v-html="markdownText" class="markdown"></div>
      </el-card>
    </div>
  </TheContainer>
</template>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.mainText {
  text-align: center;
  font-size: 56px;
  font-weight: 600;
  margin-top: 10%;
}

.describe {
  text-align: center;
  margin-top: 32px;
  font-size: 24px;
}

.infoCard {
  margin-top: 16px;
  width: 1000px;
  overflow: hidden;
  border: dashed 2px rgba(0, 0, 0, 0.1);
}

:deep(.el-input__wrapper) {
  box-shadow: unset;
  font-size: 16px;
}

.toZongjie {
  margin-top: 24px;
  width: 240px;
  height: 64px;
  font-size: 24px;
  background-color: #38BDF8;
}

:deep(.markdown) -body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

:deep(.markdown) {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
}

:deep(.markdown) h1,
:deep(.markdown) h2,
:deep(.markdown) h3,
:deep(.markdown) h4,
:deep(.markdown) h5,
:deep(.markdown) h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

:deep(.markdown) h1 {
  font-size: 32px;
}

:deep(.markdown) h2 {
  font-size: 24px;
}

:deep(.markdown) h3 {
  font-size: 20px;
}

:deep(.markdown) h4 {
  font-size: 16px;
}

:deep(.markdown) h5 {
  font-size: 14px;
}

:deep(.markdown) h6 {
  font-size: 12px;
}

:deep(.markdown) a {
  color: #0645ad;
  text-decoration: none;
}

:deep(.markdown) a:hover {
  text-decoration: underline;
}

:deep(.markdown) strong {
  font-weight: 600;
}

:deep(.markdown) img {
  max-width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
}

:deep(.markdown) pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
}

:deep(.markdown) code {
  background-color: #f6f8fa;
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
  margin-top: 8px;
  margin-bottom: 8px;
}

:deep(.markdown) pre > code {
  background-color: transparent;
  border: none;
  font-size: 100%;
  margin: 0;
  padding: 0;
}

:deep(.markdown) blockquote {
  color: #777;
  border-left: 4px solid #ddd;
  padding: 0 15px;
  margin: 0;
}

:deep(.markdown) blockquote > :first-child {
  margin-top: 0;
}

:deep(.markdown) blockquote > :last-child {
  margin-bottom: 0;
}

:deep(.markdown) table {
  display: block;
  width: 100%;
  overflow: auto;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
  font-size: 85%;
  line-height: 1.45;
}

:deep(.markdown) table th {
  font-weight: 600;
}

:deep(.markdown) table th,
:deep(.markdown) table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}


</style>