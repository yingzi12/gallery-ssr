<script lang="ts" setup>
//提现
definePageMeta({
  key: route => route.fullPath
})
</script>

<template>
  <div class="q-pa-md">
    <div class="text-h4 q-mb-md">可提现金额 ：0 元</div>
    <div class="text-h4 q-mb-md">已提现金额 ：0 元</div>
  </div>

  <div class="q-pa-md q-gutter-md">
    <router-link to="/users/addWithdraw">
      <q-btn color="primary" label="添加"/>
    </router-link>

    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>Google Inbox style</q-item-label>

      <q-item>
        <q-item-section>
          <q-item-label>提现</q-item-label>
          <q-item-label caption lines="2">4000****33333</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2023-11-12 11:11:11</q-item-label>
          <q-item-label caption>成功</q-item-label>
          <q-icon color="yellow" name="star"/>
        </q-item-section>
      </q-item>

      <q-separator spaced/>
      <q-item>
        <q-item-section>
          <q-item-label>提现</q-item-label>
          <q-item-label caption lines="2">4000****33333</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2023-11-12 11:11:11</q-item-label>
          <q-item-label caption>成功</q-item-label>
          <q-icon color="yellow" name="star"/>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style scoped>

</style>