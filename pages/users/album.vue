<script  setup lang="ts">
import {tansParams} from "~/server/utils/urlUtils";
import {useUserStore} from "~/stores/useUserStore";
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const userStore = useUserStore();
definePageMeta({
  key: route => route.fullPath
})
const albumList = ref([]);
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
  const { data } = await useFetch('/api/admin/userAlbum/list?'+tansParams(queryParams.value),{
    credentials: 'include', // 确保携带 cookie
  })
  console.log(data.value.code)
  if(data.value.code ==401){
     await userStore.logout();
     router.push('/login'); // 注销后重定向到登录页面
  }
  total.value=data.value.total
  albumList.value=data.value.data
  if(total.value==0){
    total.value=albumList.value.length
  }
}
function editAlbum(id:number){
  router.push("/users/editAlbum?id="+id.toString());
}
getList(1)
</script>

<template>
  <div class="q-pa-md q-gutter-md">
    <router-link to="/users/addAlbum">
      <q-btn color="primary" label="添加" />
    </router-link>
    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>我创建的图集（{{total}}）</q-item-label>
      <div  v-for="(album ,index) in albumList"
            :key="index">
      <q-item >
        <q-item-section  >
          <q-img
              :src="album.imgUrl"
              spinner-color="white"
              style="height: 140px; max-width: 150px"
          />
        </q-item-section>
        <q-item-section >
          <q-item-label lines="1">
            <span class="text-weight-medium">{{ album.title }}</span>
          </q-item-label>
          <q-item-label caption>
            {{ album.intro }}
          </q-item-label>
<!--          <q-item-label caption>-->
<!--            标签。标签标签标签标签标签标签标签标签标签标签标签标签-->
<!--          </q-item-label>-->
          <q-item-label class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer"><a :href="'/users/addVideo?aid='+album.id+'&title='+album.title">视频： {{ album.numberVideo }}</a></span>
          </q-item-label>
          <q-item-label class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer"><a :href="'/users/addImage?aid='+album.id+'&title='+album.title">照片： {{ album.numberPhotos }}</a></span>
          </q-item-label>
        </q-item-section>
        <q-item-section  side>
          <span>免费</span>
<!--            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >vip</q-btn>-->
<!--            <q-btn class="gt-xs" size="12px" flat dense round icon="done"> 20 </q-btn>-->
        </q-item-section>

        <q-item-section  side>
          <q-btn class="gt-xs" size="12px" flat dense round icon="edit" @click="editAlbum(album.id)" >修改</q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done" >发布</q-btn>
        </q-item-section>
        <q-item-section side >
          <q-item-label caption>收藏： {{ album.countCollection }}</q-item-label>
          <q-item-label caption>购买： {{ album.countBuy }}</q-item-label>
          <q-item-label caption>查看： {{ album.countSee }}</q-item-label>
          <q-item-label caption>模特： {{ album.gril }}</q-item-label>
          <q-item-label caption>2023-11-11</q-item-label>
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      </div>
    </q-list>
  </div>
</template>

<style scoped>

</style>