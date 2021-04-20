const fs = require('fs')
const linesPer = 30
var csvArr = []
var csvContArr = []

fs.readdirSync('./input').forEach(file => {
    csvArr.push(file)
  })

let raw = fs.readFileSync(`./input/${csvArr[0]}`, 'utf-8').split('\n')

for(var i = 1; i < raw.length; i=i+linesPer){
    let chunkArr = []
    let urlArr = []
    for(var j = 0; j < linesPer; j++){
        let urlPull = raw[i+j].split(',')
        if(urlPull[urlPull.length-2].length > 0){
            urlArr.push(urlPull[urlPull.length-2])
        }
        chunkArr.push(raw[i+j])
    }
    let lineArr = raw[i].split(',')
    let skuRaw = lineArr[lineArr.length-3].split('-')
    csvContArr.push({sku: skuRaw[0], chunk: chunkArr, urls: urlArr})
}
console.log(csvContArr[0])