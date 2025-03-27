import app from "./app";
import { logger } from "./logger";

(function main() {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}/`);
  });
})();
