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

      <p v-if="! isEmailValid " class="text-red-600 italic">
        * L'email n'est pas valide
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

      isEmailValid : true,

      email : "",
      mdp : "",

      error : false
    }
  },

  methods : {
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    onSubmit(){
      this.isEmailValid = (this.validEmail(this.email));

      this.error = (this.email === "" && this.mdp === "") && (this.validEmail(this.email));

      if ( ! this.error) {
        
        fetch(`http://localhost:3004/users/?` +  new URLSearchParams({
          email : this.email,
          mdp : this.mdp
        }))
        .then( reponse => reponse.json() )
        .then( data => {
          if (data[0]) {
            const user = data[0];

            this.store.pseudo = user.pseudo ;
            this.store.user_image = user.image ;
            this.store.connected = true ;

            this.$router.push('/')
          }

          else{
            this.error = true;
          }
        });
      }
    }
  }
}
</script>