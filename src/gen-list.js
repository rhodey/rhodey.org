const fs = require('fs')
const readline = require('readline')

function onError(err) {
  console.log('error', err)
  process.exit(1)
}

function readerFor(fname) {
  return readline.createInterface({
    input: fs.createReadStream(fname)
  })
}

function headerFor(fname) {
  return new Promise((res, rej) => {
    let lineCount = 0
    const lines = []
    readerFor(fname).on('line', (line) => {
      if (++lineCount > 1 && lineCount < 7) {
        lines.push(line)
      } else if (lineCount === 7) {
        const [path, date, title, summary, banner] = lines
        res({ fname: `/${fname}`, path, date, title, summary, banner })
      }
    })
  })
}

function writeToList(headers) {
  headers = headers
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  let index = `let index = {}\n\n`
  headers.forEach((header) => {
    index += `index['` + header.path + `'] = ` + JSON.stringify(header) + `\n`
    index += `\n`
  })

  index += `module.exports = index\n`
  fs.writeFile('src/list.js', index, (err) => err && onError(err))
}

fs.readdir('assets/md/', (err, files) => {
  err && onError(err)

  const works = files
    .filter((fname) => fname.endsWith('.md'))
    .map((fname) => headerFor(`assets/md/${fname}`))

  Promise.all(works)
    .then(writeToList)
    .catch(onError)
})
