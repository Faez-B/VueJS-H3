<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import BarreLaterale from '@/components/BarreLaterale.vue'
// import IconCommunity from '@/components/icons/IconCommunity.vue'
// import IconDocumentation from '@/components/icons/IconDocumentation.vue'
// import IconEcosystem from '@/components/icons/IconEcosystem.vue'
// import IconSupport from '@/components/icons/IconSupport.vue'
// import IconTooling from '@/components/icons/IconTooling.vue'

</script>

<template>
  <div>
    <header class="shadow">
      <Navbar />
    </header>

    <div class="grid grid-cols-12 gap-2 py-3">
      <div class="col-span-3">
        <BarreLaterale />
      </div>
      <div class="col-span-8">
        <RouterView />
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

.lien .bi-house-door-fill
{
  display: none;
}

.lien.router-link-active .bi-house-door
{
  display: none;
}

.router-link-active .bi-house-door-fill
{
  display: inline-block;
}
</style>
