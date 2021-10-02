

<template>
  <div class="app">
    <header-kino />
    <sidebar />
    <div class="main"><router-view></router-view></div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import HeaderKino from "@/components/HeaderKino";

export default {
  components: {
    Sidebar,
    HeaderKino,
  },
};
</script>

<style>
@import "~admin-lte/dist/css/adminlte.min.css";
.main {
  margin-left: 250px;
}
</style>