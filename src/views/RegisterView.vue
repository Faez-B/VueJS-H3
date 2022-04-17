<template>
  <div>
    <form class="border p-2 bg-gray-100" @submit.prevent="onSubmit">
      <h2 class="size-21">
        <span class="align-middle">
          Créer un nouveau profil
        </span>

        <i class="bi bi-person-circle size-28 align-middle"></i>
      </h2>

      <p v-if="userCreated" class="text-green-600 italic">
        <span class="mr-2 align-middle">
          Votre compte est créer, vous allez être rediriger vers la page de connexion
        </span>

        <svg role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </p>

      <p v-if="pseudoShort" class="text-red-600 italic">
        * Le pseudo doit avoir au moins 3 caractères
      </p>

      <p v-if="pseudoExists" class="text-red-600 italic">
        * Ce pseudo est déjà utilisé
      </p>

      <input type="text" v-model="pseudo" placeholder="Pseudo*" required autofocus="" class="border block w-full my-5 p-2">

      <p v-if="! isEmailValid " class="text-red-600 italic">
        * L'email n'est pas valide
      </p>

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
      pseudo : "",
      email : "",
      mdp : "",
      confirm_mdp : "",
      image : "",

      error : false,
      errorMdp : false, // comparaison mdp et confirmation mdp
      pseudoShort : false, // verification longueur pseudo
      mdpShort : false, // verification longueur mdp
      
      pseudoExists : false,
      emailExists : false,
      userExists : false,

      userCreated : false,

      isEmailValid : true,

    }
  },

  methods : {
    // Verifier si le champ email est bien de la forme d'un email 
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    onSubmit(){

      this.errorMdp = (this.mdp !== this.confirm_mdp);
      
      this.pseudoShort = (this.pseudo.length < 3);
      this.mdpShort = (this.mdp.length < 6);

      this.error =  (this.pseudo !== "" && this.email !== "" && this.mdp !== "") && // On vérifie que les champs ne sont pas vides...
                    (this.pseudoShort) && // et que le pseudo n'est pas trop court...
                    (this.mdpShort) && // et que le mdp n'est pas trop court...
                    (this.errorMdp) && // et que les deux mdp correspondent...
                    (this.validEmail(this.email)); // et que l'email est valide

      if (!this.error) { // Si pas d'erreur

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
          this.isEmailValid = (this.validEmail(this.email));

          if (!this.userExists && this.isEmailValid) {

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

              this.userCreated = true;
            
              setTimeout( () => {
                this.$router.push('/login')
              }, 2000)
            })


          }
          
        }, 100)


      }
    }
  }
}
</script>