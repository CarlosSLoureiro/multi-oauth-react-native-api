import { Container } from 'inversify';

import ReigsterControllers from '@containers/controllers';
import ReigsterServices from '@containers/services';

const container = new Container();

ReigsterControllers.init(container);
ReigsterServices.init(container);

export default container;
