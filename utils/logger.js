module.exports = function log(...args) {
  const type = args.pop()
  const emoji = {
    mongo: ' 🍃 ',
    rocket: ' 🚀 ',
    good: ' 🟢 ',
    bad: ' 🔴 ',
    info: ' 📝 ',
    auth: ' 🔐 ',
  }
  console.log(`${type && emoji[type] ? emoji[type] : emoji.rocket} ${args}`)
}
