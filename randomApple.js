const appleObj = {

}



function randomAppleCoord(){

   return Math.floor(Math.random() * 21)

}

for (let i =0 ; i < 1000; i++){
  let random = randomAppleCoord()
  if(appleObj[random]){
    appleObj[random]++
  } else {
    appleObj[random] = 1
  }
}

console.log(appleObj, 'object')