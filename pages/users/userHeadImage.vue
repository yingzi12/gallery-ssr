<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
const userStore = useUserStore();
const selectedImage = ref<File | null>(null);
const previewImage = ref((userStore.user == null || userStore.user.imgUrl==null) ?"/favicon.png": userStore.user.imgUrl);

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size <= 2 * 1024 * 1024) { // 2MB限制
      selectedImage.value = file;

      // 预览图片
      const reader = new FileReader();
      reader.onload = () => {
        previewImage.value = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      alert('图片大小不能超过2MB');
    }
  }
};

const uploadImage = () => {
  if (selectedImage.value) {
    // 创建一个FormData对象用于上传
    const formData = new FormData();
    formData.append('image', selectedImage.value);

    // 使用fetch或axios等方式将formData上传到后端
    // 例如：fetch('/upload', { method: 'POST', body: formData })
    // 在这里处理后端上传逻辑
    // 注意：这里只是示例，实际情况可能会根据您的后端和网络请求库而有所不同
  } else {
    alert('请选择一张图片');
  }
};
</script>

<template>
  <div>
    <input type="file" @change="handleImageUpload" accept="image/*" />
  </div>
<div>
  <q-avatar v-if="previewImage"  size="100px" font-size="52px">
      <img :src="previewImage">
    </q-avatar>
</div>
  <button @click="uploadImage">提交</button>

</template>


<style scoped>
/* 添加您的样式 */
</style>
