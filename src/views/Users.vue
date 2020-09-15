<template>
  <v-container fluid>
    <v-row
    justify="center"
    dense>
      <v-col class="d-flex align-center" cols="12">
        <v-text-field 
        v-model="searchQuery"
        placeholder="Search by username"
        dense
        single-line
        hide-details
        outlined>
        </v-text-field>
        <v-btn class="ml-1" color="primary"
        @click="search">
          Search
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-fade-transition mode='out-in'>
          <UserItemEdit v-if="createShow"
          create
          @cancel="createShow = false"
          @save="addUser">
          </UserItemEdit>
          <v-btn v-else
          block
          text
          color="primary"
          @click="createShow = true">
            Add user
          </v-btn>
        </v-fade-transition>
      </v-col>
      <v-col cols="12">
        <v-slide-y-transition group mode="out-in">
          <UserItem class="mb-2" v-for="(item, i) in usersData" :key="item.id" 
          :userData="item"
          @delete="deleteUser(i)"></UserItem>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapActions} from 'vuex';
  import UserItem from '@/components/UserItem.vue'
  import UserItemEdit from '@/components/UserItemEdit.vue'
  import {objToQuery} from '@/utils';

  export default Vue.extend({
    name: 'Users',
    components:{
      UserItem,
      UserItemEdit
    },
    data: () => ({
      searchQuery: '',
      usersData: [],
      error: null,
      createShow: false
    }),
    async beforeMount(){
      this.getUsers();
    },
    methods: {
      search(){
        this.getUsers({
          username: this.searchQuery
        })
      },
      async getUsers(filters?: object){
        let query = '';
        if(filters){
          query = objToQuery(filters);
        }
        try{
          const res = await fetch('https://jsonplaceholder.typicode.com/users/'+query);
          if(res.ok){
            this.usersData = await res.json();
          }else{
            throw new Error(res.status+' '+res.statusText);
          }
        }catch(e){
          this.error = e.message;
        }
      },
      addUser(data){
        this.usersData.unshift(data);
        this.createShow = false;
      },
      deleteUser(index){
        this.usersData.splice(index, 1);
      }
    }
  })
</script>
