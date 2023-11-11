import Fastify from "fastify";
import { getMetrics, registerMetrics } from "./exporter";

const server = Fastify({
  logger: true,
});

server.get("/", async function handler() {
  return { version: "v1.0.0", codename: "Γη" };
});

server.get("/metrics", async function handler() {
  return getMetrics();
});

try {
  await registerMetrics();
  await server.listen({ port: 3000 });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
