const db = require('../../config/db')
const {age, date} = require('../../lib/utils')
const { update } = require('../controllers/students')

module.exports = {
    all(callback){  
        db.query(`SELECT * 
        FROM students`,function(err,results){
            if(err) throw `Database Error ! ${err}`

            callback(results.rows)
        })


    },
    create(data,callback){
        const query = `
            INSERT INTO students(
                name,
                avatar_url,
                email,
                birth,
                turmas,
                time,
                teacher_id
            ) VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.turmas,
            data.time,
            data.teachers
            
        ]
        db.query(query,values,function(err, results){
            if(err) throw `Database Error! ${err} `

            callback(results.rows[0])

        })

    },

    find(id,callback){
        db.query(`SELECT students.*, teachers.name AS teachers_name
                 FROM students
                 LEFT JOIN teachers ON (students.teacher_id = teachers.id)
                 WHERE students.id = $1`,[id], function(err,results){
            if(err) throw `Database Error! ${err} `
            callback(results.rows[0])

            console.log(results.rows)
        })

    },
    update(data,callback){
        const query = `
            UPDATE students SET
                name = ($1),
                avatar_url = ($2),
                email = ($3),
                birth = ($4),
                turmas = ($5),
                time = ($6),
                teacher_id=($7)
            WHERE id = $8    

        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.birth,
            data.turmas,
            data.time,
            data.teachers,
            data.id

        ]

        db.query(query,values,function(err,results){
            if(err) throw `Database Error! ${err} `

            callback()
        })

    },
    delete(id,callback){
        db.query(`DELETE FROM students WHERE id = $1`,[id],function(err,results){
            if(err) throw `Database Error! ${err} `

            callback()
        })

    },
    teacherSelectOption(callback){
        db.query(`SELECT id, name FROM teachers`,function(err, results){
            if(err) throw `Databse Error ! ${err}`

            callback(results.rows)
            console.log(results.rows)
            
        })
    }

}