<template>
  <q-list class="">
    <div class="flex bg-primary w-full h-14 items-center">
      <q-item-label class="text-lg font-bold text-white w-full pl-4">
        SIDEBAR</q-item-label
      >
    </div>
    <EssentialLink
      class="flex items-center"
      v-for="link in linksList"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
</template>

<script lang="js">
import EssentialLink from "components/EssentialLink.vue";

export default {
name: "SidebarComponent",
components: {
    EssentialLink,
},
data() {
    return {
        linksList: [
    {
  title: "Dashboard",
  icon: "dashboard",
  link: "/#/home",
},
{
  title: "Formulário",
  icon: "edit",
  link: "/#/formulario",
},
    ]
    }
},

methods: {

}
}
</script>
