<script setup lang="ts">
import {useRoute} from "vue-router";

// 接收url里的参数
const route = useRoute();
const aid = ref(route.query.aid);
// key :old hostName value:new HostName
const hostnameValues = new Map([
  ['video.', 'video'],
  ['hotfirl', 'hotfirl'],
  ['https://images.hotgirl.asia', 'https://imageshotgirl.yappgcu.uk'],
  ['https://mogura.my.id', 'https://mogura.yappgcu.uk'],
  ['jkforum', 'jkforum.com'],
  ['x60', 'x60.com']
]);

function getValueWithDefault(key:string) {
  if (hostnameValues.has(key)) {
    return hostnameValues.get(key); // 如果键存在，返回其对应的值
  } else {
    return key;
  }
}
const imageList= ref([])
const disableInfiniteScroll = ref(false)
const isRefreshing = ref(false)
const isFullScreen = ref(false);
const isDialog = ref(false);
const offsetPage = ref(1);
const pageNum = ref(0);

const currentIndex = ref(0);

const onLoad = async (index: number, done: () => void) => {
  try {
    pageNum.value=index;
    isRefreshing.value = true
    await getList(index + offsetPage.value);
    done();

  } catch (error) {
    disableInfiniteScroll.value = true;
    // console.error(error);
    done();
  } finally {
    isRefreshing.value = false;
  }
}
async function getList(pageNum: number) {
  const {data} = await useFetch('/api/image/list?aid=' + aid.value + '&pageNum=' + pageNum)
  // if (data.value.code === 200) {
  if (data && data.value && data.value.code === 200) {
    const imgList = data.value.data
    if (imgList.length == 0) {
      disableInfiniteScroll.value = true
    }
    imageList.value.push(...imgList);
    isRefreshing.value = false;
  }
}
onLoad(0, () => {});
const album = ref({});
const  title=ref("图集网")

const description = ref('图集网 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com.')
const ortTile=ref("图集网")
const orgDec=ref("图集网")
const orgImgae=ref("图集网")
const orgGirl = ref("图集网")
const orgTags = ref("图集网")

useHead({
  title:title,
  meta: [
    { name: 'description', content: description },
    { name: 'title', content: title },
    { name: 'og:title', content:  ortTile},
    { name: 'og:description', content:  orgDec},
    { name: 'og:image', content:  orgImgae},
    {name: 'og:girl', content: orgGirl},
    {name: 'og:tags', content: orgTags},
  ],
})

async function getInfo() {
  // 滚动到顶部
  const {data} = await useFetch("/api/album/info?id=" +aid.value )
  if (data.value.code === 200) {
    album.value = data.value.data;
    title.value="图集网-"+album.value.title
    ortTile.value=album.value.title
    ortTile.orgDec=album.value.intro
    ortTile.orgImgae=album.value.sourceWeb+album.value.imgUrl
    orgTags.value = album.value.tags
    orgGirl.value = album.value.girl
  }
}
async function handleImageError(){
  const {data} = await useFetch("/api/album/error?id=" +aid.value )
  alert("提交成功,等待管理员处理中.")
}
const randomList = ref([]);

async  function getRandom() {
  const { data } = await useFetch('/api/album/random')
  if (data.value.code === 200) {
    randomList.value = data.value.data
  }
}

function openFullScreen(index) {
  // console.log(`------------openFullScreen------------${imageList.value.length}--`)
  // console.log(index)
  currentIndex.value = index;
  isFullScreen.value = true;
  isDialog.value=true;
}

getRandom();
getInfo();
// onLoad(1);
function imageUrlDetail(image) {
  if (image.sourceUrl!=null && image.sourceUrl.startsWith('/image')) {
    return `https://image.51x.uk/xinshijie${image.sourceUrl}`;
  }
  return getValueWithDefault(image.sourceWeb) +image.url;
}
function imageUrl(album) {
  if (album.sourceUrl!=null &&  album.sourceUrl.startsWith('/image')) {
    return `https://image.51x.uk/xinshijie${album.sourceUrl}`;
  }
  return album.sourceWeb + album.imgUrl;
}
function toLogin(){
  window.location.href = "https://user.aiavr.uk/login";
}

function handleKeyPress(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowLeft':
      previousSlide();
      break;
    case 'ArrowRight':
      nextSlide();
      break;
  }
}

function previousSlide() {
  // console.log(`=========previousSlide======${currentIndex.value}======${imageList.value.length }========`)
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    // 如果已经是第一张幻灯片，则循环到最后一张
    currentIndex.value = imageList.value.length - 1;
  }
}

