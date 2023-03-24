<script setup lang="ts">
import type { UploadUserFile, UploadProps, UploadInstance, UploadRawFile } from 'element-plus'
import { genFileId, ElMessage } from 'element-plus'
import {Meeting} from '@/modules/service'
import { aaprogress } from "@/modules/service/services/meeting";

const upload = ref<UploadInstance>()

const uploadUrl = `${import.meta.env.VITE_APP_BASEURL}/upload`

interface finRes{
  errorRes:any
  finalRes:any
  allSpeak:any
}

const loading = ref(false)
//总结
const content = ref()

//原文
const allSpeak  =ref()

//错误信息
const errorRes = ref()

const fileList = ref<UploadUserFile[]>([])

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}


function submitUpload() {
  content.value = ''
  allSpeak.value =''
  errorRes.value = ''
  loading.value = true
  upload.value!.submit()
}

function onError(a: any) {
  loading.value = false
  console.log(a)
  content.value = ''
  allSpeak.value =''
  errorRes.value = a
}

// function onProgress(a:any,b:any){
//   console.log(a,b)
//   allSpeak.value = a
//   content.value = b
// }

function onSuccess(a: any) {
  loading.value = false
  content.value = a.finalRes.content
  allSpeak.value =a.allSpeak
  errorRes.value = ''
}

</script>

<template>
  <TheContainer>
    <div class="main">
      <div class="mainText">
        <div style="font-size: 72px">一键总结<span style="color: #f17eb8;">会议</span>音视频内容</div>
        <div>Powered by GPT-3.5 AI</div>
      </div>
      <div class="describe">点击👉
        <div style="display:inline-block;color: #38BDF8">
          <el-upload
            ref="upload"
            v-model:file-list="fileList"
            accept=".mp4,.mp3"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="onSuccess"
            :on-error="onError"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >选择文件
          </el-upload>
        </div>
        👈，选择音视频文件（目前只允许mp3或者mp4文件哦）
      </div>
      <div class="infoArea">
        <el-card v-if="fileList.length===1" class="infoCard">
          <!--          {{fileList[0]}}-->
          <div style="display: flex;justify-content: space-evenly">
            <span><span style="color: #4F5F6F;font-weight: 600">文件名：</span>{{ fileList[0].name }}</span>
            <span><span style="color: #4F5F6F;font-weight: 600">上传状态：</span>{{ fileList[0].status }}</span>
            <span><span
              style="color: #4F5F6F;font-weight: 600">文件大小：</span>{{
                (Number(fileList[0].size) / 1024).toFixed(0)
              }}kb</span>
            <span><span style="color: #4F5F6F;font-weight: 600">上传进度：</span>{{ fileList[0].percentage }}%</span>
          </div>
        </el-card>
      </div>
      <el-button @click="submitUpload" :disabled="fileList.length===0" :loading="loading" size="large" class="toZongjie"
                 type="primary">一键总结
      </el-button>
      <el-card shadow="never" class="infoCard" style="min-height: 180px;" v-if="errorRes || content">
        <div v-if="errorRes">
          <div style="font-size: 32px;font-weight: 600">错误：</div>
          {{errorRes}}
        </div>
        <div v-if="content">
          <div style="font-size: 32px;font-weight: 600">总结：</div>
          <div>{{ content }}</div>
        </div>
        <div v-if="allSpeak" style="margin-top: 16px">
          <div style="font-size: 32px;font-weight: 600">完整对话：</div>
          <div>{{ allSpeak }}</div>
        </div>
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