module.exports = [
   {
      name: "production",
      type: "postgres",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "auth",
      host: "postgres",
      synchronize: true,
      logging: false,
      entities: ["src/**/*.entity.ts"],
      migrations: ["src/Migration/**/*.ts"],
      cli: {
         "migrationsDir": "src/Migration"
      }
   },
   {
      name: "development",
      type: "postgres",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "dev",
      host: "localhost",
      synchronize: true,
      logging: false,
      entities: ["src/**/*.entity.ts"],
      migrations: ["src/Migration/**/*.ts"],
      cli: {
         "migrationsDir": "src/Migration"
      }
   }
]