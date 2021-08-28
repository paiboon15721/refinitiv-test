const http = require('http')

const [fundCode] = process.argv.slice(2)
if (!fundCode) {
  console.log('Fund code is required')
  process.exit(1)
}

const getHtml = () =>
  new Promise(resolve => {
    http
      .request(
        {
          host: 'codequiz.azurewebsites.net',
          path: '/',
          method: 'GET',
          headers: { Cookie: 'hasCookie=true' },
        },
        res => {
          let str = ''
          res
            .on('data', chunk => {
              str += chunk
            })
            .on('end', () => {
              resolve(str.replaceAll(' ', ''))
            })
        },
      )
      .end()
  })

const parseData = (html, acc = {}) => {
  const startRow = '<tr><td>'
  const start = '<td>'
  const end = '</td>'

  const startRowIndex = html.indexOf(startRow)
  if (startRowIndex < 0) {
    return acc
  }

  let curr = html.substring(startRowIndex + startRow.length)

  const endFundCode = curr.indexOf(end)
  const fundCode = curr.substring(0, endFundCode)
  curr = curr.slice(endFundCode + end.length)

  const endNav = curr.indexOf(end)
  const nav = curr.substring(start.length, endNav)
  curr = curr.slice(endNav + end.length)

  acc[fundCode.toLowerCase()] = nav
  return parseData(curr, acc)
}

getHtml().then(html => {
  const x = parseData(html)
  console.log(x[fundCode.toLowerCase()] || 'Not found')
})
