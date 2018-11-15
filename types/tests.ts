import * as phoneFns from '../index'

const phone: string = "5556667777"

// phoneFns.breakdown(phone)
// phoneFns.format("NNN-NNN-NNNN", phone)
// phoneFns.isValid(phone)
// phoneFns.uglify(phone)

console.log(phoneFns.breakdown(phone))
console.log(phoneFns.format("NNN-NNN-NNNN", phone))
console.log(phoneFns.isValid(phone))
console.log(phoneFns.uglify(phone))
