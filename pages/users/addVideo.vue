<script setup lang="ts">
import SparkMD5 from 'spark-md5';
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import FileUploader from "~/utils/FileUploader";
import { tansParams } from "~/server/utils/urlUtils";
import { useRoute } from "vue-router";
import {useQuasar} from "quasar";
const $q = useQuasar();
const config = useRuntimeConfig();

const userStore = useUserStore();
console.log("addVideo token:"+userStore.token)
const route = useRoute();
const aid = ref(route.query.aid);
const updateUrl = ref(config.public.baseUrl+"/admin/userVideo/upload");
console.log("updateUrl:"+updateUrl.value)
const videoList = ref([]);
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
  const { data } = await useFetch('/api/admin/userVideo/list?' + tansParams(queryParams.value), {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${userStore.token}`
    },
  });
  if (data.value) {
    total.value = data.value.total || videoList.value.length;
    videoList.value = data.value.data;
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
    const { data } = await useFetch('/api/admin/userVideo/remove?id=' + id.toString(), {
      method: 'get',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      },
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
    const { data } = await useFetch('/api/admin/userVideo/updateIsFree?id=' + id.toString() + "&isFree=" + isFree.toString(), {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      },
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
// const url = ref('https://picsum.photos/500/300')

//视频分段上传
const selectedFile = ref<File | null>(null);
const uploadVideoProgress = ref<number | null>(null);
const uploaderVideo = new FileUploader(config.public.baseUrl, updateVideoProgress);
const selectedPreviewFile = ref<File | null>(null);
const uploadPreviewProgress = ref<number | null>(null);
const uploaderVideoPreview = new FileUploader(config.public.baseUrl, updateVideoPreviewProgress);

const day=getCurrentDateFormatted();

function handleVideoFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    // 检查文件类型是否为视频
    // if (!file.type.startsWith('video/')) {
    //   alert('Please select a video file.');
    //   return;
    // }
    // 检查文件 MIME 类型是否为 MP4 视频
    if (file.type !== 'video/mp4') {
      alert('Please select an MP4 video file.');
      return;
    }
    // 检查文件大小是否超过1GB
    const maxSize = 1024 * 1024 * 1024; // 1GB in bytes
    if (file.size > maxSize) {
      alert('File size should not exceed 1GB.');
      return;
    }

    selectedFile.value = file;

  }
}
function handlePreviewVideoFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    if (file.type !== 'video/mp4') {
      alert('Please select an MP4 video file.');
      return;
    }
    const maxSize = 100 * 1024 * 1024; // 400MB in bytes
    if (file.size > maxSize) {
      alert('File size should not exceed 100MB.');
      return;
    }
    selectedPreviewFile.value = file;
  }
}
function updateVideoProgress(chunkNumber: number, totalChunks: number) {
  uploadVideoProgress.value = Math.round((chunkNumber / totalChunks) * 100);
}

async function uploadVideoFile() {
  if (selectedFile.value) {
    try {
      const md5 = await calculateMd5(selectedFile.value);
      const data= checkFileExistence(md5, selectedFile.value);
      const isFree=2;
      if(data != null){
         await addVideoRecord(md5,data.url,isFree);
        console.log('Upload update complete');
      }else {
        // 生成唯一标识符：文件名-时间戳
        const identifier = `${selectedFile.value.name}`;
        // const identifier = 'unique-file-id'; // 根据需要生成或获取唯一标识符
        await uploaderVideo.uploadFile(selectedFile.value, identifier,userStore.token,day,aid.value,isFree,md5);
        console.log('Upload complete');
      }
      uploadVideoProgress.value = 100; // 更新进度条到100
      selectedFile.value=null;
    } catch (error) {
      console.error('Upload failed', error);
      uploadVideoProgress.value = 0; // 更新进度条到100%
    }
  }
}
function updateVideoPreviewProgress(chunkNumber: number, totalChunks: number) {
  uploadPreviewProgress.value = Math.round((chunkNumber / totalChunks) * 100);
}
//计算md5
function calculateMd5(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const md5 = SparkMD5.ArrayBuffer.hash(data);
      resolve(md5);
    };
    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsArrayBuffer(file);
  });
}
//检查文件是否已经上传
async function checkFileExistence(md5: string, file: File) {
  try {
    const response = await fetch('/api/admin/userVideo/checkAllMd5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({ md5: md5 })
    });
    const data = await response.json();
    if (data.code === 200) {
      return data.date;
      // 文件已存在
      // addVideoRecord(md5);
    } else {
      return null;
      // // 文件不存在，继续上传
      // uploadVideoFile(file, md5);
    }
  } catch (error) {
    console.error('Error checking file existence', error);
  }
}
//文件已经存在
async function addVideoRecord(md5: string,url:string,isFree:number) {
  try {
    const response = await fetch('/api/userVedio/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({ aid: aid.value, md5: md5, url: url, isFree: isFree })
    });
    const data = await response.json();
    if (data.code === 200) {
      $q.notify({
        type: 'positive',
        message: '视频已成功添加'
      });
      getList(1);
    } else {
      $q.notify({
        type: 'negative',
        message: '添加视频记录失败'
      });
    }
  } catch (error) {
    console.error('Error adding video record', error);
  }
}
async function uploadPreviewVideoFile() {
  if (selectedPreviewFile.value) {
    try {
      const md5 = await calculateMd5(selectedFile.value);
      const data= checkFileExistence(md5, selectedFile.value);
      const isFree=1;
      if(data != null){
        await addVideoRecord(md5,data.url,isFree);
        console.log('Upload update complete');
      }else {
        const identifier = `${selectedPreviewFile.value.name}`;
        await uploaderVideoPreview.uploadFile(selectedPreviewFile.value, identifier, userStore.token, day, aid.value, isFree);
      }
      uploadPreviewProgress.value = 100;
      selectedPreviewFile.value = null;

      $q.dialog({
        title: '上传成功',
        message: '预览视频上传成功。',
        ok: true,
      }).onOk(() => {
        getList(1);
      });

    } catch (error) {
      console.error('Upload failed', error);
      uploadPreviewProgress.value = 0;
      $q.notify({
        type: 'negative',
        message: '上传失败'
      });
    }
  }
}

const file = ref(null);
function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以加1，并确保两位数
  const day = now.getDate().toString().padStart(2, '0'); // 确保天数是两位数

  return `${year}-${month}-${day}`;
}
</script>

<template>
  <q-breadcrumbs gutter="none">
    <q-breadcrumbs-el label="这是我的图集" />
    <q-breadcrumbs-el label="视频列表" />
  </q-breadcrumbs>
  <div class="q-pa-md">
    <div>
      <p class="text-body2">预览视频最大100M,最多3个文件</p>
      <p class="text-body2">正式视频最大1024M,最多10个文件</p>
      <p class="text-body2">视频文件只支持.mp4</p>
      <p class="text-body2">推荐电脑端免费转码工具:<a  href="http://www.pcfreetime.com/formatfactory/cn/index.html">格式工厂</a></p>

    </div>
  </div>
  <div>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-subtitle1">上传预览视频（公开可看）</div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn flat> <input type="file" @change="handlePreviewVideoFileChange" accept=".mp4" /></q-btn>
        <q-btn flat><button @click="uploadPreviewVideoFile">Upload Preview</button></q-btn>
      </q-card-actions>
      <q-separator />
      <q-card-actions vertical>
        <div v-if="uploadPreviewProgress">
          <p>Uploading Preview: {{ uploadPreviewProgress }}%</p>
        </div>
      </q-card-actions>

      <q-card-section>
        <div class="text-subtitle1">上传正式视频</div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn flat> <input type="file" @change="handleVideoFileChange" accept=".mp4"  /></q-btn>
        <q-btn flat><button @click="uploadVideoFile">Upload</button></q-btn>
      </q-card-actions>
      <q-separator />
      <q-card-actions vertical>
        <div v-if="uploadVideoProgress">
          <p>Uploading: {{ uploadVideoProgress }}%</p>
        </div>
      </q-card-actions>
    </q-card>
  </div>
<!--  <q-th>视频列表（{{total}}）</q-th>-->
  <q-list bordered class="rounded-borders" style="max-width: 400px">
    <q-item-label header>视频列表（{{total}}）</q-item-label>
    <div  v-for="(video,index) in videoList"
          :key="index"
    >
    <q-item>
      <q-item-section >
        <q-img
            :src="video.url"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
        />
      </q-item-section>

      <q-item-section side >
        <q-item-label v-if="video.isFree == 1" caption>预览视频</q-item-label>
        <q-item-label v-if="video.isFree == 2" caption>正式视频</q-item-label>
        <q-item-label v-if="video.status == 1"  caption>等待转码</q-item-label>
        <q-item-label v-if="video.status == 2"  caption>转码中</q-item-label>
        <q-item-label v-if="video.status == 3"  caption>可以播放</q-item-label>

        <q-item-label caption>{{ video.createTime }}</q-item-label>
      </q-item-section>
      <q-item-section  side>
        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
      </q-item-section>
    </q-item>

    <q-separator spaced />
</div>
  </q-list>

</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
.example-item
  height: 290px
  width: 290px
</style>