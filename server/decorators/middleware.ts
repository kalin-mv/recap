import 'reflect-metadata';

export default function middleware(
  func: Function | Function[]
): (target: Function) => void {
  const middleware = Array.isArray(func) ? func : [func];
  return (target: Function): void => {
    let funcs: any = Reflect.getMetadata(target.name, target);
    if (!Array.isArray(funcs) || funcs.length <= 0) {
      funcs = middleware;
    } else {
      funcs = [...middleware, ...funcs]; //!!! the order is important. 1) middleware 2) func
    }
    Reflect.defineMetadata(target.name, funcs, target);
  };
}
