<template>
  <v-fade-transition mode="out-in">
    <UserItemEdit v-if="editMode"
    :data="userData"
    @cancel="editMode = false"
    @save="updateUser">
    </UserItemEdit>
    <v-card v-else-if="!!userData">
      <v-card-title class=" d-flex">
        <div class="flex-grow-1">
            {{userData.username}}
        </div>
        <v-btn color="primary"
        icon small
        @click="editMode = true">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="error"
        icon small
        @click="$emit('delete', userData.id)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div>
          <v-icon left small>mdi-email</v-icon>
          {{userData.email}}
        </div>
        <div v-if="address">
          <v-icon left small>mdi-map-marker</v-icon>
          {{address}}
        </div>
      </v-card-text>

    </v-card>
  </v-fade-transition>
</template>

<script lang="ts">
  import Vue from 'vue'
  import UserItemEdit from '@/components/UserItemEdit.vue'

  export default Vue.extend({
    name: 'UserItem',
    components: {
      UserItemEdit
    },
    props: {
      userData: {
        type: Object,
        required: true,
        default: null
      }
    },
    data: () => ({
      editMode: false
    }),
    computed: {
      address(){
        const addr = this.userData.address;
        let res = '';
        if(addr.city) res += addr.city+',';
        if(addr.street) res += addr.street+',';
        if(addr.suite) res += addr.suite;
        return res;
      }
    },
    methods: {
      updateUser(data){
        Object.assign(this.userData, data);
        this.editMode = false;
      },
      async deleteUser(){
        try{
          const res = await fetch('https://jsonplaceholder.typicode.com/users/'+this.userData.id, {
            method: 'DELETE',
          });
          if(res.ok){
            const data = await res.json();
            this.$emit('delete');
          }else{
            throw new Error(res.status+' '+res.statusText);
          }
        }catch(e){
          console.error(e);
        }
      }
    }
  })
</script>
