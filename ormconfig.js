const base = {
   type: "postgres",
   port: 5432,
   username: "postgres",
   password: "postgres",
   synchronize: true,
   logging: false,
   entities: ["src/**/*.entity.ts"],
   migrations: ["src/Migration/**/*.ts"],
   cli: {
      "migrationsDir": "src/Migration"
   }
}

const development = {
   name: "development",
   database: "dev",
   host: "postgres-dev",
}

const test = {
   name: "test",
   database: "test",
   host: "postgres-test",
}

const developmentConfig = Object.assign(development, base);

const testConfig = Object.assign(test, base);

module.exports = [
   developmentConfig, testConfig
]