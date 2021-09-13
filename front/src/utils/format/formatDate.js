
const formatDate = (date) => {
    if(!date){return false;}
    try{
        let dataSplit = date.split("T");
        dataSplit = dataSplit[0].split("-");
        const finalDate = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
        return finalDate;
    }catch(err){
        console.log(err)
    }
}

export default formatDate;