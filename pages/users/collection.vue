<script setup  lang="ts">
//收藏
definePageMeta({
  key: route => route.fullPath
})
const tab=ref('mails')
</script>

<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
            v-model="tab"
            class="bg-purple text-white"
            align="justify"
            narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-orange-1 text-dark text-center">
          <q-tab-panel name="mails" class="bg-lime-1 text-dark">
            <div class="q-pa-md" style="max-width: 350px">
              <q-list bordered padding>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>OVERLINE</q-item-label>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />
                <q-item-label header>List Header</q-item-label>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section>List item</q-item-section>
                  <q-item-section side>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar color="primary" text-color="white" icon="bluetooth" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="star" color="yellow" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar color="primary" text-color="white" square icon="bluetooth" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-badge label="10k" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top thumbnail class="q-ml-none">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

          </q-tab-panel>

          <q-tab-panel name="alarms" class="bg-lime-1 text-dark">
            <div class="q-pa-md" style="max-width: 350px">
              <q-list bordered padding>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>OVERLINE</q-item-label>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />
                <q-item-label header>List Header</q-item-label>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section>List item</q-item-section>
                  <q-item-section side>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar color="primary" text-color="white" icon="bluetooth" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-icon name="star" color="yellow" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar color="primary" text-color="white" square icon="bluetooth" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-badge label="10k" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section top thumbnail class="q-ml-none">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>meta</q-item-label>
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