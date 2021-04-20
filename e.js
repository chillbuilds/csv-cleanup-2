const fs = require('fs')
const linesPer = 30
const errArr = fs.readFileSync('./errors.csv', 'utf-8').split('\n\t')
var csvArr = []
var csvContArr = []

fs.readdirSync('./input').forEach(file => {
    csvArr.push(file)
  })

let raw = fs.readFileSync(`./input/${csvArr[0]}`, 'utf-8').split('\n')
raw.pop()

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

// loop through csv array and cross check error urls

for(var i = 0; i < csvContArr.length; i++){
    for(var j = 0; j < errArr.length; j++){
        for(var k = 0; k < csvContArr[i].urls.length; k++){
            if(csvContArr[i].urls[k] == errArr[j]){
                console.log(csvContArr[i].sku)
            }
        }
    }
}