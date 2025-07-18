type personName = "John" | "Jack" | "Justin";

type otherDetails = {
    id: number;
    age: number;
}

type personInfo = personName | otherDetails;

type Person = {
    myInfo: personInfo;
    myOtherInfo: personInfo;
};

const applicant = {
    myInfo: "John",
    myOtherInfo: {
        id: 123,
        age: 22
    }
} satisfies Person;

applicant.myInfo.toUpperCase();


