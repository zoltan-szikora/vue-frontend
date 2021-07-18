<template>
<div>
  <div class="container">
    <div class="content">
      <div class="text-center">
        <h1 class="fw-bold">Vue CLI + Spring Boot</h1>
        <img alt="Vue logo" class="mx-auto" src="../assets/logo.png">
        <img alt="Spring Boot logo" class="mx-auto" src="../assets/sb-logo.png">
      </div>
    </div>
  </div>
  <the-footer />
</div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: 'Home',
  components: {
    TheFooter
  }
}
</script>
