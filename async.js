function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1
}

const asyncMaker = function (fn) {
  const delay = getRandomInt(5) * 1000
  return function (cb) {
    setTimeout(function () {
      const res = fn()
      typeof cb === 'function' && cb(res)
    }, delay)
  }
}

const asyncMakerPromise = function (fn) {
  const delay = getRandomInt(5) * 1000
  return function (cb) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        const res = fn()
        resolve(res)
      }, delay)
    })
  }
}

// const test1 = function () {
//   console.log('test 1')
// }

// const test2 = function () {
//   console.log('test 2')
// }

// const test3 = function () {
//   console.log('test 3')
// }

// const test4 = function () {
//   console.log('test 4')
// }

// const test5 = function () {
//   console.log('test 5')
// }
// const res = [test1, test2, test3, test4, test5]
// .map((f) => asyncMaker(f))
// .map((f) => f())

const getMovie = () =>
  new Promise((yes, no) => {
    setTimeout(() => yes('movies {...}'), 1000)
  })
const getActor = () =>
  new Promise((yes, no) => {
    setTimeout(() => yes('actors {...}'), 2000)
  })
const getRating = () =>
  new Promise((yes, no) => {
    setTimeout(() => no('rating {...}'), 3000)
  })

// const testCb = function () {
//   return 1344 / 32
// }

console.log('start')
const a = [getMovie(), getActor(), getRating()]
Promise.allSettled(a)
.then(console.log)
.catch(e => console.log('error', e))

console.log('end')

// const asyncTestWithCb = asyncMaker(testCb)

// asyncTestWithCb(function (data) {
//   console.log( `this is the answer ${data}`)
// })

// const fetchData(url)
// .then(data => setData(data))  //  or .then(setData)
// .catch(console.error)

// Promise.allSettled([getMovie(), getActor(), getRating()])
//   .then((values) => {
//     console.log(values)
//   })
//   .catch((e) => {
//     console.log(e)
//   })
// const getData = async function () {
//   const movieId = await getMovie(42)
//   const actorId = await getActor(movieId)
//   const rating = await getRating(actorId)
//   return [movieId, actorId, rating]
// }
// getMovie(42)
//   .then((id) => getActor(id)) // .then(getActor)
//   .then((id) => getRating(id)) // .then(getRating)
//   .catch(console.error)

// const test = async function () {
//   console.log('this is a test')
//   return 'this is the returned value 42'
// }
// getData()
//   .then((data) => console.log(data))
//   .then(() => console.log('after'))
//   .then(() => console.log('after after'))
//   .then(() => console.log('after after after'))

function checkMail() {
  return new Promise((yes, no) => {
    Math.random() > 0.5 
      ? yes('Mail has arrived') 
      : no(new Error('Failed to arrive'))
  })
}

checkMail()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    console.log('Experiment completed');
  })
