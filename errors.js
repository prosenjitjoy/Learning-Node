const myError = new Error('Some error message')
// console.error(myError)

function calculateSquareRoot(number) {
  if (number < 0) {
    throw new Error('Cannot calculate square root of negative number')
  }
  return Math.sqrt(number)
}

try {
  const result = calculateSquareRoot(-1)
} catch (err) {
  console.error(err.message)
}

// SyntaxError
// console.log('Hello world'

// ReferenceError
// console.log(x)
// const x = 0

// RangeError
// (123.456).toFixed(101)
// function f() {
//   f()
// }
// f()

// TypeError
// const thing = 42
// console.log(thing.toUpperCase())
// thing = 13

class ValidattionError extends Error {
  constructor(message, fieldName) {
    super(message)
    this.name = 'ValidattionError';
    this.fieldName = fieldName
  }
}
// To Use:
// throw new ValidattionError('Some message', 'some_field')

function validateUser(user) {
  if (!user.username) {
    throw new ValidattionError('Username is required', 'username')
  }
}

try {
  validateUser({}) // an empty object is not a valid user object
} catch (err) {
  if (err instanceof ValidattionError) {
    console.error(`Error in field '${err.fieldName}': ${err.message}`)
  } else {
    console.error(`Unexpected error: ${err.message}`)
    throw err
  }
}
debugger;
// function fetchData(callback) {
//   getSomeDataFromAnAPI((err, data) => {
//     if (err) {
//       callback(err)
//       return
//     }
//     callback(null, data)
//   })
// }

// fetchData((err, data) => {
//   if (err) {
//     console.log('Error fetching data:', err)
//     return
//   }
//   console.log('Data received:', data)
// })

// function fetchData() {
//   return new Promise((resolve, reject) => {
//     getSomeDataFromAnAPI((err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }

// fetchData()
//   .then((data) => {
//     console.log('Data received:', data)
//   })
//   .catch((err) => {
//     console.log('Error fetching data:', err)
//   })

function fetchData() {
  try {
    let data = getSomeData()
    return { error: null, data: data }
  } catch (error) {
    return { error: error, data: null }
  }
}

const result = fetchData()
if (result.error) {
  console.log('Error fetching data:', result.error)
} else {
  console.log(result.data)
}