import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import validationMiddleware from "./validation.middleware";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

RegisterRoutes(app);

app.use(validationMiddleware);
