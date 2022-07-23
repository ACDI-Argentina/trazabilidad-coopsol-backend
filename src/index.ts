import express from "express";
import { loadApiEndpoints } from "./controllers/api";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

loadApiEndpoints(app);

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
})
