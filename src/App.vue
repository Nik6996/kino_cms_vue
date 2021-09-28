
<template>
  <div class="app">
    <header-kino />
    <sidebar />
    <banner-contents />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import HeaderKino from "@/components/HeaderKino";
import BannerContents from "./components/BannerContents.vue";

export default {
  components: {
    Sidebar,
    HeaderKino,
    BannerContents,
  },
};
</script>

<style >
@import "~admin-lte/dist/css/adminlte.min.css";
</style>
