import swaggerComponents from './swagger/components';

export function MountSwaggerConfig (swaggerPaths: object): [object, object] {
  return [{
    openapi: `3.0.3`,
    info: {
      title: process.env.NAME,
      version: process.env.VERSION
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
