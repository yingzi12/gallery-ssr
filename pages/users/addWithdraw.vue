<script setup lang="ts">

const $q = useQuasar()

const title = ref(null)
const desc = ref(null)
const intro = ref(null)
const tags = ref(null)
const price =ref(0);
const accept = ref(false)
const timeType=ref(null)
const timeLong=ref(1);
const timeTypeList=[
  '天', '周', '月', '年', '永久'
]
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
  title.value = null
  desc.value = null
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
          v-model="title"
          label="银行卡号 *"
          hint="银行卡号"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          type="text"
          v-model="intro"
          label="银行名称 *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"

      />
      <q-input
          filled
          type="text"
          v-model="desc"
          label="姓名 *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
          filled
          v-model="price"
          label="提现金额"
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