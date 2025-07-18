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

export function logPerson(person: Person){
    let additionalInformation: string;

    if('role' in person){
        additionalInformation = person.role;
    }
    else{
        additionalInformation = person.occupation;
    }
    console.log(` - ${person.name} , ${person.age}, ${additionalInformation}`)
}



