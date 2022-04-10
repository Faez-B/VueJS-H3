<template>
    <main class="px-3">

        <div class="border">
            <RouterLink :to="{ name : 'home'}" title="Accueil" class="align-middle inline-block h-full w-full px-2">
                <!-- <i class="bi bi-person-plus size-28 text-sky-700"></i> -->
                <i class="bi bi-house-door size-28 text-sky-700 align-middle"></i>
                <span class="align-middle">
                    Fil d'actualités
                </span>
            </RouterLink>
        </div>

        <div class="border">
            <RouterLink :to="{ name : 'register'}" title="Créer un compte" class="align-middle inline-block h-full w-full px-2">
                <!-- <i class="bi bi-person-plus size-28 text-sky-700"></i> -->
                <i class="bi bi-person-circle size-28 text-sky-700 align-middle"></i>
                <span class="align-middle">
                    Créer un compte
                </span>
            </RouterLink>
        </div>

        <div class="border">
            <RouterLink :to="{ name : 'login'}" title="Se connecter" class="align-middle inline-block h-full w-full px-2">
                <!-- <i class="bi bi-person-plus size-28 text-sky-700"></i> -->
                <i class="bi bi-box-arrow-in-right size-28 text-sky-700 align-middle"></i>
                <span class="align-middle">
                    Se connecter
                </span>
            </RouterLink>
        </div>

        <div class="border">
            <RouterLink :to="{ name : 'logout'}" title="Se connecter" class="align-middle inline-block h-full w-full px-2">
                <i class="bi bi-door-closed-fill size-28 text-sky-700 align-middle"></i>
                <span class="align-middle">
                    Déconnexion
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
