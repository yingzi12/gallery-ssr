<script setup lang="ts">
const  drawer= ref(false);
const link= ref('detail')

</script>

<template>
  <div class="q-pa-md" style="height: 100vh;">
    <q-layout view="lHh Lpr lff" container class="shadow-2 rounded-borders">
    <q-header elevated class="bg-cyan-8">
        <q-toolbar>
<!--          <q-toolbar-title>Header</q-toolbar-title>-->
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
          v-model="drawer"
          show-if-above
          :width="200"
          :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item  to="/users/detail"
                clickable
                v-ripple
                :active="link === 'detail'"
                @click="link = 'detail'"
                active-class="my-menu-link"
              >
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                个人信息
              </q-item-section>
            </q-item>

            <q-item  to="/users/attention"
                clickable
                v-ripple
                :active="link === 'attention'"
                @click="link = 'attention'"
                active-class="my-menu-link"
              >
              <q-item-section avatar>
                <q-icon name="attention" />
              </q-item-section>

              <q-item-section>
                我的关注
              </q-item-section>
            </q-item>
            <q-item to="/users/collection"
                clickable
                v-ripple
                :active="link === 'collection'"
                @click="link = 'collection'"
                active-class="my-menu-link"
              >
              <q-item-section avatar>
                <q-icon name="collection" />
              </q-item-section>

              <q-item-section>
                我的收藏
              </q-item-section>
            </q-item>
            <q-separator  />
            <q-item to="/users/buy"
                clickable
                v-ripple
                :active="link === 'buy'"
                @click="link = 'buy'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="buy" />
              </q-item-section>
              <q-item-section>
                我的购买
              </q-item-section>
            </q-item>
            <q-separator  />
            <q-item to="/users/album"
                clickable
                v-ripple
                :active="link === 'album'"
                @click="link = 'album'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="album" />
              </q-item-section>
              <q-item-section>
                我的图集
              </q-item-section>
            </q-item>
            <q-item to="/users/vip"
                clickable
                v-ripple
                :active="link === 'vip'"
                @click="link = 'vip'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="vip" />
              </q-item-section>
              <q-item-section>
                VIP设置
              </q-item-section>
            </q-item>
            <q-item to="/users/sell"
                clickable
                v-ripple
                :active="link === 'sell'"
                @click="link = 'sell'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="buy" />
              </q-item-section>
              <q-item-section>
                用户购买
              </q-item-section>
            </q-item>
            <q-item to="/users/withdraw"
                clickable
                v-ripple
                :active="link === 'withdraw'"
                @click="link = 'withdraw'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="withdraw" />
              </q-item-section>
              <q-item-section>
                我的提现
              </q-item-section>
            </q-item>
            <q-separator  />
            <q-item to="/users/invite"
                clickable
                v-ripple
                :active="link === 'invite'"
                @click="link = 'invite'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>
              <q-item-section>
                我的邀请
              </q-item-section>
            </q-item>
            <q-item to="/users/password"
                clickable
                v-ripple
                :active="link === 'password'"
                @click="link = 'password'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                重置密码
              </q-item-section>
            </q-item>
            <q-item
                clickable
                v-ripple
                :active="link === 'drafts'"
                @click="link = 'drafts'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                退出
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <NuxtPage :page-key="route => route.fullPath" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
  <div class="row">
    <div class="col-2"> </div>
    <div class="col-auto" style="margin: 0px">
      <div class="footter" style="margin: 0px;text-align: center;">
        <router-link to="">关于图集</router-link>|
        <router-link to="">联系我们</router-link>|
        <router-link to="">帮助中心</router-link>|
        <router-link to="">提交建议</router-link>|
        <router-link to="">举报中心</router-link>|
        <router-link to="/privacyPolicy">隐私政策</router-link>|
        <router-link to="/use">使用条款</router-link>|
        <router-link to="">漏洞提交</router-link>|
      </div>
      <div class="footerText text-weight-thin"> <p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有 心世界未来科技有限公司</p></div>
      <div class="footerText text-weight-thin"><p>图片,美女,写真,图集</p></div>
      <div class="footerText text-weight-light"><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
      <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
    </div>
    <div class="col-2"></div>
  </div>

</template>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>