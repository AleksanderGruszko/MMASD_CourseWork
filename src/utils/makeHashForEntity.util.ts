type Entity = {
  uuid: string;
}

export function makeHashForEntity<T extends Entity>(list: T[]): Record<string, T> {
  return list.reduce((acc, item) => {
    acc[item.uuid] = item;
    return acc;
  }, {} as Record<string, T>);
}
