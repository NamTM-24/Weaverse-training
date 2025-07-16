type Expect<T extends true> = T;
type Equal<X,Y> = (<T>() => T extends X ? 1 : 2) extends < T > () => T extends Y ? 1 : 2 ? true : false;

type ReturnTypeOfFunction<T> = T extends (...args : any) => infer Result ? Result : never;
// Test cases
type test = [ 
    Expect<Equal<ReturnTypeOfFunction < () => number>, number>>, // number
    Expect<Equal<ReturnTypeOfFunction < (x: string) => boolean>, boolean>> // boolean
];
