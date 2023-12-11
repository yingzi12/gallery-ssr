<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useUserStore } from "~/stores/useUserStore";

const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const userStore = useUserStore();
const config = useRuntimeConfig();
const $q = useQuasar();
const route = useRoute();
const aid = ref(route.query.id);
const title = ref(null);
const gril = ref(null);
const intro = ref(null);
const tags = ref(null);
const imgUrl = ref("");
const vipPrice = ref(0.0);
const price = ref(0.0);
const accept = ref(false);
const charge=ref(1);
const previewImage = ref("/favicon.png");
const selectedImage = ref<File | null>(null);

function notify(message: string, color: string) {
  $q.notify({
    color: color,
    textColor: 'white',
    icon: color === 'red-5' ? 'warning' : 'cloud_done',
    message: message
  });
}

function onReset() {
  title.value = null;
  gril.value = null;
  intro.value = null;
  tags.value = null;
  imgUrl.value = "";
  charge.value=1;
  accept.value = false;
}

async function onSubmit() {
  // if (!accept.value) {
  //   notify('You need to accept the license and terms first', 'red-5');
  // } else {server≈.get.ts
  const response = await axios.post("/api/admin/userAlbum/edit", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userStore.token}`
    },
    credentials: 'include', // 确保携带 cookie
    body: JSON.stringify({
      id: aid.value,
      title: title.value,
      intro: intro.value,
      gril: gril.value,
      imgUrl: imgUrl.value,
      tags: tags.value,
      charge:charge.value,
      price: price.value,
      vipPrice: vipPrice.value,
    }),
  });
  const data = await response.data;
  if(data.code==200){
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Create Success'
    });
    router.push('/users/album'); // Redirect to login page

  }else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Update Error'
    });
  }
  // 这里添加您的提交逻辑
  // }
}

async function getDetail(){
  const response = await axios.get('/api/admin/userAlbum/info?id='+aid.value, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.data;
  console.log(data.code)
  if(data.code==200){
    title.value= data.title;
    intro.value= data.intro;
    gril.value= data.gril;
    imgUrl.value= data.imgUrl;
    tags.value= data.tags;
    charge.value=data.charge;
    price.value= data.price;
    vipPrice.value= data.vipPrice;
    userStore.setUser(userStore.user,userStore.token);
  }

}
getDetail()
async function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file && file.size <= 2 * 1024 * 1024) { // 2MB限制
    selectedImage.value = file;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(config.public.baseUrl + '/admin/userAlbum/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // 确保携带 cookie
        headers: new Headers({
          'Authorization': `Bearer ${userStore.token}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.data)
        previewImage.value = "https://image.51x.uk"+data.data;
        imgUrl.value = "https://image.51x.uk"+data.data;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      notify('Error uploading image', 'red-5');
    }
  } else {
    alert('图片大小不能超过2MB');
  }
}

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
          v-model="title"
          label="图集名称 *"
          hint="输入图集名称"
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
      <q-input
          v-model="intro"
          label="简介 *"
          filled
          type="textarea"
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
        <q-input v-if="charge =='2' || charge =='3' || charge=='5'"
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