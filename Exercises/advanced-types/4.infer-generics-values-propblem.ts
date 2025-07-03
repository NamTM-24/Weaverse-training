type Expect<T extends true> = T;
type Equal<X,Y> = (<T>() => T extends X ? 1 : 2) extends < T > () => T extends Y ? 1 : 2 ? true : false;

interface MyComplexInterface<Event, Context, Name, Point> {
    getEvent: () => Event;
    getContext: () => Context;
    getName: () => Name;
    getPoint: () => Point;
  }
  
  type Example = MyComplexInterface< "click", "window", "my-event", { x: 12, y: 14 } >;
// solution 
type GetPoint<T> = T extends MyComplexInterface<any , any , any , infer Result> ? Result : never;
type tests = [Expect<Equal<GetPoint<Example>, {x: 12 , y: 14}>>];             

export {};