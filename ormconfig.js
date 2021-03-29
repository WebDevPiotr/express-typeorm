const base = {
   type: "postgres",
   host: "postgres",
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
}

const test = {
   name: "test",
   database: "test",
}

const developmentConfig = Object.assign(development, base);

const testConfig = Object.assign(test, base);

module.exports = [
   developmentConfig, testConfig
]