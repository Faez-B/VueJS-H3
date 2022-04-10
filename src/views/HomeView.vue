<template>
  <main>
    <div>
        <form @submit.prevent="onSubmit">
          <article class="my-2">
            <div class="border border-gray-400 p-4">
              <div class="flex items-center">
                <div class="w-full">
                  <h4 class="mb-3">
                    <span class="align-middle size-28">
                      Quoi de neuf ?
                    </span>
                    
                    <i class="bi bi-house-door size-24 align-middle"></i>
                  </h4>
                  <textarea :placeholder="'Laissez un nouveau post'" v-model="new_post_text" rows="5" class="bg-slate-200 px-3 py-1.5 w-full
                    border border-solid border-gray-300
                    rounded-3xl
                    focus:bg-white focus:border-blue-600 focus:outline-none
                    "></textarea>
                  <!-- <input type="text" v-model="new_post_text" :placeholder="'Quoi de neuf ' + prenom + ' ?'" class="bg-slate-200 px-3 py-1.5 w-full
                    border border-solid border-gray-300
                    rounded-3xl
                    focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                  /> -->
                </div>
              </div>

              <div class="mt-3">
                <input type="text" v-model="new_post_image" 
                :placeholder="'Entrez l\'url d\'une image en ligne'" 
                class="bg-slate-200 px-3 py-1.5 w-full
                    border border-solid border-gray-300
                    rounded-3xl
                    focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                />
              </div>

              <div class="mt-3 text-right">
                <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                  Laisser un nouveau post
                </button>
              </div>
            </div>
          </article>
        </form>
        
        <article v-for="(post, index) in posts" :key="index" class="my-2" >
          <div class="border border-gray-400">
            <div class="flex items-center px-3 py-2 bg-gray-100">
              <!-- {{ post.user_image }} -->
              <div class="text-sm">
                <p class="text-gray-900 font-medium size-21">{{ post.pseudo }}</p>
                <!-- <p class="text-gray-600">Aug 18</p> -->
              </div>
              <img v-if="post.user_image" class="w-10 h-10 rounded-full mx-4 object-cover" :src="post.user_image" alt="">
              <i v-else class="bi bi-person-circle size-36 mx-4"></i>
            </div>

            <div class="">
              <img v-if="post.image" :src="post.image" class="text-base italic text-gray-300 m-auto" alt="L'image n'a pas pu être récupérée">
              <p class="text-gray-700 text-base mx-2 my-3">{{ post.texte }}</p>
            </div>

            <div class="border border-top bg-gray-100 px-2 py-1 flex gap-5">
              <span v-if="post.commentaires">
                <span v-if="post.commentaires.length > 1">
                  <i class="bi bi-chat-left-dots align-middle"></i> 
                  <span class="align-middle mx-2 px-2 bg-green-700 text-white inline-block rounded">
                    {{ post.commentaires.length }}
                  </span>
                </span>
              </span>

              <span v-else>
                <i class="bi bi-chat-left-dots align-middle"></i> 
                <span class="align-middle mx-2 px-2 bg-green-700 text-white inline-block rounded">
                  {{ post.commentaires.length }}
                </span>
              </span>

              <span>
                <!-- Si l'utilisateur est connecté alors il peut liker les posts -->
                <i v-if="connected" class="bi bi-hand-thumbs-up size-18 align-middle cursor-pointer" @click="likePost(post)"></i> 
                <i v-else class="bi bi-hand-thumbs-up size-18 align-middle"></i> 

                <span class="align-middle mx-2 px-2 bg-blue-600 text-white inline-block rounded">
                  {{ post.likes }}
                </span>
              </span>
            </div>

            <h2 v-if="post.commentaires.length" class="p-2 size-21">
              Commentaires :
            </h2>

            <div v-for="(commentaire, indexCom) in post.commentaires" :key="indexCom" class="px-2 py-1 border border-top border-bottom">
                <div class="flex justify-between">
                  <span class="font-bold">
                    {{ commentaire.pseudo }}
                  </span>

                  <span class="text-gray-400 text-sm">
                    {{ commentaire.dt }}
                    le 27/03/2021 à 05h33
                  </span>
                </div>

                <p>
                  {{ commentaire.comment }}
                </p>
            </div>

            <form @submit.prevent="submitComment(post)">
              <div class="p-4">
                <div class="flex items-center">
                  <div class="w-full">
                    <textarea :placeholder="'Laissez un commentaire'" v-model="new_post_text" rows="3" class="bg-slate-200 px-3 py-1.5 w-full
                      border border-solid border-gray-300
                      focus:bg-white focus:border-blue-600 focus:outline-none
                      "></textarea>
                  </div>
                </div>

                <div class="mt-3">
                  <button type="submit" class="outline outline-1 outline-green-600 hover:bg-green-700 text-green-600 hover:text-white py-1 px-3 rounded text-sm">
                    Laisser un commentaire
                  </button>
                </div>
              </div>
            </form>
          </div>
        </article>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return {
      connected : false,

      // id : 1,
      nom : "",
      prenom : "",
      // image : "",

      posts : [],
      // users : [],

      new_post_text : "",
      new_post_image : ""
    }
  },

  methods : {
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

    submitComment(post){
      // const postCopy = {...post};

      // fetch(
      //   "http://localhost:3004/posts" , {
      //       method: "post", 
      //       headers : {"content-type": "application/json"} , 
      //       body : JSON.stringify(postCopy)
      //   }
      // )
      // .then(reponse => reponse.json())
      // .then(data => {
      //     // context.emit('add', data )
      //     this.new_post_text = "";
      //     this.new_post_image = "";
      // })
    },

    likePost(post){
      post.likes = post.likes + 1;

      fetch(
        "http://localhost:3004/posts/" + post.id , {
            method: "PATCH", 
            headers : {"content-type": "application/json"} , 
            body : JSON.stringify(post)
        }
      )
      .then(reponse => reponse.json())
      .then(data => {
        
      })
    }
  },

  mounted () {
    // fetch("http://localhost:3004/users")
    // .then(reponse => reponse.json())
    // .then( data => {
    //   // const user = data.filter(user => user.id === this.id)[0];
    //   // this.nom = user.nom;
    //   // this.prenom = user.prenom;
    //   // this.image = user.image;

    //   this.users = data;
    //   // console.log(this.users);

    // });

    fetch("http://localhost:3004/posts")
    .then( reponse => reponse.json() )
    .then( data => {
      // this.posts = ( data.filter( post => post.user === this.id ) )
      this.posts = data;
      // this.posts = 
    });

  }
}
</script>

<style scoped>

</style>