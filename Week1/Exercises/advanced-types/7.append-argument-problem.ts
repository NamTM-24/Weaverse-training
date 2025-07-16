type AppendArgument<A extends (...args: any) => any , B> = A extends (...args: infer A) => infer R ? (x: B, ...args: A) => R : any;
type someF = (a: number, b: string) => number;
type FinalF = AppendArgument<someF, boolean>;

export{};