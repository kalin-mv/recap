import * as awilix from 'awilix';
import mongoose from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import controllers from './controllers';
import services from './services';
import models from './models';

declare global {
  var di: any;
}

export const toJSON = () => {
  return (someClass: any, instance: any): any => {
    const deserialized = plainToInstance(someClass, instance);
    return instanceToPlain(deserialized);
  };
};

const initMongoDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  mongoose.connection.once('open', function () {
    console.info('MongoDB is connected');
  });
};

const getDI = (name: string | null) => {
  if (!global.di) {
    initMongoDb();
    const container = awilix.createContainer({
      injectionMode: awilix.InjectionMode.PROXY,
    });
    container.register({
      ...models,
      ...services,
      ...controllers,
      toJS: awilix.asFunction(toJSON).singleton(),
    });

    global.di = container;
  }
  return name ? global.di.resolve(name) : global.di;
};

export default getDI;
