// 1.Required<Type> : Bắt buộc phải khai báo object

type Books = {
    name?: string;
    price?: number;
    image?: string;
}

type requiredBooks = Required<Books>

const book1: Books = {
    // không khai báo gì vẫn không lỗi
}

const book2: requiredBooks = {
    // sẽ lỗi nếu không khai báo 
    name: "ABC",
    price: 2000,
    image: "....."
}


// 2. Pick : chỉ định những phần tử nào được lấy
type BookOption = Pick<Books , "name" | "image">

const book3: BookOption = {
    name : "name",
    image: "image"
    // price sẽ bị lỗi 
}

// 3. Partial<Type>:  Không bắt buộc ngược lại với  Required
// 4. Readonly<Type> : Chỉ đọc không được phép sửa thay đổi 

// 5. Record<Keys, Type> : sẽ trả cho mình dưới dạng object có keys và value tương ứng

