import { Container } from 'inversify';

import RegisterControllers from '@containers/controllers';
import RegisterRepositories from '@containers/repositories';
import RegisterServices from '@containers/services';

const container = new Container();

RegisterControllers.config(container);
RegisterRepositories.config(container);
RegisterServices.config(container);

export default container;
