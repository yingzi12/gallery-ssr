<template>
    <q-layout view="hhh LpR fff" style="height: 100vh;">
    <div>
        <q-header class="bg-primary text-black" height-hint="98" >
            <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
                <q-toolbar-title>
                    <q-avatar>
                        <img src="/icon.png">
                    </q-avatar>
                    图集网
                </q-toolbar-title>

                <q-space />

            </q-toolbar>
            <q-tabs align="left">
                <q-route-tab to="/" label="首页" />
                <q-route-tab to="/see" label="最热" />
                <q-route-tab to="/findImage" label="寻找图片" />
              <q-route-tab to="/usersAlbum" label="用户图集" />
              <q-route-tab to="/usersIndex" label="用户推荐" />
              <q-route-tab to="/users" label="用户中心" />
              <q-route-tab to="/down" label="下载App" />
            </q-tabs>
        </q-header>
        <div>
            <q-page-container style="height: 100%;">
        <slot />
            </q-page-container>
        </div>
    </div>
    </q-layout>
</template>

<script setup>
</script>

<style scoped>

</style>
