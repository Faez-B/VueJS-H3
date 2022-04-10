<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="px-3">

          <div class="">
            <div class="h-full">
                <span class="">
                  <RouterLink to="/" class="align-middle inline-block size-28" title="Accueil">
                    <span class="align-middle">
                      MyNetWork
                    </span>
                    <i class="bi bi-facebook align-middle font-semibold"></i>
                  </RouterLink>
                </span>

                <!-- <span class="inline-block align-middle px-3 col-span-10 flex justify-center items-center">
                  <div class="flex justify-center">
                      <div class="xl:w-50">
                        <input
                            type="search"
                            class="
                            bg-slate-200
                            px-3
                            pl-10
                            py-1.5
                            border border-solid border-gray-300
                            rounded-3xl
                            focus:bg-white focus:border-blue-600 focus:outline-none
                            "
                            id="fbSearch"
                            placeholder="Recherche sur Facebook"
                        />
                      </div>
                  </div>
                </span> -->
            </div>
          </div>

    </div>
</template>

<script>
export default {
  data(){
    return {
      // id : 1,
      // nom : "",
      // prenom : "",
      // image : ""
    }
  },

  methods: {

  },

  mounted(){

    // fetch("http://localhost:3004/users")
    // .then(reponse => reponse.json())
    // .then( data => {
    //   const user = data.filter(user => user.id === this.id)[0];
    //   this.nom = user.nom;
    //   this.prenom = user.prenom;
    //   this.image = user.image;
    // })

  }

}
</script>

<style scoped>
  .bi-facebook::before{
    transform: scaleX(-1);
  }
</style>