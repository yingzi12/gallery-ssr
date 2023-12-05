<script setup lang="ts">
const $q = useQuasar()

const name = ref(null)
const age = ref(null)
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
function  onReset () {
  name.value = null
  age.value = null
  accept.value = false
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
    <q-breadcrumbs-el label="图片列表" />
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
<q-th>图片列表（0）</q-th>
  <div class="q-pa-md">
    <div class="row justify-center q-gutter-sm">
      <q-intersection
          v-for="index in 60"
          :key="index"
          transition="scale"
          class="example-item"
      >
        <q-card flat bordered class="q-ma-sm">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <q-btn class="text-h6">删除</q-btn>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
.example-item
  height: 290px
  width: 290px
</style>