<template>
  <div class="container">
    <div class="left">
      <img src="https://www.aiavr.uk/frame.png" alt="二维码">
      <button @click="downloadQRCode">下载</button>
    </div>
    <div class="right">
      <img src="/path/to/beautiful-woman.jpg" alt="美女">
      <p>扫码下载</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    downloadQRCode() {
      // 实现下载二维码的逻辑
    }
  }
}
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left, .right {
  margin: 10px;
}

.left img, .right img {
  max-width: 100%;
  height: auto;
}
</style>
