<template>
  <div>
    <navbar />
    <router-view class="content"/>
    <the-copyright />
  </div>
</template>

<script>
import Navbar from "@/components/TheNavbar.vue";
import TheCopyright from '@/components/TheCopyright.vue';

export default {
  components: {
    Navbar,
    TheCopyright
  }
};
</script>
