<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="px-3">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3">
              <div class="grid grid-cols-12 gap-2 h-full">
                  <span class="col-span-2 flex justify-center items-center">
                    <RouterLink to="/" class="align-middle inline-block" title="Accueil">
                        <i class="bi bi-facebook size-36 text-sky-700"></i>
                    </RouterLink>
                  </span>

                  <span class="inline-block align-middle px-3 col-span-10 flex justify-center items-center">
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
                  </span>
              </div>
            </div>

            <div class="col-span-6">
              <div class="grid grid-cols-5 gap-2 text-center h-full icons-milieu">
                  <div>
                    <RouterLink to="/" @click="hasClass" title="Accueil" class="lien align-middle inline-block h-full w-full flex justify-center items-center">
                        <i class="bi bi-house-door size-28 text-sky-700"></i>
                        <i class="bi bi-house-door-fill size-28 text-sky-700"></i>
                    </RouterLink>
                  </div>
                  <div>
                    <RouterLink :to="{ name : 'demandes'}" @click="hasClass" title="Demandes d'amis" class="lien align-middle inline-block h-full w-full flex justify-center items-center">
                        <i class="bi bi-person-plus size-28 text-sky-700"></i>
                        <i class="bi bi-person-plus-fill size-28 text-sky-700"></i>
                    </RouterLink>
                  </div>
                  <div>
                    <RouterLink :to="{ name : 'videos'}" @click="hasClass" title="Videos" class="lien align-middle inline-block h-full w-full flex justify-center items-center">
                        <i class="bi bi-play-btn size-28 text-sky-700"></i>
                        <i class="bi bi-play-btn-fill size-28 text-sky-700"></i>
                    </RouterLink>
                  </div>
                  <div>
                    <RouterLink :to="{ name : 'marketplace'}" @click="hasClass" title="MarketPlace" class="lien align-middle inline-block h-full w-full flex justify-center items-center">
                        <i class="bi bi-cart size-28 text-sky-700"></i>
                        <i class="bi bi-cart-fill size-28 text-sky-700"></i>
                    </RouterLink>
                  </div>
                  <div>
                    <RouterLink :to="{ name : 'gaming'}" @click="hasClass" title="Gaming" class="lien align-middle inline-block h-full w-full flex justify-center items-center">
                        <i class="bi bi-grid-1x2 size-28 text-sky-700"></i>
                        <i class="bi bi-grid-1x2-fill size-28 text-sky-700"></i>
                    </RouterLink>
                  </div>
              </div>
            </div>

            <div class="col-span-3">
              <span class="my-2 inline-block w-full">
                  <div class="flex justify-end">
                    <span title="Mon profil">
                        <img v-if="image" :src="image"
                        class="h-12 rounded-full w-12 object-cover" alt="">
                        <i v-else class="bi bi-person-circle size-36"></i>
                    </span>

                    <span class="px-2 flex justify-center items-center">
                        {{ prenom }}
                    </span>
                  </div>
              </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      // iconsLink : document.querySelectorAll(".icons-milieu a")
      id : 1,
      nom : "",
      prenom : "",
      image : ""
    }
  },

  methods: {
    hasClass(e) {
      const iconsLink = this.$el.querySelectorAll('.icons-milieu a');

      iconsLink.forEach(element => {
        element.classList.remove("border-b", "border-solid", "border-b-4", "border-sky-700");
      });

      if (e) {
        // Si on vient de cliquer
        const tagName = e.target.tagName.toLowerCase();
        let target = null;
        let child = null;

        switch (tagName) {
          case "a":
            child = e.target.children[0];
            target = e.target;
            break;

          case "i":
            child = e.target;
            target = e.target.parentElement;
            break;
        
          default:
            break;
        }
        // console.log(child);
        target.classList.add("border-b", "border-solid", "border-b-4", "border-sky-700");
      }
      else{
        // Sans avoir cliquer, on regarde lequel est active et on lui met un border
        const active = this.$el.querySelector('.icons-milieu .router-link-active');
        active.classList.add("border-b", "border-solid", "border-b-4", "border-sky-700");
      }
    }
  },

  mounted(){
    setTimeout(() => {
      this.hasClass()
    }, 200);

    fetch("http://localhost:3004/users")
    .then(reponse => reponse.json())
    .then( data => {
      const user = data.filter(user => user.id === this.id)[0];
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.image = user.image;
    })
  }

}
</script>

<style>

</style>