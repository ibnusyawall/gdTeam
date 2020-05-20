/**
  - name: gdTeam
  - team: SGB
  - require: NODEJS (superagent, readline, colors)
*/

const superagent = require('superagent');
const readline = require('readline');
require('colors')

const fs = require('fs');

const log = console.log

const ask = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const _encKey = (str, callback) => {
  const _balik = str.split("").reverse().join("")
  const _enctxt= new Buffer(_balik.toString()).toString('base64')
  callback(undefined, {
    str: _balik,
    enc: _enctxt.split('').reverse().join('!_?')
  })
}

const b1 = '     ['.green + '  TEAM DRIVE UNLI GOOGLE by SGB TEAM  ' + ']'.green
const b2 = '\n       Git: ' + '@'.blue + 'ibnusyawall' + '  FB: ' + '@'.blue + 'ibnusyawal00'
log(b1, b2)

const _getCek = (callback) => {
  if (typeof process.argv[2] === 'undefined') {
    log('[!] Harap cantumkan list file.'); process.exit()
  } else {
    const _list = readline.createInterface({
      input: fs.createReadStream(`./${process.argv[2]}`),
      crlfDelay: Infinity
    }).on('line', (line) => {
      if (typeof process.argv[3] === 'undefined') {
        log('[!] Harap cantumkan nama team drive.'); process.exit()
      } else {
        const data = {
          "teamDriveName": `${process.argv[3]}`,
          "teamDriveThemeId": "random",
          "emailAddress": `${line}`
        }
        superagent.post('https://team.gdrive.vip/drive').send(data).end((err, res) => {
          if (err) throw err
          callback(undefined, {
            res: `[+] ${line} : ${res.text}`
          })
        })
      }
    })
  }
}

ask.question('\n[?] Key: ', (key) => {
  _encKey(new Buffer('dXBlY2tlY3Vm', 'base64').toString('ascii'), (error, {str, enc} = {}) => {
    let data = enc.replace(/[\!]|[\_]|[\?]/gi, '')
    if (key != new Buffer(data.split('').reverse().join('').toString(), 'base64').toString('ascii')) {
      log('[!] Key salah.'); process.exit()
    } else {
      _getCek((error, {res} = {}) => {
        log(res);
      })
    }
  })
})
