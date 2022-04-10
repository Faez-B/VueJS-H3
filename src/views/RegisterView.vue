<template>
  <div>
    <form class="border p-2 bg-gray-100" @submit.prevent="onSubmit">
      <h2 class="size-21">
        <span class="align-middle">
          Créer un nouveau profil
        </span>

        <i class="bi bi-person-circle size-28 align-middle"></i>
      </h2>

      <input type="text" v-model="pseudo" placeholder="Pseudo" class="border block w-full my-5 p-2">
      <input type="email" v-model="email" placeholder="Email" class="border block w-full my-5 p-2">
      <input type="password" v-model="mdp" placeholder="Mot de passe" class="border block w-full my-5 p-2">
      <input type="password" v-model="confirm_mdp" placeholder="Confirmer le mot de passe" class="border block w-full my-5 p-2">
      <input type="text" v-model="image" placeholder="Url de votre image de profil" class="border block w-full my-5 p-2">

      <input type="submit" value="Créer un nouveau profil" class="bg-green-700 hover:bg-green-800 text-white size-14 py-2 px-4 rounded cursor-pointer">
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      pseudo : "",
      email : "",
      mdp : "",
      confirm_mdp : "",
      image : ""
    }
  },

  methods : {
    onSubmit(){
      
    }
  }
}
</script>

<style>

</style>