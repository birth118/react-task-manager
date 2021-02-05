const { NotFoundError404 } = require('./NotFoundError404')
const { CustomError } = require('./CustomError')


const err = new NotFoundError404('Hello')
const err1 = new Error('Hello')


console.log(err.serializeErrors());
console.log(err.statusCode);
console.log(err instanceof Error);
console.log(err instanceof CustomError);
console.log(err1 instanceof CustomError);

//console.log(err.statusCode);




// var MyObjectOrSomeCleverName = require("./MyObject");
// var my_obj_instance = new MyObjectOrSomeCleverName(400, 'Hello!');
// console.log(my_obj_instance.statusCode);
// console.log(my_obj_instance.serialise());
