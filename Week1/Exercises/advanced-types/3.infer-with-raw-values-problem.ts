type Expect<T extends true> = T;
type Equal<X,Y> = (<T>() => T extends X ? 1 : 2) extends < T > () => T extends Y ? 1 : 2 ? true : false;

type GetDataValue<T> = T extends {data: infer DataValue} ? DataValue : never;
// {data: "hello" }> -> "hello"
// {data : { name: "hello"} } -> {name: "hello"}
// 
type tests = [
    Expect<Equal<GetDataValue< {data: "hello"} > , "hello">>,
    Expect<Equal<GetDataValue< {data: {name: "hello"} } > , {name: "hello"} >>,
    Expect<
        Equal<
            GetDataValue< {data: {name: "hello"; age: 20}} >,
            { name: "hello"; age: 20}
    >
>
]



export{}