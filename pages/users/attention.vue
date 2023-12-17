<script lang="ts" setup>
//关注
import {useUserStore} from "~/stores/useUserStore";

const userStore = useUserStore();

definePageMeta({
  key: route => route.fullPath
})
const total = ref(0);
const maxPage = ref(0);

const current=ref(1)
const sellList = ref([]);
const queryData = reactive({
  queryParams: {
    pageNum: 1,
  }
});
const {queryParams} = toRefs(queryData);

async function getList(page: number) {
  queryParams.value.pageNum = page;
  try {
    const response = await axios.get('/api/admin/userAttention/list?' + tansParams(queryParams.value), {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    });
    if (response.data.code == 200) {
      total.value = response.data.total;
      maxPage.value=  total.value/20+1;
      sellList.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
getList(1)
</script>

<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered padding>
      <q-item-label header>关注列表（11）</q-item-label>

      <q-item>
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge label="10k"/>
        </q-item-section>
      </q-item>


      <q-separator inset="item" spaced/>

      <q-item>
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge label="10k"/>
        </q-item-section>
      </q-item>

      <q-separator inset="item" spaced/>

      <q-item>
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge label="10k"/>
        </q-item-section>
      </q-item>

      <q-separator inset="item" spaced/>

      <q-item>
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge label="10k"/>
        </q-item-section>
      </q-item>

      <q-separator inset="item" spaced/>

      <q-item>
        <q-item-section avatar top>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
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


    </q-list>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
          v-model="current"
          :max="maxPage"
          direction-links
          @update:modelValue="getList(current)"
      />
    </div>
  </div>
</template>

<style scoped>

</style>