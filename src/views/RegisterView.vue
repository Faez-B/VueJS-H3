<template>
  <div>
    <form class="border p-2 bg-gray-100" @submit.prevent="onSubmit">
      <h2 class="size-21">
        <span class="align-middle">
          Créer un nouveau profil
        </span>

        <i class="bi bi-person-circle size-28 align-middle"></i>
      </h2>

      <p v-if="pseudoShort" class="text-red-600 italic">
        * Le pseudo doit avoir au moins 3 caractères
      </p>

      <p v-if="pseudoExists" class="text-red-600 italic">
        * Ce pseudo est déjà utilisé
      </p>

      <input type="text" v-model="pseudo" placeholder="Pseudo*" required autofocus="" class="border block w-full my-5 p-2">

      <p v-if="emailExists" class="text-red-600 italic">
        * Cette email est déjà utilisée
      </p>

      <input type="email" v-model="email" placeholder="Email*" required class="border block w-full my-5 p-2">
      
      <p v-if="mdpShort" class="text-red-600 italic">
        * Le mot de passe doit avoir au moins 6 caractères
      </p>

      <input type="password" v-model="mdp" placeholder="Mot de passe*" required class="border block w-full my-5 p-2">
      
      <p v-if="errorMdp" class="text-red-600 italic">
        * Les mots de passe ne correspondent pas
      </p>

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
      pseudo : "User test",
      email : "test@test.com",
      mdp : "Usertest",
      confirm_mdp : "Usertest",
      image : "",

      error : false,
      errorMdp : false, // comparaison mdp et confirmation mdp
      pseudoShort : false, // verification longueur pseudo
      mdpShort : false, // verification longueur mdp
      
      pseudoExists : false,
      emailExists : false,
      userExists : false
    }
  },

  methods : {
    onSubmit(){

      this.errorMdp = (this.mdp !== this.confirm_mdp);
      
      this.pseudoShort = (this.pseudo.length < 3);
      this.mdpShort = (this.mdp.length < 6);

      this.error = (this.errorMdp) && (this.pseudoShort) && (this.mdpShort) && (this.pseudo !== "" && this.email !== "" && this.mdp !== "");

      if (!this.error) { // Pas d'erreur

        // On vérifie si l'email existe
        fetch(`http://localhost:3004/users/?` +  new URLSearchParams({
          email : this.email
        }))
        .then( reponse => reponse.json() )
        .then( data => {
          this.emailExists = data.length > 0;
        });


        // On vérifie si le pseudo existe
        fetch(`http://localhost:3004/users/?` +  new URLSearchParams({
          pseudo : this.pseudo
        }))
        .then( reponse => reponse.json() )
        .then( data => {
          this.pseudoExists = data.length > 0;
        });



        // On utilise un time out car sinon les variables emailExists et pseudoExists restent à false
        setTimeout(() => {
          this.userExists = this.emailExists || this.pseudoExists;

          if (!this.userExists) {

            const user = {
              pseudo : this.pseudo,
              email : this.email,
              mdp : this.mdp,
              image : this.image,
            };
      
            fetch(
              "http://localhost:3004/users" , {
                  method: "post", 
                  headers : {"content-type": "application/json"} , 
                  body : JSON.stringify(user)
              }
            )
            .then(reponse => reponse.json())
            .then(() => {
              this.pseudo = "";
              this.email = "";
              this.mdp = "";
              this.confirm_mdp = "";
              this.image = "";
            })
          }
          
        }, 100)


      }
    }
  }
}
</script>

<style>

</style>