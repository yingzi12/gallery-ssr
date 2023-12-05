<script  setup lang="ts">
const text = ref('https://www.aiavr.uk/index?invite=111111111111111213123231');
const textToCopy = ref(null);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(textToCopy.value.value);
    alert('复制成功！');
  } catch (err) {
    alert('复制失败');
  }
};
</script>

<template>
  <div>
    <q-splitter
        horizontal>

      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">已获得奖励 ：0 元</div>
          <div class="text-h4 q-mb-md">邀请连接</div>
          <div class="q-my-md">
            <h3>邀请大家一起来吧！</h3>
            <h5>被邀请者在网站消费你都将获得奖励，邀请人越多，奖励越高！</h5>
          </div>
          <div>
          <input ref="textToCopy" type="text" v-model="text" />
          <button @click="copyToClipboard">复制</button>
        </div>
        </div>
      </template>


    </q-splitter>
  </div>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered padding>
      <q-item-label header>已邀请用户</q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label>用户1111</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>2023-11-12 11:11:11</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section>
          <q-item-label>用户1111</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>2023-11-12 11:11:11</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section>
          <q-item-label>用户1111</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>2023-11-12 11:11:11</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section>
          <q-item-label>用户1111</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>2023-11-12 11:11:11</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>11.2</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>


    </q-list>
  </div>


</template>

<style scoped>

</style>