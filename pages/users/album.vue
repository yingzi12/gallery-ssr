<script  setup lang="ts">
definePageMeta({
  key: route => route.fullPath
})
const url = ref('https://picsum.photos/500/300')

</script>

<template>
  <div class="q-pa-md q-gutter-md">
    <router-link to="/users/addAlbum">
      <q-btn color="primary" label="添加" />
    </router-link>
    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>Google Inbox style</q-item-label>

      <q-item>
        <q-item-section  top>
          <q-img
              :src="url"
              spinner-color="white"
              style="height: 140px; max-width: 150px"
          />
        </q-item-section>


        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">这是一个好快的图集</q-item-label>
<!--          <q-item-label class="q-mt-sm">这是呀呀呀的图集</q-item-label>-->
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">这是图集的介绍，我是介绍哦，比儿科哦</span>
          </q-item-label>
          <q-item-label caption>
            这是图集的介绍
          </q-item-label>
          <q-item-label >
            <span class="text-grey-8"> 2022-11-12</span>
          </q-item-label>
          <q-item-label class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">视频：0</span>
          </q-item-label>
          <q-item-label class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">照片：0</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side>
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >vip</q-btn>
            <q-btn class="gt-xs" size="12px" flat dense round icon="done"> 20 </q-btn>
        </q-item-section>

        <q-item-section top side>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done" >发布</q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>收藏：0</q-item-label>
          <q-item-label caption>购买：0</q-item-label>
          <q-item-label caption>查看：0</q-item-label>
          <q-item-label caption>2023-11-11</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item>
        <q-item-section  top>
          <q-img
              :src="url"
              spinner-color="white"
              style="height: 140px; max-width: 150px"
          />
        </q-item-section>


        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">这是一个好快的图集</q-item-label>
          <!--          <q-item-label class="q-mt-sm">这是呀呀呀的图集</q-item-label>-->
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">这是图集的介绍，我是介绍哦，比儿科哦</span>
          </q-item-label>
          <q-item-label caption>
            这是图集的介绍
          </q-item-label>
          <q-item-label >
            <span class="text-grey-8"> 2022-11-12</span>
          </q-item-label>
          <q-item-label class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">视频：0</span>
          </q-item-label>
          <q-item-label class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">照片：0</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side>
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >vip</q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done"> 免费 </q-btn>
        </q-item-section>

        <q-item-section top side>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done" >发布</q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
        </q-item-section>
        <q-item-section side top>

          <q-item-label caption>购买：0</q-item-label>
          <q-item-label caption>查看：0</q-item-label>
          <q-item-label caption>2023-11-11</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style scoped>

</style>