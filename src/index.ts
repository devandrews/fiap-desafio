import "dotenv/config";

import { setupHttpDriver } from "@/adapter/driver/http";

function main() {
  setupHttpDriver();
}

main();
