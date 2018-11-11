export const person = {
  name: 'John',
  age: 40
}

export function sayHello () {
  return `Hello ${person.name}`
}

const greeting = 'Hello World'

// No needs for {} to import
export default greeting
