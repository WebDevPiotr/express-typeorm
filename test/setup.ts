import { GenericContainer, StartedTestContainer } from "testcontainers"

let container: StartedTestContainer

export const start = async () => {
    container = await new GenericContainer("postgres")
    .withEnv("POSTGRES_USER", "postgres")
    .withEnv("POSTGRES_PASSWORD", "postgres")
    .withEnv("POSTGRES_DB", "test")
    .withExposedPorts(5432)
    .start();

    process.env.testDbPort =  container.getMappedPort(5432).toString()
}

export const shutDown = async () => {
    await container.stop()
} 