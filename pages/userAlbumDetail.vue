<script setup lang="ts">
import {useRoute} from "vue-router";
import PayPalButton from './payPalButton.vue';
import {useUserStore} from "~/stores/useUserStore";
const userStore = useUserStore();

// 接收url里的参数
const route = useRoute();
const aid = ref(route.query.aid);

const imgTotal=ref(0);
const videoTotal=ref(0);
const isSee=ref(false);
const imageCount=ref(0);
const videoCount=ref(0);

const imageList= ref([]);
const videoList= ref([]);

const imageLockList= ref([]);
const videoLockList= ref([]);

const disableInfiniteScroll = ref(false);
const isRefreshing = ref(false);
const onLoad = async (index: number, done: () => void) => {
  // 如果isSee为false，立即结束加载过程
  if (!isSee.value) {
    done();
    return;
  }
  if (isSee.value) {
    console.log("-----------onLoad--------------"+index.toString())
    imageLockList.value=[]
    try {
      isRefreshing.value = true
      const response = await axios.get(`/api/userImage/list?aid=${aid.value}&isFree=2&pageNum=`+(index+1), {
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })
      console.log("-----------userImage--------------")
      const data = response.data;
      if (data && data.code === 200) {
        const imgList = data.data;
        imgTotal.value = data.total
        if (imgList.length == 0) {
          disableInfiniteScroll.value = true
        }
        console.log("-----------userImage--------------")
        imageList.value.push(...imgList);
        isRefreshing.value = false;
      }else{
        disableInfiniteScroll.value = true
        isRefreshing.value = false;
      }
      done();
    } catch (error) {
      disableInfiniteScroll.value = true;
      console.error(error);
      done();
    } finally {
      isRefreshing.value = false;
    }
  }
}

// onLoad(0, () => {});
const album = ref({});
const  title=ref("图集网")

const description = ref('图集网 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com.')
const  ortTile=ref("图集网")
const  orgDec=ref("图集网")
const  orgImgae=ref("图集网")

useHead({
  title:title,
  meta: [
    { name: 'description', content: description },
    { name: 'title', content: title },
    { name: 'og:title', content:  ortTile},
    { name: 'og:description', content:  orgDec},
    { name: 'og:image', content:  orgImgae}
  ],
})

async function getInfo() {
  // 滚动到顶部
  const response = await axios.get("/api/userAlbum/info?id=" +aid.value ,{
    headers: {
      'Authorization': `Bearer ${userStore.token}`
    }
  })
  const data = response.data;
  console.log(data)
  if (data.code === 200) {
    imageList.value.push(...data.data.imageList);
    videoList.value.push(...data.data.videoList);
    isSee.value=data.data.isSee;
    if(!isSee.value) {
      imageCount.value = data.data.imageCount;
      for (let i = 0; i < imageCount.value; i++) {
        imageLockList.value.push({'imgUrl': '/lock_image.png'})
      }
      videoCount.value = data.data.videoCount;
      for (let i = 0; i < videoCount.value; i++) {
        videoLockList.value.push({'imgUrl': '/lock_video.png'})
      }
    }
    album.value = data.data;
    title.value="图集网-"+album.value.title
    ortTile.value=album.value.title
    orgDec.value=album.value.description
    orgImgae.value=album.value.sourceWeb+album.value.imgUrl
  }
}
async function getVideoList() {
  if (isSee.value) {
    videoLockList.value=[]
  // 滚动到顶部
  const response = await axios.get(`/api/userVideo/list?aid=${aid.value}&isFree=2`, {
    headers: {
      'Authorization': `Bearer ${userStore.token}`
    }
  })
  const data = response.data;
  if (data.code === 200) {
    videoList.value.push(...data.data);
  }
}
}
async function handleImageError(){
  const response = await axios.get("/api/userAlbum/error?id=" +aid.value ,{
    headers: {
      'Authorization': `Bearer ${userStore.token}`
    }
  })
  alert("提交成功,等待管理员处理中.")
}
const randomList = ref([]);

async  function getRandom() {
  const response = await axios.get('/api/userAlbum/random',{
    headers: {
      'Authorization': `Bearer ${userStore.token}`
    }
  })
  const data = response.data;
  if (data.code === 200) {
    randomList.value = data.data
  }
}
getRandom();
getInfo();
// onLoad(1);
function imageUrlDetail(image) {
  return `https://image.51x.uk/xinshijie${image.sourceUrl}`;
}
function imageUrl(album) {
  if (album.sourceUrl!=null &&  album.sourceUrl.startsWith('/image')) {
    return `https://image.51x.uk/xinshijie${album.sourceUrl}`;
  }
  return album.sourceWeb + album.imgUrl;
}
const paypalDialog = ref(false);

const openPayPalDialog = (album) => {
  paypalDialog.value = true;
};
console.log(userStore.token)
// 监听isSee的值
watch(isSee, (newValue, oldValue) => {
  if (newValue === true) {
    onLoad(0, () => {});
    getVideoList();
  }
}, { immediate: true }); // immediate: true 确保在挂载时立即触发一次

