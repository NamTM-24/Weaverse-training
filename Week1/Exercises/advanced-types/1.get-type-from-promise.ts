type Expect<T extends true> = T;
type Equal<X,Y> = (<T>() => T extends X ? 1 : 2) extends < T > () => T extends Y ? 1 : 2 ? true : false;

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<boolean>;

type ResultX = Transform<X>;
type ResultY = Transform<Y>;
type ResultZ = Transform<Z>;

type Transform<A> = A extends Promise<infer R>? R : never;

type tests = [
  Expect<Equal<ResultX, string>>,
  Expect<Equal<ResultY, { field: number }>>,
];