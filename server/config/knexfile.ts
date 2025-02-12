module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "Teste",
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
