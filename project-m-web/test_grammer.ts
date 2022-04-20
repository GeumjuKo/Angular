

let user: any = null;
let x = 0;

user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

console.log(x); // 0, value not incremented

let obj: any = {};
obj.first = {"one":"1111", "second": "2222"};
obj.first.salary = function(): string{
    return "salary @@!!";
}
console.log(obj?.first?.salary());