</script>
<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div ><q-img class="head-iamge"
                     :src="imageUrl(album)"
        /></div>
        <div style="padding-left: 10px;width: 70%">
          <div class="text-h5 q-mt-sm q-mb-xs"><h5>{{album.title}}</h5></div>
          <div style="word-wrap: break-word; white-space: pre-line;">
            <p>{{album.intro}}</p>
          </div>
          <div>模特:{{album.gril}}</div>
          <div>照片:{{album.photoNumber}}</div>
          <div>浏览次数:{{album.countSee}}</div>
          <div>类型: {{album.tags}}</div>
          <div>创建时间：{{album.createTime}}</div>
          <div><q-btn v-if="album.charge != 1" @click="openPayPalDialog(album)">购买</q-btn>
            <q-btn>收藏</q-btn></div>
        </div>
        <div style="width: 10%">
          <button  class="text-h6" @click="handleImageError()"> 报告异常</button>
        </div>
      </div>
      <div>

        <div>
          <q-th>视频列表（{{videoTotal}}）</q-th>
          <div class="q-pa-md">
            <div class="row justify-center q-gutter-sm">
              <q-intersection
                  v-for="(video,index) in videoList"
                  :key="index"
                  transition="scale"
                  class="example-item"
              >
                <q-card flat bordered class="q-ma-sm">
                  <img :src="video.imgUrl">

                  <q-card-section>
                    <q-btn  v-if="video.isFree == 2" square color="primary" icon="visibility" >预览</q-btn>
                    <q-btn v-if="video.isFree == 1" square color="primary" icon="sunny" >正式</q-btn>
                  </q-card-section>
                </q-card>
              </q-intersection>
              <q-intersection
                  v-for="(videoLock,index) in videoLockList"
                  :key="index"
                  transition="scale"
                  class="example-item"
              >
                <q-card flat bordered class="q-ma-sm">
                  <img :src="videoLock.imgUrl">
                </q-card>
              </q-intersection>
            </div>
          </div>
        </div>
        <div>
          <q-th>图片列表（{{imgTotal}}）</q-th>

          <!--    内容页-->
          <q-infinite-scroll @load="onLoad" :disable="disableInfiniteScroll"  :offset="250">
            <div v-for="(image, index) in imageList" :key="index" class="caption">
              <img :src="imageUrlDetail(image)" class="responsive-image"/>
            </div>

            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
          <q-pull-to-refresh >
            <div v-for="(imageLock, index) in imageLockList" :key="index" class="caption">
              <img :src="imageLock.imgUrl" class="responsive-image"/>
            </div>
          </q-pull-to-refresh>

        </div>
        <div style=" text-align: center;font-size: large">
          <a style="margin: 20px;font-size: large" v-if="album.pre != null " :href='"/userAlbumDetail?aid="+album.pre.id'>{{album.pre.title}}</a>
          <a style="margin: 20px;font-size: large"   v-if="album.next != null " :href='"/userAlbumDetail?aid="+album.next.id'>{{album.next.title}}</a>
        </div>
        <div>
          <!-- 在这里放置您希望在新列中显示的内容 -->
          <div class="row justify-center q-gutter-sm">
            <q-intersection
                v-for="(album ,index) in randomList"
                :key="index"
                once
                transition="scale"
                class="example-item"
            >
              <q-card flat bordered class="q-ma-sm">
                <img :src="imageUrl(album)">
                <q-card-section>
                  <div class="text-h6">
                    <a :href='"/detail?aid="+album.id'>
                      <p class="text-caption  two-line-clamp">  {{album.title}} </p>
                    </a>
                    <p class="text-caption" style="padding: 0px">  {{album.createTime}} </p>
                  </div>
                </q-card-section>
                <!--            <q-card-section class="q-pt-none">-->
                <!--              {{ lorem }}-->
                <!--            </q-card-section>-->
              </q-card>

            </q-intersection>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2"> </div>
      <div class="col-auto" style="margin: 0px">
        <div class="footter" style="margin: 0;text-align: center;">
          <router-link to="">关于图集</router-link>|
          <router-link to="">联系我们</router-link>|
          <router-link to="">帮助中心</router-link>|
          <router-link to="">提交建议</router-link>|
          <router-link to="">举报中心</router-link>|
          <router-link to="/privacyPolicy">隐私政策</router-link>|
          <router-link to="/use">使用条款</router-link>|
          <router-link to="">漏洞提交</router-link>|
        </div>
        <div class="footerText text-weight-thin"> <p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有 心世界未来科技有限公司</p></div>
        <div class="footerText text-weight-thin"><p>图片,美女,写真,图集</p></div>
        <div class="footerText text-weight-light"><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
        <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
      </div>
      <div class="col-2"></div>
    </div>
  </q-page>

  <q-dialog v-model="paypalDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">购买图集</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="container">
          <h1>欢迎使用我们的服务</h1>
          <p>请选择您的支付方案：</p>
          <PayPalButton :amount="album.price" :transaction-description="album.intro" :transaction-id="album.id"></PayPalButton>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<style  lang="sass"  scoped>
.responsive-image
  max-width: 980px
  height: auto
  margin: 0 auto

.caption
  display: flex
  justify-content: center
  align-items: center
  padding: 10px

.head-iamge
  height: 400px
  width: 260px
.head-iamge img
  object-fit: cover
.example-item
  height: 273px
  width: 150px
.two-line-clamp
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden
  text-overflow: ellipsis

.q-card-section
  padding: 8px
.text-caption
  margin: 0
  font-size: 0.8em
.container
  max-width: 500px
  margin: 0 auto
  padding: 20px
  text-align: center

</style>
