import 'reflect-metadata';

export default function USE(
  routeName: string = '*'
): (target: object, propertyKey: string) => void {
  return (target: object, propertyKey: string): void => {
    let properties: any = Reflect.getMetadata(routeName, target);
    if (Array.isArray(properties?.USE)) {
      properties.USE.push(propertyKey);
    } else {
      properties = { ...properties, USE: [propertyKey] };
      Reflect.defineMetadata(routeName, properties, target);
    }
  };
}
