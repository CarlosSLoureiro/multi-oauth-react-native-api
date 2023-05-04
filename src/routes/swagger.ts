import { MountSwaggerConfig } from "@docs/swagger";

import { type Router } from "express";
import * as swaggerUi from "swagger-ui-express";

export default abstract class SwaggerRoutes {
  public static init (router: Router, swaggerPaths: object): void {
    router.use(`/swagger`, swaggerUi.serve);
    router.get(`/swagger`, swaggerUi.setup(...MountSwaggerConfig(swaggerPaths)));
  }
}
