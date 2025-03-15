export function createFakeContextObject<TObject extends object>(contextName: string): TObject {
  return new Proxy<TObject>({} as TObject, {
    get() {
      throw new Error(
        `${contextName} not provided. Make sure your component is wrapped with ${contextName}.Provider.`,
      );
    },
  });
}
