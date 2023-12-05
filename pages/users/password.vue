<script setup lang="ts">
const fourth =ref(true);
const $q = useQuasar()

const oldPassword = ref(null)
const newPassword = ref(null)
const newPassword2 = ref(null)
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
</script>

<template>

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
        @submit="onSubmit"
        class="q-gutter-md"
    >
      <q-input
          filled
          v-model="oldPassword"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="newPassword"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="newPassword2"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn label="重置密码" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>

<style scoped>

</style>