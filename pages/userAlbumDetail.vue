<script lang="ts" setup>
import {useRoute} from "vue-router";
import {useUserStore} from "~/stores/useUserStore";
import PayaplCard from "~/pages/payaplCard.vue";
// import PayaplCard from './payaplCard.vue';
const amount=ref(1.0);
// const title=ref("这是图集名称");
const intro=ref("这是简介，这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介");

const userStore = useUserStore();

// 接收url里的参数
const route = useRoute();
const aid = ref(route.query.aid);

const imgTotal = ref(0);
const videoTotal = ref(0);
const isSee = ref(false);
const imageCount = ref(0);
const videoCount = ref(0);

const imageList = ref([]);
const videoList = ref([]);

const imageLockList = ref([]);
const videoLockList = ref([]);
const isCollection = ref(2)

const disableInfiniteScroll = ref(false);
const isRefreshing = ref(false);
const onLoad = async (index: number, done: () => void) => {
  // 如果isSee为false，立即结束加载过程
  if (!isSee.value) {
    done();
    return;
  }
  if (isSee.value) {
    // console.log("-----------onLoad--------------"+index.toString())
    imageLockList.value = []
    try {
      isRefreshing.value = true
      const response = await axios.get(`/api/userImage/list?aid=${aid.value}&isFree=2&pageNum=` + (index + 1), {
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })
      // console.log("-----------userImage--------------")
      const data = response.data;
      if (data && data.code === 200) {
        const imgList = data.data;
        imgTotal.value = data.total
        if (imgList.length == 0) {
          disableInfiniteScroll.value = true
        }
        // console.log("-----------userImage--------------")
        imageList.value.push(...imgList);
        isRefreshing.value = false;
      } else {
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
const title = ref("图集网")

const description = ref('图集网 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com.')
const ortTile = ref("图集网")
const orgDec = ref("图集网")
const orgImgae = ref("图集网")

useHead({
  title: title,
  meta: [
    {name: 'description', content: description},
    {name: 'title', content: title},
    {name: 'og:title', content: ortTile},
    {name: 'og:description', content: orgDec},
    {name: 'og:image', content: orgImgae}
  ],
})

async function getInfo() {
  // 滚动到顶部
  const response = await axios.get("/api/userAlbum/info?id=" + aid.value, {
    headers: {
      'Authorization': `Bearer ${userStore.token}`
    }
  })
  const data = response.data;
  // console.log(data)
  if (data.code === 200) {
    imageList.value.push(...data.data.imageList);
    videoList.value.push(...data.data.videoList);
    isSee.value = data.data.isSee;
    if (!isSee.value) {
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
    isCollection.value=album.value.isCollection
    title.value = "图集网-" + album.value.title
    ortTile.value = album.value.title
    orgDec.value = album.value.description
    orgImgae.value = album.value.sourceWeb + album.value.imgUrl
  }
}

async function getCollection() {
  // 滚动到顶部
  const response = await axios.get(`/api/userCollection/getInfo?aid=${aid.value}&ctype=2&title=${ortTile.value}`)
  const data = response.data;
  if (data.code == 200) {
    if(data.data){
      isCollection.value=1;
    }else {
      isCollection.value=2;
    }
  }
}
async function onCollection() {
  // 滚动到顶部
  const response = await axios.get(`/api/admin/userCollection/on?aid=${aid.value}&ctype=2&title=${ortTile.value}`)
  const data = response.data;
  if (data.code == 200) {
    isCollection.value=1;
  }
}
async function closeCollection() {
  // 滚动到顶部
  const response = await axios.get(`/api/admin/userCollection/close?aid=${aid.value}&ctype=2&title=${title.value}`)
  const data = response.data;
  if (data.code == 200) {
    isCollection.value=2;
  }
}

async function getVideoList() {
  if (isSee.value) {
    videoLockList.value = []
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

async function handleImageError() {
  const response = await axios.get("/api/userAlbum/error?id=" + aid.value, {
    headers: {
      'Authorization': `Bearer ${userStore.token}`
    }
  })
  alert("提交成功,等待管理员处理中.")
}

const randomList = ref([]);

async function getRandom() {
  const response = await axios.get('/api/userAlbum/random', {
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
  if (album.sourceUrl != null && album.sourceUrl.startsWith('/image')) {
    return `https://image.51x.uk/xinshijie${album.sourceUrl}`;
  }
  return album.sourceWeb + album.imgUrl;
}

const paypalDialog = ref(false);

function openPayPalDialog (){
  console.log("------------openPayPalDialog---------------------------")
  paypalDialog.value = true;
};
// console.log(userStore.token)
// 监听isSee的值
watch(isSee, (newValue, oldValue) => {
  if (newValue === true) {
    onLoad(0, () => {
    });
    getVideoList();
  }
}, {immediate: true}); // immediate: true 确保在挂载时立即触发一次
const  stars=ref(3);
</script>
<template>
  <q-page>
    <div class="q-pa-md">
      <div>
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section style="width: 220px;height: 376px">
          <q-img fit="fill"
              class="col headImage"
              src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          </q-card-section>
          <q-separator vertical />

          <q-card-actions vertical class="justify-around q-px-md">
            <div style="padding-left: 10px;width: 100%">
              <div class="text-h5 q-mt-sm q-mb-xs"><h5>{{ album.title }}</h5></div>
              <div>
                <q-rating v-model="stars" :max="5" size="32px" />
              </div>
              <div style="word-wrap: break-word; white-space: pre-line;">
                <p>{{ album.intro }}</p>
              </div>
              <div> <span v-if="album.charge == 1" class="text-primary" >免费</span>
                <span v-if="album.charge == 2" class="text-primary" >VIP免费</span>
                <span v-if="album.charge == 3" class="text-primary" >VIP折扣</span>
                <span v-if="album.charge == 4" class="text-primary" >VIP独享</span>
                <span  v-if="album.charge == 5" class="text-primary" >统一</span>
              </div>
              <div v-if="album.charge == 2 || album.charge == 3 ||album.charge == 5 ">价格:{{album.price }}</div>
              <div v-if="album.charge == 3">VIP价格: 0 </div>
              <div v-if="album.charge == 4 || album.charge == 5">VIP价格: {{album.vipPrice }} </div>

              <div>模特:{{album.girl }}</div>
              <div>类型: {{ album.photoNumber }}</div>
              <div>照片:{{ album.photoNumber }}</div>
              <div>浏览次数:{{ album.countSee }}</div>
              <div>标签: {{ album.tags }}</div>
              <div>创建时间：{{ album.createTime }}</div>
              <div class="q-pa-md q-gutter-sm">
<!--                <q-btn square color="primary" icon="shopping_cart" />-->
                <q-btn v-if="album.charge != 1" @click="openPayPalDialog()">购买 </q-btn>
                <q-btn v-if="isCollection == 2" icon="favorite_border" @click="onCollection()">收藏</q-btn>
                <q-btn v-if="isCollection == 1"  icon="favorite"  @click="closeCollection()">取消收藏</q-btn>
              </div>
            </div>
          </q-card-actions>
        </q-card-section>
      </q-card>
      </div>
      <div>

        <div>
          <q-th>视频列表（{{ videoTotal }}）</q-th>
          <div class="q-pa-md">
            <div class="row justify-center q-gutter-sm">
              <q-intersection
                  v-for="(video,index) in videoList"
                  :key="index"
                  class="example-item"
                  transition="scale"
              >
                <q-card bordered class="q-ma-sm" flat>
                  <img :src="video.imgUrl">

                  <q-card-section>
                    <q-btn v-if="video.isFree == 2" color="primary" icon="visibility" square>预览</q-btn>
                    <q-btn v-if="video.isFree == 1" color="primary" icon="sunny" square>正式</q-btn>
                  </q-card-section>
                </q-card>
              </q-intersection>
              <q-intersection
                  v-for="(videoLock,index) in videoLockList"
                  :key="index"
                  class="example-item"
                  transition="scale"
              >
                <q-card bordered class="q-ma-sm" flat>
                  <img :src="videoLock.imgUrl">
                </q-card>
              </q-intersection>
            </div>
          </div>
        </div>
        <div>
          <q-th>图片列表（{{ imgTotal }}）</q-th>

          <!--    内容页-->
          <q-infinite-scroll :disable="disableInfiniteScroll" :offset="250" @load="onLoad">
            <div v-for="(image, index) in imageList" :key="index" class="caption">
              <img :src="imageUrlDetail(image)" class="responsive-image"/>
            </div>

            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px"/>
              </div>
            </template>
          </q-infinite-scroll>
          <q-pull-to-refresh>
            <div v-for="(imageLock, index) in imageLockList" :key="index" class="caption">
              <img :src="imageLock.imgUrl" class="responsive-image"/>
            </div>
          </q-pull-to-refresh>

        </div>
        <div style=" text-align: center;font-size: large">
          <a v-if="album.pre != null " :href='"/userAlbumDetail?aid="+album.pre.id'
             style="margin: 20px;font-size: large">{{ album.pre.title }}</a>
          <a v-if="album.next != null " :href='"/userAlbumDetail?aid="+album.next.id'
             style="margin: 20px;font-size: large">{{ album.next.title }}</a>
        </div>
        <div>
          <!-- 在这里放置您希望在新列中显示的内容 -->
          <div class="row justify-center q-gutter-sm">
            <q-intersection
                v-for="(album ,index) in randomList"
                :key="index"
                class="example-item"
                once
                transition="scale"
            >
              <q-card bordered class="q-ma-sm" flat>
                <img :src="imageUrl(album)">
                <q-card-section>
                  <div class="text-h6">
                    <a :href='"/detail?aid="+album.id'>
                      <p class="text-caption  two-line-clamp"> {{ album.title }} </p>
                    </a>
                    <p class="text-caption" style="padding: 0px"> {{ album.createTime }} </p>
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
      <div class="col-2"></div>
      <div class="col-auto" style="margin: 0px">
        <div class="footter" style="margin: 0;text-align: center;">
          <router-link to="">关于图集</router-link>
          |
          <router-link to="">联系我们</router-link>
          |
          <router-link to="">帮助中心</router-link>
          |
          <router-link to="">提交建议</router-link>
          |
          <router-link to="">举报中心</router-link>
          |
          <router-link to="/privacyPolicy">隐私政策</router-link>
          |
          <router-link to="/use">使用条款</router-link>
          |
          <router-link to="">漏洞提交</router-link>
          |
        </div>
        <div class="footerText text-weight-thin"><p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有
          心世界未来科技有限公司</p></div>
        <div class="footerText text-weight-thin"><p>图片,美女,写真,图集</p></div>
        <div class="footerText text-weight-light"><p>
          本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p>
        </div>
        <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a
            href="https://www.30dizhi.uk">30导航</a>|<a href="https://www.aravrw.com">心世界</a></div>
      </div>
      <div class="col-2"></div>
    </div>
  </q-page>

  <q-dialog v-model="paypalDialog">
    <PayaplCard :amount="album.amount" :productId="album.id" :kind="4" :intro="album.intro" :productName="album.title"/>
  </q-dialog>
</template>


<style lang="sass" scoped>
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
.my-card
  width: 100%
  max-width: 750px
.headImage
  max-width: 220px
  height: 376px
</style>
