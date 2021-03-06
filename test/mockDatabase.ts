import { GenericContainer } from "testcontainers"

export const initDbContainer = async () => {
    const container = await new GenericContainer("postgres")
    .withEnv("POSTGRES_USER", "postgres")
    .withEnv("POSTGRES_PASSWORD", "postgres")
    .withEnv("POSTGRES_DB", "test")
    .withExposedPorts(5432)
    .start();
    return container
}

export const config = {
    name: 'test',
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "test",
    synchronize: true,
    entities: ["src/**/*.entity.ts"],
  }