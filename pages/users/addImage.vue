<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { tansParams } from "~/server/utils/urlUtils";
import { useRoute } from "vue-router";
import {useQuasar} from "quasar";
const $q = useQuasar();

const userStore = useUserStore();
const route = useRoute();
const aid = ref(route.query.aid);
const updateUrl = ref("http://127.0.0.1:8098/admin/userImage/upload");
const imageList = ref([]);
const total = ref(0);
const token = ref("Bearer 1");

const queryData = reactive({
  queryParams: {
    pageNum: 1,
    title: '',
  }
});
const { queryParams } = toRefs(queryData);

async function getList(page: number) {
  queryParams.value.pageNum = page;
  const { data } = await useFetch('/api/admin/userImage/list?' + tansParams(queryParams.value), {
    credentials: 'include',
  });
  if (data.value) {
    total.value = data.value.total || imageList.value.length;
    imageList.value = data.value.data;
  }
}

async function deleteImage(id: number) {
  $q.dialog({
    title: '通知',
    message: '是否确认删除.',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
  }).onOk(async () => {
    const { data } = await useFetch('/api/admin/userImage/remove?id=' + id.toString(), {
      method: 'get',
      credentials: 'include',
    });
    if (data.value && data.value.code === 200) {
      await getList(1);
    }
  }).onCancel(() => {
    // console.log('Cancel')
  });
}

async function updateIsFree(id: number, isFree: number) {
  $q.dialog({
    title: '通知',
    message: '是否确认修改.',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
  }).onOk(async () => {
    const { data } = await useFetch('/api/admin/userImage/updateIsFree?id=' + id.toString() + "&isFree=" + isFree.toString(), {
      credentials: 'include',
    });
    if (data.value && data.value.code === 200) {
      await getList(1);
    }
  }).onCancel(() => {
    // console.log('Cancel')
  })
  ;
}
onMounted(() => {
  userStore.restoreUserFromCookie();
  token.value = "Bearer " + userStore.token;
  getList(1);
});
getList(1);

watch(() => route.query.aid, (newAid) => {
  aid.value = newAid;
  getList(1);
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
          label="上传图集预览图片（预览图片公开观看）"
          multiple
          accept=".jpg, image/*"
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
          accept=".jpg, image/*"
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
            <q-btn  v-if="image.isFree == 2" square color="primary" icon="visibility"  @click="updateIsFree(image.id,1)">预览</q-btn>
            <q-btn v-if="image.isFree == 1" square color="primary" icon="sunny" @click="updateIsFree(image.id,2)" >正式</q-btn>
            <q-btn square color="primary" icon="delete"  @click="deleteImage(image.id)" >删除</q-btn>
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