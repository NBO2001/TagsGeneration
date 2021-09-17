
const returnDateOrder = (dateOne, dateTwo) => {

    if(!dateOne || !dateTwo) return false;

    try{
        let arrDateOne = dateOne.split('/')
        let arrDateTwo = dateTwo.split('/')

        if(arrDateOne[2] < arrDateTwo[2]){
            return `${dateOne} - ${dateTwo}`
        }
        if(arrDateOne[2] > arrDateTwo[2]){
            return `${dateTwo} - ${dateOne}`
        }
    
        if(arrDateOne[1] > arrDateTwo[1]){
            return `${dateTwo} - ${dateOne}`
        }
    
        if(arrDateOne[1] < arrDateTwo[1]){
            return `${dateOne} - ${dateTwo}`
        }
    
        if(arrDateOne[0] > arrDateTwo[0]){
            return `${dateTwo} - ${dateOne}`
        }
    
        if(arrDateOne[0] < arrDateTwo[0]){
            return `${dateOne} - ${dateTwo}`
        }

        return false

    }catch(err){
        return false
    }

}

export default returnDateOrder