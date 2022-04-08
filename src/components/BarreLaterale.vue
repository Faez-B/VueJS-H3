<template>
    <main class="px-3">
        <div class="my-2 inline-block">
            <span class="flex justify-end">
                <span title="Mon profil">
                    <img v-if="image" :src="image"
                    class="h-12 rounded-full w-12 object-cover" alt="">
                    <i v-else class="bi bi-person-circle size-36"></i>
                </span>

                <span class="px-2 flex justify-center items-center">
                    {{ prenom }}
                    {{ nom }}
                </span>
            </span>
        </div>
        <div>
            <RouterLink :to="{ name : 'demandes'}" title="Demandes d'amis" class="align-middle inline-block h-full w-full px-2">
                <!-- <i class="bi bi-person-plus size-28 text-sky-700"></i> -->
                <i class="bi bi-person-plus-fill size-28 text-sky-700 align-middle"></i>
                <span class="align-middle">
                    Amis
                </span>
            </RouterLink>
        </div>

        <div>
            <RouterLink :to="{ name : 'marketplace'}" title="MarketPlace" class="align-middle inline-block h-full w-full px-2">
                <!-- <i class="bi bi-cart size-28 text-sky-700"></i> -->
                <i class="bi bi-cart-fill size-28 text-sky-700 align-middle"></i>
                <span class="align-middle">
                    Marketplace
                </span>
            </RouterLink>
        </div>

        <div>
            <RouterLink :to="{ name : 'videos'}" title="Videos" class="align-middle inline-block h-full w-full px-2">
                <!-- <i class="bi bi-play-btn size-28 text-sky-700"></i> -->
                <i class="bi bi-play-btn-fill size-28 text-sky-700 align-middle"></i>
                <span class="align-middle">
                    Videos
                </span>
            </RouterLink>
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
            image : ""
        }
    },

    mounted(){
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

<style scoped>
    .router-link-active{
        background-color: rgba(3, 105, 161, 0.3);
    }
</style>>
