const express = require("express")
const { students } = require("./model/index")
const app = express()  //storing express in app

//database connection
require("./model/index")

//set ejs env
app.set("view engine","ejs")

//To access the public folder by nodeJs
app.use(express.static("public"))

// parse or handle form data
app.use(express.json())   
app.use(express.urlencoded({extended:true}))


//CreateStudent
app.get("/CreateStudent",(req,res)=>{
    res.render("CreateStudent.ejs")
})

//post CreateStudent
app.post("/CreateStudent",async(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const age = req.body.age
    const gender = req.body.gender

    await students.create({
        name:name,
        email:email,
        age:age,
        gender:gender
    })

    res.redirect("/")
})

// to takeout all data from table
app.get("/",async(req,res)=>{
    const allStudents = await students.findAll()
    // console.log(allStudents)
    res.render("Home",{ students : allStudents})
})


//single student page (should find all the datas from table)
app.get("/single/:id",async(req,res)=>{
    const id = req.params.id

   const student = await students.findAll({
        where : {
            id : id
        }
    })

    res.render("SingleStudent",{student})
})


//delete student info
app.get("/delete/:id",async(req,res)=>{
    const id = req.params.id 

    await students.destroy({
        where : {
            id:id
        }
    })
    res.redirect("/")
})


//edit the students info
app.get("/edit/:id",async(req,res)=>{
    const id = req.params.id 

    //find students info of that id
    const student = await students.findAll({
        where : {
            id:id
        }
    })
    res.render("editStudent",{student})
})

app.post("/editStudent/:id",async(req,res)=>{
    const id = req.params.id 

    const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        const gender = req.body.gender

        await students.update({
            name:name,
            email:email,
            age:age,
            gender:gender
        },{
            where : {
                id:id
            }
        })
        res.redirect("/single/" + id)

})






app.listen(3000,()=>{
    console.log("NodeJs Project has started on port 3000")
})