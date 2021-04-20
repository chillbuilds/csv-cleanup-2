const fs = require('fs')
const arrayUniq = require('array-uniq')
const linesPer = 30
const errArr = fs.readFileSync('./errors.csv', 'utf-8').split('\n\t')
var errSkuArr = []
var csvArr = []
var csvContArr = []

fs.writeFileSync('./output/good.csv', 'Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Option3 Name,Option3 Value,Variant SKU,Variant Grams,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price,Variant Compare At Price,Variant Requires Shipping,Variant Taxable,Variant Barcode,Image Src,Image Position\n')
fs.writeFileSync('./output/bad.csv', 'Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Option3 Name,Option3 Value,Variant SKU,Variant Grams,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price,Variant Compare At Price,Variant Requires Shipping,Variant Taxable,Variant Barcode,Image Src,Image Position\n')
fs.writeFileSync('./output/error-skus.csv', '')

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
                errSkuArr.push(csvContArr[i].sku)
            }
        }
    }
}
errSkuArr = arrayUniq(errSkuArr)

// loop through errSkuArr and deem each chunk as good or bad

for(var i = 0; i < errSkuArr.length; i++){
    for(var j = 0; j < csvContArr.length; j++){
        if(errSkuArr[i] == csvContArr[j].sku){
            fs.appendFileSync('./output/bad.csv', csvContArr[j].chunk.join('\n'))
            fs.appendFileSync('./output/error-skus.csv', csvContArr[j].sku+'\n')
        }
    }
}