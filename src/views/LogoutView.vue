<template>
  
</template>

<script>
import { useCounterStore } from "../stores/counter.js";

export default {
    data(){
        return {
            store : useCounterStore()
        }
    },

    mounted() {
        this.store.pseudo = "" ;
        this.store.user_image = "" ;
        this.store.connected = false ;

        this.$router.push('/')
    }
}
</script>

<style>

</style>