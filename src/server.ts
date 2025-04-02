import app from "./app";
import { logger } from "./logger";
import { initiateDbConnection } from "./utils/db";

(async function main() {
  const port = process.env.PORT || 4000;
  await initiateDbConnection();

  app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}/`);
  });
})();
