<script setup  lang="ts">
definePageMeta({
  key: route => route.fullPath
})
</script>

<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered padding>
      <q-item-label header>购买列表（0）</q-item-label>

      <q-item>
        <q-item-section>
          <q-item-label>2324234234234</q-item-label>
          <q-item-label>购买VIP</q-item-label>
          <q-item-label caption lines="2">VIP名称</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2023-11-12 11:11:11</q-item-label>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section>
          <q-item-label>购买图集</q-item-label>
          <q-item-label caption lines="2">图集名称</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2023-11-12 11:11:11</q-item-label>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section>
          <q-item-label>购买图集</q-item-label>
          <q-item-label caption lines="2">图集名称</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2023-11-12 11:11:11</q-item-label>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section>
          <q-item-label>购买图集</q-item-label>
          <q-item-label caption lines="2">图集名称</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2023-11-12 11:11:11</q-item-label>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>


    </q-list>
  </div>
</template>

<style scoped>

</style>