<template>
  <div>
    <form class="border p-2 bg-gray-100" @submit.prevent="onSubmit">
      <h2 class="size-21">
        <span class="align-middle">
          Se connecter
        </span>

        <i class="bi bi-box-arrow-in-right size-28 align-middle"></i>
      </h2>

      <p v-if="error" class="text-red-600 italic">
        * Ce compte n'existe pas
      </p>

      <input type="email" v-model="email" required placeholder="Email*" class="border block w-full my-5 p-2">
      <input type="password" v-model="mdp" required placeholder="Mot de passe*" class="border block w-full my-5 p-2">

      <input type="submit" value="Connexion" class="bg-green-700 hover:bg-green-800 text-white size-14 py-2 px-4 rounded cursor-pointer">
    </form>
  </div>
</template>

<script>
import { useCounterStore } from "../stores/counter.js";

export default {
  data(){
    return {
      store : useCounterStore(), 

      email : "",
      mdp : "",

      error : false
    }
  },

  methods : {
    onSubmit(){
      this.error = (this.email === "" && this.mdp === "");

      if ( ! this.error) {
        
        fetch(`http://localhost:3004/users/?` +  new URLSearchParams({
          email : this.email,
          mdp : this.mdp
        }))
        .then( reponse => reponse.json() )
        .then( data => {
          if (data[0]) {
            const user = data[0];

            // console.log(data);

            this.store.pseudo = user.pseudo ;
            this.store.user_image = user.user_image ;
            this.store.connected = true ;

            // this.$emit("loggedIn", user.pseudo, user.user_image)
            
            this.$router.push('/')
          }
        });
      }
    }
  }
}
</script>

<style>

</style>