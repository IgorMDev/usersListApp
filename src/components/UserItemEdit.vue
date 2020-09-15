<template>
  <v-card>
    <v-card-title>
      {{create ? 'Create user' : 'Edit user'}}
    </v-card-title>
    <v-card-text>
    <v-form
    v-model="isValid">
      <v-text-field
      v-model="userData.username"
      :rules="[requiredRule]"
      label="Username">
      </v-text-field>
      <v-text-field
      v-model="userData.email"
      :rules="[requiredRule, emailRule]"
      label="Email"
      type="email">
      </v-text-field>
      <v-text-field
      v-model="userData.address.city"
      label="City">
      </v-text-field>
      <v-text-field
      v-model="userData.address.street"
      label="Street">
      </v-text-field>
      <v-text-field
      v-model="userData.address.suite"
      label="Suite">
      </v-text-field>
    </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-end align-center">
      <v-btn class="mr-2"
      color="error"
      @click="cancel">
        Cancel
      </v-btn>
      <v-btn 
      color="primary"
      :disabled="!isValid"
      @click="save">
        {{create ? 'Create' : 'Save'}}
      </v-btn>
    </v-card-actions>
    <div class="px-2 py-1">
      <v-alert v-if="error"
      dense
      type="error">
        {{error}}
      </v-alert>
    </div>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'UserItemEdit',
    props: {
      create: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: null
      }
    },
    data: () => ({
      isValid: false,
      error: null,
      userData: {
        username: '',
        email: '',
        address: {
          city: '',
          street: '',
          suite: '',
        }
      },
      requiredRule: v => !!v || 'Required',
      emailRule: v => /\S+@\S+\.\S+/.test(v) || 'Uncorrect email value'
    }),
    created(){
      if(this.data){
        const copyData = JSON.parse(JSON.stringify(this.data))
        Object.assign(this.userData, copyData);
      }
    },
    methods: {
      async save(){
        try{
          const res = await this.fetchUserEdit(this.userData, this.create);
          if(res.ok){
            const data = await res.json();
            this.$emit('save', data);
          }else{
            throw new Error(res.status+' '+res.statusText);
          }
        }catch(e){
          this.error = e.message;
        }
      },
      cancel(){
        this.$emit('cancel');
      },
      async fetchUserEdit(data, create = false){
        return fetch('https://jsonplaceholder.typicode.com/users/'+(!create && data.id ? data.id : ''), {
          method: create ? 'POST' : 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        });
      }
    }
  })
</script>
