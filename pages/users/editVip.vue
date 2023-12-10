<script setup lang="ts">
import {useUserStore} from "~/stores/useUserStore";
import {ref} from "vue";
import {useRoute} from "vue-router";

const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const userStore = useUserStore();
const $q = useQuasar()
const route = useRoute();

const vid = ref(route.query.id);
const title = ref(null)
const desc = ref(null)
const intro = ref(null)
const tags = ref(null)
const price =ref(0);
const accept = ref(false)
const introduce=ref(null)
const timeType=ref(1)
const timeLong=ref(1);
// const timeTypeList=[
//   '天', '周', '月', '年', '永久'
// ]
const timeTypeList=[
  {
    label: '天',
    value: 1
  },
  {
    label: '周',
    value: 2
  },

  {
    label: '月',
    value: 3
  },
  {
    label: '年',
    value: 4
  },
  {
    label: '永久',
    value: 5
  }
]
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
  title.value = null
  desc.value = null
  intro.value = null
  tags.value = null
  accept.value = false
  introduce.value=null
}

async function onSubmit() {
  // if (!accept.value) {
  //   notify('You need to accept the license and terms first', 'red-5');
  // } else {server≈.get.ts
  const response = await fetch("/api/admin/userSettingVip/edit", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userStore.token}`
    },
    credentials: 'include', // 确保携带 cookie
    body: JSON.stringify({
      id: vid.value,
      title: title.value,
      intro: intro.value,
      tags: tags.value,
      price: price.value,
      timeType:timeType.value,
      timeLong:timeLong.value,
      introduce:introduce.value
    }),
  });
  const data = await response.json();
  if(data.code==200){
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Create Success'
    });
    router.push('/users/album'); // Redirect to login page

  }else {
    if(data.code==401){
      router.push('/login'); // Redirect to login page
    }
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
  const response = await fetch('/api/admin/userSettingVip/info?id='+vid.value, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data.code)
  if(data.code ==401){
    await userStore.logout();
    router.push('/login'); // 注销后重定向到登录页面
  }
  if(data.code==200){
    title.value= data.data.title;
    intro.value= data.data. intro;
    tags.value= data.data. tags;
    price.value= data.data. price;
    timeType.value= data.data.timeType;
    timeLong.value= data.data.timeLong;
    introduce.value= data.data.introduce;
    userStore.setUser(userStore.user,userStore.token);
  }
  if(data.code==401){
    router.push('/login'); // Redirect to login page
  }
}
getDetail()
</script>

<template>

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <q-input
          filled
          v-model="title"
          label="会员名称 *"
          hint="会员名称"
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
      <q-input
          v-model="introduce"
          label="说明 *"
          filled
          type="textarea"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-input v-if="timeType != 5 "
                 filled
                 type="number"
                 v-model="timeLong"
                 label="会员时长 *"
                 lazy-rules
                 :rules="[
          val => (val !== null && val !== '') || '请输入时长',
        val => (val > 0 && val < 1000) || '不能小与0，大于1000'
                  ]"
        />
        <q-select outlined
                  v-model="timeType"
                  :options="timeTypeList"
                  label="单位"
                  emit-value
                  map-options
        />
      </div>

      <q-input
          filled
          v-model="price"
          label="Price with 2 decimals"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          hint="美元: #.##"
          input-class="text-right"
          :rules="[
          val => (val !== null && val !== '') || '请输入金额',
        val => (val > 0 && val < 10000) || '金额不能大于1000'
                  ]"

      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<style scoped>

</style>