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
<!--          <q-img-->
<!--              :src="url"-->
<!--              spinner-color="white"-->
<!--              style="height: 140px; max-width: 150px"-->
<!--          />-->
        </q-item-section>

        <q-item-section>
          <q-item-label>Title</q-item-label>
          <q-item-label caption>
            Subhead
          </q-item-label>
        </q-item-section>

      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          {{ lorem }}
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </q-card-section>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          7:30PM
        </q-btn>
        <q-btn flat color="primary">
          Reserve
        </q-btn>

      </q-card-actions>
      <q-separator />
      <q-card-actions class="q-pt-xs">
        <div class="text-overline">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-actions>
      <q-separator />

      <q-card-actions class="col-5 flex flex-center">
        <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
      </q-card-actions>
    </q-card>


  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>