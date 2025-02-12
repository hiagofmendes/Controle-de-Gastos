<template>
  <div
    class="flex flex-center items-center w-auto h-screen bg-cover bg-center"
    style="background-image: url('/img/bg-login-page.jpeg')"
  >
    <q-card class="w-[500px] h-auto p-2 max-md:w-screen">
      <q-card-section>
        <div class="text-h6">LOGIN</div>
      </q-card-section>

      <q-card-section>
        <q-form>
          <q-input
            v-model="email"
            label="Email"
            type="email"
            class="pb-2"
            filled
            required
            autocomplete="email"
          />
          <q-input
            v-model="password"
            label="Senha"
            type="password"
            filled
            required
            autocomplete="current-password"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="flex flex-col">
        <div class="flex gap-1">
          <p>Não tem uma conta?</p>
          <router-link to="/cadastro" class="flex flex-col">
            <a href="" class="">Cadastra-se</a>
          </router-link>
        </div>
      </q-card-section>
      <q-card-section>
        <RegisterBottom @click="login" />
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
  name: "LoginPage",
  components: {
    RegisterBottom,
  }
  ,
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      const response = await api.post("http://localhost:3000/login", {
        email: this.email,
        password: this.password,
      });
        if (response.data) {
          this.$router.push("/home");
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
