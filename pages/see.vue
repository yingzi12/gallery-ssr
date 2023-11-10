<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue'
import {tansParams} from "~/server/utils/urlUtils";
useHead({
    title:"图集网",
    meta: [
        { name: 'description', content: "图集网 美女 写真 摄影 秀人网 Photo Gallery, Beauty, Photo, Photography, Showman.com." },
        { name: 'title', content: "图集网" }

    ],
})
const current = ref(1)
const slide = ref('first')
const title = ref('')
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
const image=ref("")
const { queryParams, form, rules } = toRefs(queryData);
async  function getList(page:number) {
    // 滚动到顶部
    current.value=page
    queryParams.value.title=title.value;
    queryParams.value.pageNum=page;
    const { data } = await useFetch('/api/album/listSee?'+tansParams(queryParams.value))
    total.value=data.value.total
    albumList.value=data.value.data
}
getList(1)

</script>
<template>
    <q-tabs shrink stretch>
        <q-input name="title" label="搜索" v-model="title" style="width: 600px"  @keyup.enter="getList(1)"/>          <q-icon name="search" @click="getList(1)"/>
    </q-tabs>
    <div class="q-pa-md">
        <q-carousel
            arrows
            animated
            thumbnails
            v-model="slide"
            height="400px"
        >
            <q-carousel-slide name="first" img-src="https://file2.aazz263.info/images/2021/07/29272649.jpg">
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">First stop</div>
                    <!--            <div class="text-subtitle1">Mountains</div>-->
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="second" img-src="https://hotgirl.asia/wp-content/uploads/2023/01/1674255622607_AyanaNishinaga_Minisuka_tv_2023_01_12RegularGallery5_2.jpg">
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">
                        <a href="https://aiavr.uk/detail?aid=4">Second stop</a>
                    </div>
                    <!--            <div class="text-subtitle1">Famous City</div>-->
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="third" img-src="https://usa.img111.top/uploads/1178/T/UGirls-APP/2642/2642_010_q9q_2766_4614.webp">
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Third stop</div>
                    <!--            <div class="text-subtitle1">Famous Bridge</div>-->
                </div>
            </q-carousel-slide>
        </q-carousel>
        <div class="row justify-center q-gutter-sm">
            <q-intersection
                v-for="(album ,index) in albumList"
                :key="index"
                once
                transition="scale"
                class="example-item"
            >
                <q-card flat bordered class="q-ma-sm">
                    <img :src="album.sourceWeb+album.imgUrl">
                    <q-card-section>
                        <div class="text-h6"><a :href='"/detail?aid="+album.id'>{{album.title}}</a></div>
                        <div class="text-subtitle2">{{album.createTime}}</div>
                    </q-card-section>
                    <!--            <q-card-section class="q-pt-none">-->
                    <!--              {{ lorem }}-->
                    <!--            </q-card-section>-->
                </q-card>

            </q-intersection>
        </div>
        <q-pagination class="caption"
                      v-model="current"
                      max="100"
                      max-pages="5"
                      direction-links
                      flat
                      color="grey"
                      active-color="primary"
                      @update:model-value="getList"
        />
    </div>
    <div class="row">
        <div class="col-2"> </div>
        <div class="col-auto" style="margin: 0px">
            <div class="footter" style="margin: 0px;text-align: center;">
                <router-link to="">关于图集</router-link>|
                <router-link to="">联系我们</router-link>|
                <router-link to="">帮助中心</router-link>|
                <router-link to="">提交建议</router-link>|
                <router-link to="">举报中心</router-link>|
                <router-link to="">漏洞提交</router-link>|
            </div>
            <div class="footerText text-weight-thin"> <p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
            <div class="footerText text-weight-thin"><p>图片,美女,写真,图集</p></div>
            <div class="footerText text-weight-light"><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
            <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
        </div>
        <div class="col-2"></div>
    </div>
</template>

<style lang="sass" scoped>
.custom-caption
    text-align: center
    padding: 12px
    color: white
    background-color: rgba(0, 0, 0, .3)

.q-carousel__slide
    background-size: contain
.example-item
    height: 600px
    width: 260px
.q-card img
    object-fit: cover
.q-pagination
    text-align: center
.caption
    display: flex
    justify-content: center
    align-items: center
</style>
