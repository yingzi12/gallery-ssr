<script setup lang="ts">
const $q = useQuasar()

const name = ref(null)
const accept = ref(false)
if (accept.value !== true) {
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: 'You need to accept the license and terms first'
  })
}
else {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}
function onSubmit () {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  }
}
const url = ref('https://picsum.photos/500/300')

</script>

<template>

  <q-breadcrumbs gutter="none">
    <q-breadcrumbs-el label="这是我的图集" />
    <q-breadcrumbs-el label="视频列表" />
  </q-breadcrumbs>
  <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
      <q-uploader
          url="http://localhost:4444/upload"
          label="Batch upload"
          multiple
          batch
          style="max-width: 300px"
      />
    </div>
  </div>

  <q-list bordered class="rounded-borders" style="max-width: 400px">
    <q-item-label header>图片列表（0）</q-item-label>

    <q-item>
      <q-item-section >
        <q-img
            :src="url"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
        />
      </q-item-section>

      <q-item-section side >
        <q-item-label caption>2023-11-11 11:11:12</q-item-label>
      </q-item-section>
      <q-item-section  side>
        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item>
      <q-item-section >
        <q-img
            :src="url"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
        />
      </q-item-section>

      <q-item-section side >
        <q-item-label caption>2023-11-11 11:11:12</q-item-label>
      </q-item-section>
      <q-item-section  side>
        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" >删除</q-btn>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>