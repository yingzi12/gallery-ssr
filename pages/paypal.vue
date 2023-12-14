<script setup lang="ts">
import PayaplCard from './payaplCard.vue';
const amount=ref(1.0);
const title=ref("这是图集名称");
const intro=ref("这是简介，这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介");

</script>

<template>
  <PayaplCard :amount="amount.toString()" :aid="2" :kind="4" :intro="intro"/>
</template>

<style scoped>

</style>