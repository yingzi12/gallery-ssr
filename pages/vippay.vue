<template>
  <div class="container">
    <h1>欢迎使用我们的服务</h1>
    <p>请选择您的支付方案：</p>
    <PayPalButton></PayPalButton>
  </div>
</template>

<script setup lang="ts">
import PayPalButton from './payPalButton.vue';
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>
