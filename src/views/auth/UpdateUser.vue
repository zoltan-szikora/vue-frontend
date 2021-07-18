<template>
  <div>
    <update-user-data v-bind:user="user"></update-user-data>
  </div>
</template>

<script>
import vuex from "vuex";
import UpdateUserData from "@/components/UpdateUserData";

export default {
  components: {
    UpdateUserData
  },
  computed: {
    ...vuex.mapGetters(["user"])
  },
}
</script>

<style>

</style>
