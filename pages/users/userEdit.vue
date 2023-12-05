<script setup lang="ts">
const fourth =ref(true);
const $q = useQuasar()
const url = ref('https://picsum.photos/500/300')

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
function refresh () {
  url.value = 'https://picsum.photos/500/300?t=' + Math.random()
}
const  filePath=ref("");
</script>

<template>

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <div class="q-pa-md q-gutter-sm">
        <q-img
            src="https://picsum.photos/500/300"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
        />
        <q-file  outlined v-model="filePath" style="width: 100px" label="上传图片" />
      </div>
      <q-input
          filled
          v-model="name"
          label="你的名称 *"
          hint="你的名称"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="name"
          label="E-mail *"
          hint="E-mail"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="name"
          label="简介 *"
          hint="简介"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>

</template>

<style scoped>

</style>