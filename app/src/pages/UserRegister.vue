<template>
  <div
    class="flex flex-center items-center w-auto h-screen p-4 bg-cover bg-center"
    style="background-image: url('/img/bg-login-page.jpeg')"
  >
    <q-card class="w-[500px] h-auto p-2 max-md:w-screen" style="">
      <q-card-section>
        <div class="text-h6">Cadastro de usuário</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="name"
          label="Nome Completo"
          type="text"
          filled
          class="pb-2"
          required
        />
        <q-input
          v-model="email"
          label="Email"
          type="email"
          filled
          class="pb-2"
          required
        />
        <q-input
          v-model="password"
          label="Senha"
          type="password"
          filled
          required
        />
      </q-card-section>
      <q-card-section class="flex flex-col">
        <router-link to="/" class="flex flex-col">
          <a href="" class="pl-1">Voltar</a>
        </router-link>
      </q-card-section>
      <q-card-section>
        <RegisterBottom @click="userRegister" />
      </q-card-section>

      <q-card-section v-if="errorMessage">
        <q-banner type="negative">
          {{ errorMessage }}
        </q-banner>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="js">
import { api } from "boot/axios";
import RegisterBottom from "src/components/RegisterBottom.vue";

export default {
  name: "UserRegister",
  components: {
  RegisterBottom
  },
  data() {
    return {
    name: "",
    email: "",
    password: "",
    errorMessage: "",
    successMessage: "",
    };
  },
  methods: {
    async userRegister() {
        const response = await api.post("http://localhost:3000/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        if (response.data) {
            this.$router.push("/");
        } else {
          this.errorMessage = response.data.message || "Erro ao efetuar login";
        }
    },
  },
};
</script>
<style scoped>
a {
  color: #1976d2;
}
</style>
