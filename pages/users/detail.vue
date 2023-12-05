<script setup  lang="ts">
definePageMeta({
  key: route => route.fullPath
})
const lorem= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const url = ref('https://picsum.photos/500/300')

</script>

<template>
  <router-link to="/users/userEdit">
    <q-btn color="primary" label="编辑" />
  </router-link>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section >
          <q-avatar  size="100px" font-size="52px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>这是打发水电费</q-item-label>
          <q-item-label caption>
            ID:23424234234
          </q-item-label>
          <q-item-label caption>
            234fsf2f2sf@adfa.com<q-icon name="warning" style="color: red" />
          </q-item-label>
          <q-item-label caption>
            （点击发送邮箱验证码）
          </q-item-label>
        </q-item-section>

      </q-item>

      <q-separator />

      <q-card-section horizontal>
          {{ lorem }}
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" >1000</q-btn>
        <q-btn flat round icon="event" >1000</q-btn>
        <q-btn flat round icon="event" >1000</q-btn>


      </q-card-actions>
    </q-card>


  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>