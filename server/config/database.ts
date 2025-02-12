import knex from "knex";

// Cria a instância do knex usando o ambiente 'development' configurado
// export default knex(config.development);

export default function db() {
  // Retorna a instância do knex
  const config = {
    development: {
      client: "mysql2",
      connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "CRUD",
      },
    },
  };

  return knex(config.development);
}
// routes > controller > model/services
