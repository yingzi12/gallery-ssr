<script lang="ts" setup>
function factoryFn(files) {
  return {
    url: 'http://localhost:4444/upload',
    method: 'POST'
  }
}
</script>

<template>
  <div class="q-pa-md">
    <q-uploader
        :factory="factoryFn"
        multiple
        style="max-width: 300px"
    />
  </div>
</template>


<style scoped>

</style>