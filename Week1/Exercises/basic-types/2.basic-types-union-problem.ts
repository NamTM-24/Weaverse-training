export type User = {
    name: String,
    age: number,
    occupation: string
}

export type Admin = {
    name : string,
    age : number ,
    role : string
}

export type Person = User | Admin;

export const persons : Person[] = [
    {
        name: "Max Mustermann",
        age: 25,
        occupation: "Chimney sweep"
    },

    {
        name: "Jane Doe",
        age: 32,
        role: "Administrator"
    },

    {
        name: "Kate Muller",
        age: 23,
        occupation: "Astronaut"
    },

    {
        name: "Bruce Willis",
        age: 64,
        role: "World saver"
    },
];

export function logPerson(user: Person){
    console.log(` - ${user.name} , ${user.age}`);
}



