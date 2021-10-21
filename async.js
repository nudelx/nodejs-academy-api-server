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

    return new Promise( function(resolve, reject ) {
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

const testCb = function () {
  return 1344 /32
}


const asyncTestWithCb = asyncMaker(testCb)

asyncTestWithCb(function (data) {
  console.log( `this is the answer ${data}`)
})

const fetchData(url)
.then(data => setData(data))  //  or .then(setData)
.catch(console.error)    