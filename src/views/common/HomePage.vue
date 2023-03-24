<script setup lang="ts">
import {Fast} from '@/modules/service'
import {useRoute,useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const question = ref(route.query.q)

const answer = ref('')

async function search() {
  loading.value = true
  const res:any = await Fast.chat({question:question.value})
  answer.value=res.answer.response_format.content
  loading.value = false
}

if(question.value!== undefined){
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
      <el-card shadow="never" class="infoCard" style="min-height: 60px;" v-if="question">
        {{question}}
      </el-card>
      <el-card shadow="never" class="infoCard" style="min-height: 180px;" v-loading="loading">
        {{answer}}
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
  margin-top: 80px;
}

.describe {
  text-align: center;
  margin-top: 32px;
  font-size: 24px;
}

.infoCard {
  margin-top: 16px;
  min-width: 1000px;
  max-width: 1100px;
  border: dashed 2px rgba(0,0,0,0.1);
}

.toZongjie {
  margin-top: 24px;
  width: 240px;
  height: 64px;
  font-size: 24px;
  background-color: #38BDF8;
}


</style>