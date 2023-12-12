<template>
  <div id="paypal-button-container"></div>
</template>

<script lang="ts" setup>
import {loadScript} from "@paypal/paypal-js";
import {defineProps, onMounted, ref} from 'vue';

// 定义接收的 props
const props = defineProps({
  amount: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  transactionDescription: {
    type: String,
    default: ''
  }
});

const paypalRef = ref(null);

onMounted(async () => {
  try {
    const userLang = navigator.language || navigator.userLanguage;
    console.log(userLang)
    const clientId = "AWwAGKZhvPE3xSgDh-gRH9sXwNMKDQSzr65ZwaUHp-U7CTbUk-FTnRRjlF0zTpz5LaeDz5rHgcaaekVm";
    paypalRef.value = await loadScript({
      "client-id": clientId,
      // "Locale": userLang // 使用用户的语言和地区设置
    });
    if (paypalRef.value) {
      setupPayPalButton(props.amount, props.transactionId, props.transactionDescription);
    } else {
      console.error("PayPal SDK not loaded");
    }
  } catch (error) {
    console.error("Failed to load the PayPal JS SDK script", error);
  }
});

function setupPayPalButton(amount, transactionId, transactionDescription) {
  paypalRef.value.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        intent: "CAPTURE",
        purchase_units: [{
          reference_id: transactionId,
          description: transactionDescription,
          amount: {
            "currency_code": "USD",
            value: amount // 设置交易金额
          }
        }],
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(function (details) {
        alert("Payment Successful! Thank you for your purchase, " + details.payer.name.given_name);
      });
    },
    onError: (err) => {
      console.error(err);
      alert("An error occurred with your payment");
    }
  }).render("#paypal-button-container");
}
</script>

<style>
/* CSS 样式 */
</style>
