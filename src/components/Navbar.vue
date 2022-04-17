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
            </div>
          </div>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .bi-facebook::before{
    transform: scaleX(-1);
  }
</style>