<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
    <button @click="playOrPause">{{ isPlaying ? '暂停' : '播放' }}</button>
    <input type="range" min="0" max="1" step="0.1" v-model="volume" />
  </div>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      controls: true,
      poster: "",
      preload: 'auto',
      src: "",
      width: 500
    }),
  },
});

const videoPlayer = ref(null);
const isPlaying = ref(false);
const volume = ref(1);

onMounted(() => {
  videoPlayer.value = videojs(videoPlayer.value, props.options, () => {
    videoPlayer.value.log('onPlayerReady', this);

    var vhs = videoPlayer.value.tech().vhs;

    videoPlayer.value.tech().vhs.xhr.onRequest(playerRequestHook);
  });
});
// player.on('xhr-hooks-ready', () => {
//   const playerXhrRequestHook = (options) => {
//     options.beforeSend = (xhr) => {
//       xhr.setRequestHeader('foo', 'bar');
//     };
//     return options;
//   };
//   player.tech().vhs.xhr.onRequest(playerXhrRequestHook);
// });
const playerRequestHook = (options: any) => {
  // options.beforeSend = (xhr) => {
  // Referer不能修改，会报错
  //   xhr.setRequestHeader('Referer', "https://missav.com/");
  // };
  // options.uri=options.uri.replace('worker-daili.xun335610.workers.dev', 'cdn152.akamai-content-network.com');
  return options;
};
// onMounted(() => {
//
// });
onBeforeUnmount(() => {
  if (videoPlayer.value) {
    videoPlayer.value.dispose();
  }
});

const playOrPause = () => {
  if (videoPlayer.value) {
    if (isPlaying.value) {
      videoPlayer.value.pause();
    } else {
      videoPlayer.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

watch(volume, (newVolume) => {
  if (videoPlayer.value) {
    videoPlayer.value.volume(newVolume);
  }
});
</script>
