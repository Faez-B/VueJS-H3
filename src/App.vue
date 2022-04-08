<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import BarreLaterale from '@/components/BarreLaterale.vue'
import Contacts from '@/components/Contacts.vue'
</script>

<template>
  <div>
    <header class="shadow">
      <Navbar />
    </header>

    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-2">
        <BarreLaterale />
      </div>
      <div class="col-span-7">
        <RouterView />
      </div>
      <div class="col-span-3">
        <Contacts />
      </div>
    </div>
  </div>
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

  methods: {
    
  },

  mounted(){
  
  }

}
</script>

<style>
.size-12 { font-size: 12px; }

.size-14 { font-size: 14px; }

.size-16 { font-size: 16px; }

.size-18 { font-size: 18px; }

.size-21 { font-size: 21px; }

.size-24 { font-size: 24px; }

.size-28 { font-size: 28px; }

.size-36 { font-size: 36px; }

.size-48 { font-size: 48px; }

.size-60 { font-size: 60px; }

.size-72 { font-size: 72px; }

.lien .bi-house-door-fill,
.lien .bi-person-plus-fill,
.lien .bi-play-btn-fill,
.lien .bi-grid-1x2-fill,
.lien .bi-cart-fill{
  display: none;
}

.lien.router-link-active .bi-house-door,
.lien.router-link-active .bi-person-plus,
.lien.router-link-active .bi-play-btn,
.lien.router-link-active .bi-grid-1x2,
.lien.router-link-active .bi-cart{
  display: none;
}

.router-link-active .bi-house-door-fill,
.router-link-active .bi-person-plus-fill,
.router-link-active .bi-play-btn-fill,
.router-link-active .bi-grid-1x2-fill,
.router-link-active .bi-cart-fill{
  display: inline-block;
}
</style>
