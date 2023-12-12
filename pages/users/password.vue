<script lang="ts" setup>
const fourth = ref(true);
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
} else {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  } else {
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
        class="q-gutter-md"
        @submit="onSubmit"
    >
      <q-input
          v-model="oldPassword"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          hint="Name and surname"
          label="Your name *"
          lazy-rules
      />
      <q-input
          v-model="newPassword"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          hint="Name and surname"
          label="Your name *"
          lazy-rules
      />
      <q-input
          v-model="newPassword2"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          hint="Name and surname"
          label="Your name *"
          lazy-rules
      />

      <div>
        <q-btn color="primary" label="重置密码" type="submit"/>
      </div>
    </q-form>

  </div>
</template>

<style scoped>

</style>