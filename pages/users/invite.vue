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
          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">待确定奖励 : 0</q-item-label>
          </q-item-section>
          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">已返奖励 : 0</q-item-label>
          </q-item-section>
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