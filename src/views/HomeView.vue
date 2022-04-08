<script setup>
// import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div>
        <!-- <pre>{{ posts }}</pre> -->

        <form @submit.prevent="onSubmit">
          <article class="my-2">
            <div class="border border-gray-400 p-4">
              <div class="flex items-center">
                <img v-if="image" class="w-10 h-10 rounded-full mr-4 object-cover" :src="image" alt="">
                <i v-else class="bi bi-person-circle size-36 mr-4"></i>
                <div class="w-full">
                  <input type="text" v-model="new_post_text" :placeholder="'Quoi de neuf ' + prenom + ' ?'" class="bg-slate-200 px-3 py-1.5 w-full
                    border border-solid border-gray-300
                    rounded-3xl
                    focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                  />
                </div>
              </div>

              <div class="mt-3">
                <p class="italic text-gray-400 pb-1">
                  Veuillez soit entrer une url d'image ou sélectionnez une image dans le dossier public/ en cliquant sur le bouton (inspecter la page pour voir en dessous de ce message quelles images sont présentes dans le dossier)
                </p>
                <p class="italic text-gray-400 pb-1 hidden">
                  public/favicon.ico => favicon vueJS  
                </p>
                <p class="italic text-gray-400 pb-1 hidden">
                  public/tardis.jpeg => https://images.unsplash.com/photo-1597072653367-2c8bee60d86f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80
                </p>
                <input type="text" v-model="new_post_image" 
                :placeholder="'Entrez un url pour une image en ligne'" 
                class="bg-slate-200 px-3 py-1.5 w-full
                    border border-solid border-gray-300
                    rounded-3xl
                    focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                />

                <span @click="add_image" class="inline-block cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded my-2">
                  Ajouter une image
                </span>

                <input type="file" id="new_post_image" class="hidden" @change="onChange">
              </div>

              <div class="mt-3 text-right">
                <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                  Publier
                </button>
              </div>
            </div>
          </article>
        </form>
        
        <article v-for="(post, index) in posts" :key="index" class="my-2">
          
          <div class="border border-gray-400 p-4">
            <div class="flex items-center">
              <img v-if="image" class="w-10 h-10 rounded-full mr-4 object-cover" :src="image" alt="">
              <i v-else class="bi bi-person-circle size-36 mr-4"></i>
              <div class="text-sm">
                <p class="text-gray-900 leading-none">{{ prenom }} {{ nom }}</p>
                <!-- <p class="text-gray-600">Aug 18</p> -->
              </div>
            </div>

            <div class="my-3">
              <p class="text-gray-700 text-base">{{ post.texte }}</p>
              <img v-if="post.image" :src="post.image" class="mt-2 text-base italic text-gray-300" alt="L'image n'a pas pu être récupérée">
            </div>

            <div class="flex justify-between">
              <span>
                <i class="bi bi-hand-thumbs-up-fill text-sky-700 size-18"></i> {{ post.likes }}
              </span>

              <span v-if="post.commentaires">
                <span v-if="post.commentaires.length > 1">
                  {{ post.commentaires.length }} commentaires
                </span>

                <span v-else>
                  {{ post.commentaires.length }} commentaire
                </span>
              </span>
            </div>
          </div>


        </article>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return {
      id : 1,
      nom : "",
      prenom : "",
      image : "",
      abonnements : [],
      amis : [],

      posts : [],
      posts_user : [],
      posts_amis : [],
      posts_abonnements : [],

      new_post_text : "",
      new_post_image : ""
    }
  },

  methods : {
    // set posts (posts){
    //   this.posts = posts;
    // }

    onChange(e) {
      if ( ! this.new_post_image ) { // Si on n'a pas entré d'url => on prend le fichier qui a été sélectionné
        const array = e.target.value.split("\\");
        const nom_fichier = array[array.length - 1];
        // console.log(array[array.length - 1]);
        this.new_post_image = `/${nom_fichier}`;

        // console.log(this.new_post_image);
      }
    },

    onSubmit() {
      const post = { 
        user : this.id,
        texte : this.new_post_text,
        image : this.new_post_image,
        likes : 0
      }

      fetch(
        "http://localhost:3004/posts" , {
            method: "post", 
            headers : {"content-type": "application/json"} , 
            body : JSON.stringify(post)
        }
      )
      .then(reponse => reponse.json())
      .then(data => {
          // context.emit('add', data )
          this.new_post_text = "";
          this.new_post_image = "";
      })
    },

    add_image(){
      document.getElementById('new_post_image').click()
    }
  },

  mounted () {
    fetch("http://localhost:3004/users")
    .then(reponse => reponse.json())
    .then( data => {
      const user = data.filter(user => user.id === this.id)[0];
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.image = user.image;
      this.abonnements = user.abonnements;
      this.amis = user.amis;

      // this.posts = user.posts;
    });

    fetch("http://localhost:3004/posts")
    .then( reponse => reponse.json() )
    .then( data => {
      this.posts_user = ( data.filter( post => post.user === this.id ) )
      this.posts = this.posts_user;
    });

    // this.abonnements.forEach(element => {
    //   fetch("http://localhost:3004/posts")
    //   .then( reponse => reponse.json() )
    //   .then( data => {
    //     this.posts_abonnements = (data.filter( post => post.user === element ));
    //   });
    // });

    // fetch("http://localhost:3004/commentaires")
    // .then( reponse => reponse.json() )
    // .then( data => {
    //   this.posts_user = ( data.filter( post => post.user === this.id ) )
    //   this.posts = this.posts_user;
    // });
  }
}
</script>

<style scoped>

</style>