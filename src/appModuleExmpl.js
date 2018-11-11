// Using CommonJS modules
// './mymodule01' means import module from the file which is in the same folder
// 'express' means using module from node_modules
// const person = require('./myModule01')

// console.log(person.name)

// Using ES2015 modules
// import { person, sayHello } from './myModule02'
// import * as mod from './myModule02'

// console.log(mod.person.name, mod.person.age)
// console.log(mod.sayHello())

// Import for export default element
import greeting from './myModule02'

console.log(greeting)
