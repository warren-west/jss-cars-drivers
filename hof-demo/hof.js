// .sort()
// Will always return an array of the same length as the original

const numbers = [ 5, 13, -2, 0, 4, 8, 17, 9, 1, 1 ]
const students = [
  { id: 133, name: "Warren" },
  { id: 120, name: "Mads" },
  { id: 154, name: "Thor" },
  { id: 102, name: "David" },
  { id: 102, name: "Darwin" },
  { id: 102, name: "Theodore" },
  { id: 102, name: "Warren" },
]

// console.log(numbers.sort((a, b) => b - a))

const sortedStudentList = students.sort((a, b) => {
    if (a.name > b.name) return 1
    else if (a.name < b.name) return -1
    else return 0
})

// console.log(sortedStudentList)

// .filter()
// Will return an array containing the same length, or fewer element (or an empty array)

const positiveNumbers = numbers.filter(num => num >= 0)
const evenNumbers = numbers.filter(num => num % 2 == 0)

// .map()
// Will always return an array of the same length of the original

const doubledNumbers = numbers.map((num) => num * 2)
const halvedNumbers = numbers.map((num) => num * 0.5)
const numbersToString = numbers.map(num => '<h1>' + num.toString() + '</h1>')

console.log(doubledNumbers)
console.log(halvedNumbers)
console.log(numbersToString)