const {graduation,date, age} = require('../../lib/utils')
const Teacher = require('../models/teacher')


module.exports = {
    index(req,res){  


        let {filter,page,limit} = req.query

        page = page || 1 
        limit = limit || 2 
        offset = limit * ( page - 1 )

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teacher){
                const paginate = {
                    total : Math.ceil(teacher[0].total / limit),
                    page
                }
                return res.render("teachers/index",{teacher,filter,paginate})
            }

        }

        Teacher.paginate(params)



        
    },
    register(req,res){  
        return res.render("teachers/register")
    },
    post(req,res){  
        const keys = Object.keys(req.body)

        for(key of keys){
        if(req.body[key] == ""){
            return res.send(key)
        }
        
       
    }    
    
        Teacher.create(req.body,function(teacher){
        return res.redirect(`teachers/${teacher.id}`)
    })
    },
    show(req,res){  
        Teacher.find(req.params.id,function(teacher){
            if(!teacher) return res.send('Teacher not found')

            teacher.birth_date = age(teacher.birth_date)
            teacher.created_at= date(teacher.created_at).format

            return res.render('teachers/show',{teacher})
        })
        
    },
    edit(req,res){  
        Teacher.find(req.params.id,function(teacher){
            if(!teacher) return res.send('Teacher not found')

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render('teachers/edit',{teacher})
        })
    },
    update(req,res){  
        const keys = Object.keys(req.body)

        for(key of keys){
        if(req.body[key] == ""){
           
            return res.send(key)
        }
     }

        Teacher.update(req.body,function(){
            res.redirect(`teachers/${req.body.id}`)
        })
    
        
    },
    delete(req,res){  
        Teacher.delete(req.body.id,function(){
            return res.redirect("/teachers")
        })
       
    },
}




