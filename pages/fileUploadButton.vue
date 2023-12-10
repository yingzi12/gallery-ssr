<template>
  <div>
    <input type="file" @change="handleVideoFileChange" />
    <button @click="uploadVideoFile">Upload</button>
    <div v-if="uploadVideoProgress">
      <p>Uploading: {{ uploadVideoProgress }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FileUploader from "~/utils/FileUploader";

const selectedFile = ref<File | null>(null);
const uploadVideoProgress = ref<number | null>(null);
const uploaderVideo = new FileUploader('http://localhost:8098', updateVideoProgress);

function handleVideoFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFile.value = target.files[0];
  }
}

function updateVideoProgress(chunkNumber: number, totalChunks: number) {
  uploadVideoProgress.value = Math.round((chunkNumber / totalChunks) * 100);
}

async function uploadVideoFile() {
  if (selectedFile.value) {
    try {
      // 生成唯一标识符：文件名-时间戳
      const timestamp = Date.now();
      const identifier = `${selectedFile.value.name}`;
      // const identifier = 'unique-file-id'; // 根据需要生成或获取唯一标识符
      await uploaderVideo.uploadFile(selectedFile.value, identifier);
      console.log('Upload complete');
    } catch (error) {
      console.error('Upload failed', error);
    }
  }
}
</script>