function nextSlide() {
  // console.log(`=========nextSlide======${currentIndex.value}======${imageList.value.length }========`)
  if (currentIndex.value < imageList.value.length - 1) {
    currentIndex.value++;
  } else {
    offsetPage.value=offsetPage.value+1;
    getList(pageNum.value+offsetPage.value);
    if(disableInfiniteScroll.value) {
      // 如果已经是最后一张幻灯片，则循环到第一张
      currentIndex.value = 0;
    }else {
      currentIndex.value++;
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress);
});
</script>
<template>
  <q-page @keydown="handleKeyPress">
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
          <div class="q-pa-md q-gutter-sm">
            <q-btn  icon="favorite_border" @click="toLogin()">{{$t('collect')}}</q-btn>
          </div>
        </div>

        <div style="width: 10%">
          <button  class="text-h6" @click="handleImageError()"> 报告异常</button>
        </div>
      </div>
      <div>
        <!--    内容页-->
        <!--    <q-infinite-scroll @load="onLoad" :disable="disableInfiniteScroll"  :offset="250">-->
        <!--      <div v-for="(image, index) in imageList" :key="index" class="caption">-->
        <!--        <img :src="imageUrlDetail(image)" class="responsive-image"/>-->
        <!--      </div>-->
        <!--      <template v-slot:loading>-->
        <!--        <div class="row justify-center q-my-md">-->
        <!--          <q-spinner-dots color="primary" size="40px" />-->
        <!--        </div>-->
        <!--      </template>-->
        <!--    </q-infinite-scroll>-->
        <!--    </div>-->
        <!--    <q-page class="q-pa-md">-->
        <div class="row q-col-gutter-md">
          <div v-for="(image, index) in imageList" :key="index" class="col-xs-12 col-sm-6 col-md-4" @click="openFullScreen(index)">
            <q-img :src="imageUrlDetail(image)" class="full-width cursor-pointer" />
          </div>
        </div>

        <div v-if="isFullScreen" >
          <div class="fullscreen-image-container">
            <q-carousel
                class="fullscreen-image"
                swipeable
                animated
                v-model="currentIndex"
                ref="carousel"
                infinite
                fullscreen
            >
              <q-carousel-slide v-for="(img, idx) in imageList"
                                :name="idx"
                                :key="`carousel-${idx}`"
                                >
                <div class="image-container">
                  <img :src="imageUrlDetail(img)" style="object-fit: contain;height: 100%;"/>
                </div>
              </q-carousel-slide>

              <template v-slot:control>
                <q-carousel-control
                    position="bottom-right"
                    :offset="[18, 18]"
                    class="q-gutter-xs"
                >
                  <q-btn
                      push round dense color="orange" text-color="black" icon="arrow_left"
                      @click="previousSlide"
                  />
                  <q-btn
                      push round dense color="orange" text-color="black" icon="arrow_right"
                      @click="nextSlide"
                  />
                  <q-btn
                      push round dense color="white" text-color="primary"
                      :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
                      @click="isFullScreen = !isFullScreen"
                  />
                </q-carousel-control>
              </template>

            </q-carousel>
          </div>
        </div>

        <q-infinite-scroll @load="onLoad" :disable="disableInfiniteScroll">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
        <!--    </q-page>-->
        <div style=" text-align: center;font-size: large">
          <a style="margin: 20px;font-size: large" v-if="album.pre != null " :href='"/detail?aid="+album.pre.id'>{{album.pre.title}}</a>
          <a style="margin: 20px;font-size: large"   v-if="album.next != null " :href='"/detail?aid="+album.next.id'>{{album.next.title}}</a>
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
    </div>
  </q-page>
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

.cursor-pointer
  cursor: pointer

</style>
<style lang="scss" scoped>
.fullscreen-image {
  max-width: 100%; /* 设置照片的最大宽度为容器的宽度 */
  max-height: 100%; /* 设置照片的最大高度为容器的高度 */
  object-fit: contain; /* 确保照片按比例缩放并完全显示在容器内 */
}
.fullscreen-image-container {
  width: 100%; /* 设置容器的宽度为100%，确保填满父容器 */
  height: 100%; /* 设置容器的高度为100%，确保填满父容器 */
  overflow: hidden; /* 确保超出部分被隐藏 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 确保图片容器与父容器高度相同 */
}
</style>