// Ternary operator

const number = 100;
const isTrue = number >= 100 ? true : false;

// type ConditionalType = SomeType extends OtherType ? TrueType : FalseType;

type Check<T> = T extends string ? "string" : "not-string";

type isCheck1 = Check<100>; // => result : not-string
type isCheck2 = Check<"hello"> // => result : string

export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/*
        explain
- ... : combine multiple arguments into 1 array 
- function return any value because it any 
*/

function logObject(x: number , y: string){}
type Z = Parameters<typeof logObject>

type Extract<T, U> = T extends U ? T : never;
type X = Extract<(string | string[]), string[]>; // => result = string[];

type Exclude<T,U> = T extends U ? never : T;
type Y = Exclude<string | string[], string[]>; // => result = string;

