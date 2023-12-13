<template>
<div>
  <div id="paypal-button-container" class="paypal-button-container"></div>
  <div id="checkout-form">
    <div id="card-name-field-container"></div>
    <div id="card-number-field-container"></div>
    <div id="card-expiry-field-container"></div>
    <div id="card-cvv-field-container"></div>
    <button id="card-field-submit-button" type="button">Pay now with Card Fields</button>
  </div>
</div>
</template>

<script setup>
import { onMounted } from 'vue';

const clientId = 'AWwAGKZhvPE3xSgDh-gRH9sXwNMKDQSzr65ZwaUHp-U7CTbUk-FTnRRjlF0zTpz5LaeDz5rHgcaaekVm'; // 替换为您的 PayPal Client ID
// const clientToken = ref(null); // 替换为您的 PayPal Client Token

//server/api/paypal/token.get.ts
// async function getToken() {
//   const response = await axios("/api/paypal/token", {
//     method: "get",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//
//   const data = await response.data;
//   clientToken.value=data.clientToken;
// }

onMounted(async () => {
  console.log("------------1-------------")
  // await getToken();  // 确保先获取 token
  await loadPayPalSDK();  // 等待 SDK 加载
  console.log("------------2-------------")
  loadStyleSheet();
  console.log("------------3-------------")
  initializePayPalButton();  // 初始化 PayPal 按钮
  console.log("------------4-------------")

});

function loadPayPalSDK() {
  console.log("------------loadPayPalSDK-------------")
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?components=buttons,card-fields&client-id=${clientId}`;
    // script.dataset.clientToken = clientToken.value;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
function initializePayPalButton() {
  console.log("------------initializePayPalButton-------------")
  if (window.paypal) {
    window.paypal.Buttons({
      createOrder: createOrderCallback,
      onApprove: (data) => onApproveCallback(data.orderID),
    }).render("#paypal-button-container");
    console.log("------------paypal-button-container-------------")
    const cardField = window.paypal.CardFields({
      createOrder: createOrderCallback,
      onApprove: onApproveCallback,
    });
    console.log("------------cardField-------------")
    console.log(cardField)
    console.log(cardField.isEligible())

// Render each field after checking for eligibility
    if (cardField.isEligible()) {
      console.log("------------cardField.isEligible()---1----------")

      const nameField = cardField.NameField();
      nameField.render("#card-name-field-container");

      const numberField = cardField.NumberField();
      numberField.render("#card-number-field-container");

      const cvvField = cardField.CVVField();
      cvvField.render("#card-cvv-field-container");

      const expiryField = cardField.ExpiryField();
      expiryField.render("#card-expiry-field-container");
      console.log("------------cardField.isEligible()- 2------------")

      // Add click listener to submit button and call the submit function on the CardField component
      document
          .getElementById("multi-card-field-button")
          .addEventListener("click", () => {
            cardField.submit().catch((error) => {
              resultMessage(
                  `Sorry, your transaction could not be processed...<br><br>${error}`,
              );
            });
          });
      console.log("------------cardField.isEligible()- 3-----------")
    } else {
      console.log("------------cardField.isEligible()-false ------------")
      // Hides card fields if the merchant isn't eligible
      document.querySelector("#card-form").style = "display: none";
    }
  }
}

function loadStyleSheet() {
  console.log("------------loadStyleSheet-------------")

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://www.paypalobjects.com/webstatic/en_US/developer/docs/css/cardfields.css';
  document.head.appendChild(link);
}
//Close 3Ds Dialog
async function createOrderCallback() {
  console.log("------------createOrderCallback-------------")

  try {
    const response = await axios.post("/api/paypal/orders", JSON.stringify({
      aid: 11111,
      amount: "10.1",
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;
    console.log(data.data)
    if (data.data.id) {
      return data.data.id;
    } else {
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
  }
}

async function onApproveCallback(data, actions) {
  console.log("------------onApproveCallback-------------")
  console.log(data)
  try {
    //server/api/paypal/ordersCapture.get.ts
    const response = await axios.get(`/api/paypal/ordersCapture?orderId=${data}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const orderData = await response.json();
    // Three cases to handle:
    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
    //   (2) Other non-recoverable errors -> Show a failure message
    //   (3) Successful transaction -> Show confirmation or thank you message

    const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
    const errorDetail = orderData?.details?.[0];

    // this actions.restart() behavior only applies to the Buttons component
    if (errorDetail?.issue === "INSTRUMENT_DECLINED" && !data.card && actions) {
      // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
      return actions.restart();
    } else if (
        errorDetail ||
        !transaction ||
        transaction.status === "DECLINED"
    ) {
      // (2) Other non-recoverable errors -> Show a failure message
      let errorMessage;
      if (transaction) {
        errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
      } else if (errorDetail) {
        errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
      } else {
        errorMessage = JSON.stringify(orderData);
      }

      throw new Error(errorMessage);
    } else {
      // (3) Successful transaction -> Show confirmation or thank you message
      // Or go to another URL:  actions.redirect('thank_you.html');
      resultMessage(
          `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
      );
      console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
      );
    }
  } catch (error) {
    console.error(error);
    resultMessage(
        `Sorry, your transaction could not be processed...<br><br>${error}`,
    );
  }
}


// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}
</script>

<style scoped>
/* 您的样式 */
.card_container {
  /* 样式定义 */
}
/* 其他样式 */
</style>
