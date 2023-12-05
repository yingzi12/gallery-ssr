<script setup  lang="ts">
definePageMeta({
  key: route => route.fullPath
})
</script>

<template>
  <div class="q-pa-md q-gutter-md">
    <router-link to="/users/addAlbum">
      <q-btn color="primary" label="添加" />
    </router-link>
    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>我创建的图集（0）</q-item-label>

      <q-item>
        <q-item-section >
          <q-item-label lines="1">
            <span class="text-weight-medium">这是图集的介绍，我是介绍哦，比儿科哦</span>
          </q-item-label>
          <q-item-label caption>2023-11-11 11:43:23</q-item-label>
          <q-item-label caption>
            标签。标签标签标签标签标签标签标签标签标签标签标签标签
          </q-item-label>
          <q-item-label lines="3" caption>
            这是图集的介绍，这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍
            这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍
          </q-item-label>

        </q-item-section>

        <q-item-section  side>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done" >发布</q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
        </q-item-section>
        <q-item-section side >
          <q-item-label caption>价格：11.0</q-item-label>
          <q-item-label caption>单位：1/月</q-item-label>
          <q-item-label caption>购买：0</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item>
        <q-item-section >
          <q-item-label lines="1">
            <span class="text-weight-medium">这是图集的介绍，我是介绍哦，比儿科哦</span>
          </q-item-label>
          <q-item-label caption>2023-11-11 11:43:23</q-item-label>
          <q-item-label caption>
            标签。标签标签标签标签标签标签标签标签标签标签标签标签
          </q-item-label>
          <q-item-label lines="3" caption>
            这是图集的介绍，这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍
            这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍这是图集的介绍
          </q-item-label>

        </q-item-section>

        <q-item-section  side>
          <q-btn class="gt-xs" size="12px" flat dense round icon="done" >发布</q-btn>
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
        </q-item-section>
        <q-item-section side >
          <q-item-label caption>价格：11.0</q-item-label>
          <q-item-label caption>单位：1/月</q-item-label>
          <q-item-label caption>购买：0</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

</template>

<style scoped>

</style>