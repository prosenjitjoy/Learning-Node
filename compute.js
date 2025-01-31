function longComputation() {
  var sum = 0
  for (var i = 0; i < 1e9; i++) {
    sum += i
  }
  return sum
}

process.on('message', function (msg) {
  const sum = longComputation()
  process.send(sum)
})