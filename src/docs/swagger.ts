import swaggerComponents from './swagger/components';

export function MountSwaggerConfig (swaggerPaths: object): [object, object] {
  return [{
    openapi: `3.0.3`,
    info: {
      title: process.env.API_NAME,
      version: process.env.API_VERSION
    },
    paths: swaggerPaths,
    components: swaggerComponents
  },
  {
    swaggerOptions: {
      defaultModelsExpandDepth: -1
    }
  }
  ];
}
