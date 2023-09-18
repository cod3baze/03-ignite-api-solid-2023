import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  // executa antes de cada arquivo de teste
  async setup() {
    console.log("Setup");

    return {
      async teardown() {
        console.log("teardown");
      }, // executa depois de cada arquivo de teste
    };
  },
};
