<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "invite"
})
</script>

<template>
  <div>
    <q-splitter
        horizontal>

      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">邀请连接</div>
          <div class="q-my-md"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
          <div class="q-my-md"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>


    </q-splitter>
  </div>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>已邀请用户</q-item-label>

      <q-item>
        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">GitHub</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[quasarframework/quasar]</span>
            <span class="text-grey-8"> - GitHub repository</span>
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #3: > Generic type parameter for props
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item>
        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">GitHub</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[quasarframework/quasar]</span>
            <span class="text-grey-8"> - GitHub repository</span>
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #1: > The build system
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

</template>

<style scoped>

</style>