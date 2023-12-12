<script lang="ts" setup>
//收藏
definePageMeta({
  key: route => route.fullPath
})
const tab = ref('mails')
</script>

<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
            v-model="tab"
            align="justify"
            class="bg-purple text-white"
            narrow-indicator
        >
          <q-tab label="系统" name="mails"/>
          <q-tab label="用户" name="alarms"/>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-orange-1 text-dark ">
          <q-tab-panel class="bg-lime-1 text-dark" name="mails">
            <div class="q-pa-md" style="width: 100%">
              <q-list bordered padding>
                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon color="yellow" name="star"/>
                  </q-item-section>
                </q-item>
                <q-separator spaced/>
                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset="item" spaced/>

                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset="item" spaced/>

                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon color="yellow" name="star"/>
                  </q-item-section>
                </q-item>

              </q-list>
            </div>

          </q-tab-panel>

          <q-tab-panel class="bg-lime-1 text-dark" name="alarms">
            <div class="q-pa-md" style="width: 100%">
              <q-list bordered padding>
                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon color="yellow" name="star"/>
                  </q-item-section>
                </q-item>
                <q-separator spaced/>
                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset="item" spaced/>

                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset="item" spaced/>

                <q-item>
                  <q-item-section class="q-ml-none" thumbnail top>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon color="yellow" name="star"/>
                  </q-item-section>
                </q-item>

              </q-list>
            </div>

          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<style scoped>

</style>