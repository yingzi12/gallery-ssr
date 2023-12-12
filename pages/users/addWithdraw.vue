<script lang="ts" setup>

const $q = useQuasar()

const title = ref(null)
const desc = ref(null)
const intro = ref(null)
const tags = ref(null)
const price = ref(0);
const accept = ref(false)
const timeType = ref(null)
const timeLong = ref(1);
const timeTypeList = [
  '天', '周', '月', '年', '永久'
]
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

function onReset() {
  title.value = null
  desc.value = null
  intro.value = null
  tags.value = null
  accept.value = false
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
        @reset="onReset"
        @submit="onSubmit"
    >
      <q-input
          v-model="title"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          hint="银行卡号"
          label="银行卡号 *"
          lazy-rules
      />
      <q-input
          v-model="intro"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          label="银行名称 *"
          lazy-rules
          type="text"

      />
      <q-input
          v-model="desc"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          filled
          label="姓名 *"
          lazy-rules
          type="text"
      />
      <q-input
          v-model="price"
          :rules="[
          val => (val !== null && val !== '') || '请输入金额',
        val => (val > 0 && val < 10000) || '金额不能大于1000'
                  ]"
          fill-mask="0"
          filled
          hint="Mask: #.##"
          input-class="text-right"
          label="提现金额"
          mask="#.##"
          reverse-fill-mask

      />
      <div>
        <q-btn color="primary" label="Submit" type="submit"/>
        <q-btn class="q-ml-sm" color="primary" flat label="Reset" type="reset"/>
      </div>
    </q-form>
  </div>
</template>

<style scoped>

</style>