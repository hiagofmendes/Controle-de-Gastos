import { boot } from "quasar/wrappers";
import axios from "axios";

// Cria uma instância do Axios
const api = axios.create({
  baseURL: "http://localhost:3000", // Substitua pela URL base da sua API
  timeout: 5000, // Tempo limite para requisições (opcional)
});

// Configura o boot para injetar o Axios no app
export default boot(({ app }) => {
  // Torna a instância `api` acessível globalmente
  app.config.globalProperties.$axios = axios; // Instância padrão do Axios
  app.config.globalProperties.$api = api; // Instância customizada
});

// Exporta a instância personalizada para importação direta (opcional)
export { api };
