<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadFile">Upload</button>
    <div v-if="uploadProgress">
      <p>Uploading: {{ uploadProgress }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FileUploader from "~/utils/FileUploader";

const selectedFile = ref<File | null>(null);
const uploadProgress = ref<number | null>(null);
const uploader = new FileUploader('http://localhost:8098', updateProgress);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFile.value = target.files[0];
  }
}

function updateProgress(chunkNumber: number, totalChunks: number) {
  uploadProgress.value = Math.round((chunkNumber / totalChunks) * 100);
}

async function uploadFile() {
  if (selectedFile.value) {
    try {
      // 生成唯一标识符：文件名-时间戳
      const timestamp = Date.now();
      const identifier = `${selectedFile.value.name}`;
      // const identifier = 'unique-file-id'; // 根据需要生成或获取唯一标识符
      await uploader.uploadFile(selectedFile.value, identifier);
      console.log('Upload complete');
    } catch (error) {
      console.error('Upload failed', error);
    }
  }
}
</script>
