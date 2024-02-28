import "dotenv/config";
import { APP_PORT } from "@app/config";
import App from "@app/app";

(async () => {
  const app = await App();
  app.listen(APP_PORT, async () => {
    console.log(`listening at port:${APP_PORT}`);
    if (process.send) {
      process.send("ready");
    }
  });
})();
