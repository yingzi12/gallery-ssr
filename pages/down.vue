<template>
<!--  <div class="container">-->
<!--    <div class="left">-->
<!--      <img src="https://www.aiavr.uk/frame.png" alt="二维码">-->
<!--      <button @click="downloadQRCode">下载</button>-->
<!--    </div>-->
<!--    <div class="right">-->
<!--      <img src="/path/to/beautiful-woman.jpg" alt="美女">-->
<!--      <p>扫码下载</p>-->
<!--    </div>-->
<!--  </div>-->
  <div class="yw-page yw-page-app">
    <div class="yw-header jsHeader">
      <div class="yw-constr app-constr">
        <div class="yw-hd-slide-x">
          <div class="yw-hd-slide-con app-yhsc">
            <h2 class="yw-hd-slide-h app-yhsh yw-font">海量图片</h2>
            <p class="yw-hd-slide-p app-yhsp">美女写真汇集，各种类型的美女写真图片</p>
            <p class="yw-hd-slide-p app-yhsp">电脑站、手机站、app，多种终端无广告</p>
            <div class="yw-hd-app-dld">
              <a href="https://www.aiavr.uk/Album-Gallery-1.0.0.apk" class="yw-hd-app-btn" target="_blank"><i class="icon-android"></i>安卓版下载</a>
              <div class="qr-box" onmouseover="this.className='qr-box cur'" onmouseout="this.className='qr-box'">
<!--                <div class="load-qr-pic qr-qd-pic jsPicQr">-->
<!--                  <img src="https://www.51xs.uk/core/qrcode.php?string=https://www.51xs.uk/app/?my=down">-->
<!--                </div>-->
                <a class="qq-qr-icon jsLoadQr"><i class="icon-qr"></i></a>
              </div>
            </div>
            <div class="yw-app-mb-pic"><img style="width: 400px" src="/frame.png" class="yw-app-mb"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
