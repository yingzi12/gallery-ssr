<script setup>
useSeoMeta({
  title: "The about page",
});
</script>

<template>
  <h1>About Us</h1>

  <p class="text-center">
    <span cla ss="font-semibold">Top Web Frameworks</span> lists the top
    frameworks for web development based on their GitHub stars count.
  </p>

  <p class="text-center">
    Feel free to contribute to the list by
    <nuxt-link to="/add-new" title="Redirect to add new page"
      >making a new submission.</nuxt-link
    >
  </p>
    <div class="row">
        <div class="col-2"> </div>
        <div class="col-auto" style="margin: 0px">
            <div class="footter" style="margin: 0px;text-align: center;">
                <router-link to="">关于图集</router-link>|
                <router-link to="">联系我们</router-link>|
                <router-link to="">帮助中心</router-link>|
                <router-link to="">提交建议</router-link>|
                <router-link to="">举报中心</router-link>|
                <router-link to="">漏洞提交</router-link>|
            </div>
            <div class="footerText text-weight-thin"> <p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
            <div class="footerText text-weight-thin"><p>图片,美女,写真,图集</p></div>
            <div class="footerText text-weight-light"><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
            <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
        </div>
        <div class="col-2"></div>
    </div>
</template>
