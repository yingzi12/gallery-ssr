<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import {tansParams} from "~/server/utils/urlUtils";

const userStore = useUserStore();
import {useRoute} from "vue-router";

// config.public
// 接收url里的参数
const route = useRoute();
const aid = ref(route.query.aid);

const url = ref('https://picsum.photos/500/300')
const updateUrl=ref("http://127.0.0.1:8098/admin/userImage/upload");

// const album=ref(null);
// async function getInfo() {
//   // 滚动到顶部
//   const {data} = await useFetch("/api/admin/userAlbum/info?id=" +aid.value )
//   if (data.value.code === 200) {
//     album.value = data.value.data;
//   }
// }
// getInfo();

const imageList = ref([]);
const total = ref(0);
const queryData = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title:'',
  },
  rules: {
  }
});
const { queryParams, form, rules } = toRefs(queryData);
async  function getList(page:number) {
  // 滚动到顶部
  // current.value=page
  // queryParams.value.title=title.value;
  queryParams.value.pageNum=page;
  // server/api/admin/userImage
  const { data } = await useFetch('/api/admin/userImage/list?'+tansParams(queryParams.value),{
    credentials: 'include', // 确保携带 cookie
  })
  total.value=data.value.total
  imageList.value=data.value.data
  if(total.value==0){
    total.value=imageList.value.length
  }
}
getList(1)
const token=ref("Bearer 1");
onMounted(() => {
  userStore.restoreUserFromCookie();
  token.value="Bearer "+userStore.token
});
</script>

<template>
  <q-breadcrumbs gutter="none">
    <q-breadcrumbs-el label="这是我的图集" />
    <q-breadcrumbs-el label="图片列表" />
  </q-breadcrumbs>
  <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
      <q-uploader
          :url="updateUrl"
          field-name="file"
          :headers="[{name: 'Authorization', value: `${token}`}]"
          :with-credentials="false"
          label="上传图集预览图片（预览图片都可观看）"
          multiple
          :form-fields="[{name: 'aid', value:  `${aid}`},{name: 'isFree', value:  `1`}]"
          @finish="getList(1)"
          style="max-width: 300px"
      />
    </div>
  </div>
  <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
      <q-uploader
          :url="updateUrl"
          field-name="file"
          :headers="[{name: 'Authorization', value: `${token}`}]"
          :with-credentials="false"
          label="上传图集正式图片"
          multiple
          :form-fields="[{name: 'aid', value:  `${aid}`},{name: 'isFree', value:  `2`}]"
          @finish="getList(1)"
          style="max-width: 300px"
      />
    </div>
  </div>
<q-th>图片列表（{{total}}）</q-th>
  <div class="q-pa-md">
    <div class="row justify-center q-gutter-sm">
      <q-intersection
          v-for="(image,index) in imageList"
          :key="index"
          transition="scale"
          class="example-item"
      >
        <q-card flat bordered class="q-ma-sm">
          <img :src="image.imgUrl">

          <q-card-section>
            <q-btn  v-if="image.isFree == 2" square color="primary" icon="visibility" >预览</q-btn>
            <q-btn v-if="image.isFree == 1" square color="primary" icon="sunny" >正式</q-btn>
            <q-btn square color="primary" icon="delete" >删除</q-btn>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
.example-item
  height: 290px
  width: 290px
</style>