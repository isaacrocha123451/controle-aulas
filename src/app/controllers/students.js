const {graduation,date} = require('../../lib/utils')
const Student = require('../models/student')


module.exports = {
    index(req,res){  
        Student.all(function(student){
            return res.render("students/index",{student})
        })
    },
    register(req,res){  
        Student.teacherSelectOption(function(options){
            return res.render("students/register",{teacherSelect: options})
        })

    },
    post(req,res){  
        const keys = Object.keys(req.body)

        for(key of keys){
        if(req.body[key] == ""){
            return res.send(key)
        }
        
       
    }    
    
        Student.create(req.body,function(student){
        return res.redirect(`students/${student.id}`)
    })
    },
    show(req,res){  
        Student.find(req.params.id,function(student){
            if(!student) return res.send('Student not found')

            student.birth = date(student.birth).birthDay

            return res.render("students/show",{student})

            
        })
        
    },
    edit(req,res){  
        Student.find(req.params.id,function(student){
            if(!student) return res.send('Student not found')

            student.birth = date(student.birth).iso

            Student.teacherSelectOption(function(options){
                return res.render('students/edit',{student, teacherSelect:options})
                
            })

            
        })
    },
    update(req,res){  
        const keys = Object.keys(req.body)

        for(key of keys){
        if(req.body[key] == ""){
           
            return res.send(key)
        }
     }

        Student.update(req.body,function(){
            res.redirect(`students/${req.body.id}`)
        })
    
        
    },
    delete(req,res){  
        Student.delete(req.body.id,function(){
            return res.redirect("/students")
        })
       
    },
}




