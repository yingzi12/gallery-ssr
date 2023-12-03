<script setup lang="ts">

const $q = useQuasar()

const name = ref(null)
const gril = ref(null)
const intro = ref(null)
const tags = ref(null)
const isFree = ref(false)
const isVip = ref(false)
const price =ref(0);
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
  gril.value = null
  intro.value = null
  tags.value = null
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
</script>

<template>

  <div class="q-pa-md" style="max-width: 400px">

    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <q-input
          filled
          v-model="name"
          label="图集名称 *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="gril"
          label="模特 *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          type="text"
          v-model="intro"
          label="简介 *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"

      />
      <q-input
          filled
          type="text"
          v-model="tags"
          label="标签 *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <di>
        <q-toggle
            v-model="isFree"
            label="是否收费"
            left-label
        />
      </di>
      <di>
        <q-toggle
            v-model="isVip"
            label="是否VIP"
            left-label
        />
      </di>
      <q-input v-if="isFree"
               filled
               v-model="price"
               label="Price with 2 decimals"
               mask="#.##"
               fill-mask="0"
               reverse-fill-mask
               hint="Mask: #.##"
               input-class="text-right"
               :rules="[
          val => (val !== null && val !== '') || '请输入金额',
        val => (val > 0 && val < 10000) || '金额不能大于1000'
                  ]"

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