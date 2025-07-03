type ReplaceSpaceWithDash<T extends string> = T extends `${infer FirstName} ${infer LastName}` ? `${FirstName}-${LastName}` : never;      

type Name = ReplaceSpaceWithDash<"Emmylou Harris">;

type Replace<A extends string , B extends string , C extends string> = A extends `${infer FirstName}${B}${infer LastName}` ? `${FirstName}${C}${LastName}` : never;
type DashName = Replace<"Matt Pocock", " ", "-">;

type StringReplace<A extends string , B extends string , C extends string> = A extends `${infer FirstName}${B}${infer LastName}` ? `${FirstName}${C}${StringReplace<LastName , B , C>}` : A;
type Result = StringReplace<"Tran Hai Nam" , " ", "-">;
