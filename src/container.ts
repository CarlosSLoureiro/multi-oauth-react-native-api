import { Container } from 'inversify';

import ReigsterControllers from '@containers/controllers';
import ReigsterServices from '@containers/services';

const container = new Container();

ReigsterControllers.config(container);
ReigsterServices.config(container);

export default container;
