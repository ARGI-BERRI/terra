import fastify from "fastify";
import { getMetrics } from "./exporter";

const server = fastify({
  logger: true,
});

server.get("/metrics", async function handler() {
  return getMetrics();
});

try {
  await server.listen({ port: 3000 });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
