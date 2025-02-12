<template>
  <q-layout view="lHh Lpr lFf" class="h-screen">
    <q-header elevated class="">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <div class="h-14 w-full flex items-center">
          <a href="/#/">
            <q-toolbar-title class="font-bold">
              Página Inicial
            </q-toolbar-title>
          </a>
        </div>
      </q-toolbar>
      <div class="w-full h-screen bg-white fle">
        <DashboardComponent />
      </div>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <SidebarComponent />
    </q-drawer>
  </q-layout>
</template>

<script lang="js">
import { ref } from "vue";

import DashboardComponent from 'src/components/DashboardComponent.vue';
import SidebarComponent from 'src/components/SidebarComponent.vue';
export default {
    name: 'FormPage',
    components: {
        DashboardComponent,
        SidebarComponent
    },
    data() {
  return {
    leftDrawerOpen: ref(false),
  };
},
methods: {
  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
},
 };
</script>

<style></style>
