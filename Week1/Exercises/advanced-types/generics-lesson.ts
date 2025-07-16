function indentity<A>(arg: A): A {
    return arg;
};

indentity<number>(10);
indentity<string>("hello");

function pair<A, B>(a: A , b: B): [A , B]{
    return [a,b];
}

pair(10,10);
pair(10, [1,"2",true]);


function logLength<T extends {length: number}>(item: T): void{ // constraint type generics
    console.log(item.length);
}

// "123".length
// [1,2,3].length
// 123.length => impossible

const student = {
    name: "aaa",
    age: "20",
    school: "CKC"
}
type studentKeys = keyof typeof student;

function logObjValue<O extends {} , K extends keyof O>(obj: O , key: K): void{
    console.log(obj[key]);
};

logObjValue(student , "age");

