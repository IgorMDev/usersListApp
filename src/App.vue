<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center"
        dense>
          <v-col cols="12" sm="9" md="7" lg="5">
            <Users/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Users from '@/views/Users.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Users,
  },

  data: () => ({
    //
  }),
});
</script>

<style lang="scss">

</style>