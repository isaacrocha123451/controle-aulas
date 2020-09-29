module.exports = {
    age(timestamp){
   
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
    
        const month = today.getMonth() - birthDate.getMonth()
    
        if(month < 0 || month == 0 && today.getDate() - birthDate.getDate()){
            age = age - 1 
        }
    
        return age
    
    
    },
    graduation(level){

        const graduation=[
            "Ensino Medio Completo",
            "Ensino Superior Completo",
            "Mestrado",
            "Doutorado"
        ]

        for(let i=0;i<graduation.length; i = i + 1){
            
            if( level == graduation[i] )
                return graduation[i]
        }


    },

    date(timestamp){
        const data = new Date(timestamp)

        const year = data.getUTCFullYear()
        const month = `0${data.getUTCMonth() + 1}`.slice(-2)
        const day = `0${data.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            iso:`${year}-${month}-${day}`,
            birthDay:`${day}-${month}`,
            format:`${day}/${month}/${year}`
        }
    }


}
 