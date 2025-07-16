type Expect<T extends true> = T;
type Equal<X,Y> = (<T>() => T extends X ? 1 : 2) extends < T > () => T extends Y ? 1 : 2 ? true : false;



type PropertyType<A extends Record<string,any> , B extends keyof A> = A[B]; // if Object use Record<string,any> 

// Test cases
type ExampleType = { name: string; age: number; isStudent: boolean };

type NameType = Expect<Equal<PropertyType<ExampleType, "name">, string>>; // string
type AgeType = Expect<Equal<PropertyType<ExampleType, "age">, number>>; // number

export {};
