import 'reflect-metadata';

export default function run(
  func: Function | Function[]
): (target: object, propertyKey: string) => void {
  return (target: object, propertyKey: string): void => {
    const middleware = Array.isArray(func) ? func : [func];
    const key = target.constructor.name + '_' + propertyKey;
    let funcs: any = Reflect.getMetadata(key, target.constructor);
    if (!Array.isArray(funcs) || funcs.length <= 0) {
      funcs = middleware;
    } else {
      funcs = [...middleware, ...funcs]; //!!! the order is important. 1) middleware 2) func
    }
    Reflect.defineMetadata(key, funcs, target.constructor);
  };
}
