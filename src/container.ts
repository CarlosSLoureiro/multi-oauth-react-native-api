import { Container } from 'inversify';

import ReigsterControllers from '@containers/controllers';
import ReigsterRepositories from '@containers/repositories';
import ReigsterServices from '@containers/services';

const container = new Container();

ReigsterControllers.config(container);
ReigsterRepositories.config(container);
ReigsterServices.config(container);

export default container;
