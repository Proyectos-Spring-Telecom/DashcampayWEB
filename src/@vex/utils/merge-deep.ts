/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
export function mergeDeep<T, P>(target: T, source: P): T & P {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source as T & P;
  }

  Object.keys(source as any).forEach((key) => {
    const targetValue = (target as any)[key];
    const sourceValue = (source as any)[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      (target as any)[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      (target as any)[key] = mergeDeep(
        Object.assign({}, targetValue),
        sourceValue
      );
    } else {
      (target as any)[key] = sourceValue;
    }
  });

  return target as T & P;
}
