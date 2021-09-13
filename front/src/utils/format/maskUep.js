
const maskUep = (mask, numb) => {
    const number = (`${numb}`).split('')

    const maskAr = mask.split('')
    let arrayRet = []
    let cont = (maskAr.length - number.length) ;

    for(let a = 0; a < maskAr.length; a++){
        if(cont > a){
            arrayRet.push('0')
        }
    }
    for(let a = 0; a < number.length; a++){
            arrayRet.push(number[a])
    }

    return arrayRet.join('')
}

export default maskUep;