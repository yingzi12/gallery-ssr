<script setup lang="ts">
import {useQuasar} from "quasar";
import { useUserStore } from '@/stores/useUserStore';

const config = useRuntimeConfig();

const $q = useQuasar()

const name = ref(null)
const gril = ref(null)
const intro = ref(null)
const tags = ref(null)
const vipPrice = ref(0.0)
const price =ref(0.0);
const accept = ref(false)
const userStore = useUserStore();

if (accept.value !== true) {
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: 'You need to accept the license and terms first'
  })
}
else {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}
function  onReset () {
  name.value = null
  gril.value = null
  intro.value = null
  tags.value = null
  accept.value = false
}
function onSubmit () {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  }
}
const url = ref('https://picsum.photos/500/300')
const filePath = ref("");
const previewImage = ref("/favicon.png");
const selectedImage = ref<File | null>(null);
// const handleImageUpload = (event: Event) => {
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (file) {
//     if (file.size <= 2 * 1024 * 1024) { // 2MB限制
//       selectedImage.value = file;
//
//       // 预览图片
//       const reader = new FileReader();
//
//       reader.onload = () => {
//         previewImage.value = reader.result as string;
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert('图片大小不能超过2MB');
//     }
//   }
// };
const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size <= 2 * 1024 * 1024) { // 2MB限制
      selectedImage.value = file;

      // 创建 FormData 对象来发送文件
      const formData = new FormData();
      formData.append('image', file);

      try {
        // 发送请求到后台接口（请替换为您的后台接口地址）
        // const response = await fetch('your-backend-api-url', {
        //   method: 'POST',
        //   body: formData,
        // });
        const response = await fetch(config.public.baseUrl + '/admin/userAlbum/upload', {
          method: 'POST',
          body: formData,
          headers: new Headers({
            'Authorization': `Bearer ${userStore.token}`
          })
        });

        if (response.ok) {
          const data = await response.json();
          // 假设后台返回的新图片地址在 data.newImageUrl 中
          previewImage.value = data.newImageUrl;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      alert('图片大小不能超过2MB');
    }
  }
};

watch(filePath, (newValue) => {
  if (newValue && newValue[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(newValue[0]);
  } else {
    previewImage.value = ''; // 清除预览图片
  }
});
const charge=ref("");
const chargeList=[
  {
    label: '免费',
    value: 1
  },
  {
    label: 'VIP免费',
    value: 2
  },

  {
    label: 'VIP折扣',
    value: 3
  },
  {
    label: 'VIP独享',
    value: 4
  },
  {
    label: '统一价格',
    value: 5
  }
]
function updateCharge(charge:number){
  price.value=0.5;
  vipPrice.value=0.5;
}
</script>

<template>

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <div class="q-pa-md q-gutter-sm">
        <div>
          <q-img
              :src="previewImage"
              spinner-color="white"
              style="height: 140px; max-width: 150px"
          />
        </div>
        <input type="file" @change="handleImageUpload" accept="image/*" />
      </div>
      <q-input
          filled
          v-model="name"
          label="图集名称 *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="gril"
          label="模特 *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
<!--      <div class="q-pa-md" style="max-width: 150px">-->
        <q-input
            v-model="intro"
            label="简介 *"
            filled
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
<!--      </div>-->
      <q-input
          filled
          type="text"
          v-model="tags"
          label="标签 *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-select outlined hint="收费方式" v-model="charge" :options="chargeList" label="收费方式"
                  @update:modelValue="updateCharge"
                  emit-value
                  map-options />
      <q-input v-if="charge =='3' || charge=='5'"
          filled
          v-model="price"
          label="价格"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          hint="Mask: #.##"
          input-class="text-right"
          :rules="[
          val => (val !== null && val !== '') || '请输入金额',
        val => (val > 0.5 && val < 10000) || '金额不能小与0.5大于1000'
                  ]"
      />
        <q-input v-if="charge =='3' || charge=='4'"
                 filled
                 v-model="vipPrice"
                 label="VIP价格"
                 mask="#.##"
                 fill-mask="0"
                 reverse-fill-mask
                 hint="Mask: #.##"
                 input-class="text-right"
                 :rules="[
          val => (val !== null && val !== '') || '请输入金额',
        val => (val > 0.5 && val < 10000) || '金额不能小与0.5不能大于1000'
                  ]"
        />
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<style scoped>

</style>