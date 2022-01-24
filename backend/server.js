const express = require('express')
const mysql = require('mysql')
var session = require('express-session')
const cors = require("cors")

var bodyParser = require('body-parser')
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'blog'
})
db.connect()
const app = express()

const corsOptions ={
    origin: "*"
  }
 

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

  
app.listen(3000, ()=>{
    console.log('listenning to port 3000')
})

app.get('/createDB',(req, res)=>{
     let sql ='create database blog'
      db.query(sql, err =>{
           if(err) 
           throw err
        res.send('Database created') 
    }) })
app.get('/createTable',(req,res)=>{
    let sql = 'create table utilisateur (id int auto_increment, username varchar(30), password varchar(30), primary key(id) )'
    db.query(sql,(err)=>{
        if(err)
            throw err
        res.send("User table created")
    })
})
app.post('/users/register',async (req, res)=>{
    let objet = [req.body.username, req.body.password];
    /*let dispo = db.query("select * from utilisateur where username = ?",[req.body.username], function(err, rows, fields) {
        if(err) throw err
    })

    if(dispo._results.length ==0)*/
    let sql = "insert into utilisateur (username, password) values (?)"
    const newUser = await db.query(sql ,[objet], (err)=>{
        if(err)
            throw err
        res.send(objet)
    })
    /*else
        res.send('deja username utilise')*/
})
app.post('/users/login',async (req, res)=>{
    var objet1 = req.body.username
    var objet2 = req.body.password
    var objet3 =''
    var objet ={username: objet1, password: objet2}
    let sql = "select * from utilisateur"
    const user = await db.query(sql, function(err, rows){
        if(err) {
            throw err
        } else { 
            var s=0
            for(var i=0;i<rows.length;i++) {    
                if(rows[i].username == objet1 && rows[i].password == objet2) {
                    objet3 += rows[i].id
                    s=1;
                    break;
                }
            }

        if(s==0) {
            res.status(401).json('problem').send();
        } else {
            objet = {...objet, id:objet3}
            res.json(objet).send(); 
        }
    }
})
})

app.post('/create', async (req, res)=>{
    var objet_Tache =[
         req.body.titre,
         req.body.description,
         req.body.date,
         req.body.priorite,
         req.body.etat,
         req.body.categorie,
         req.body.proprietaire
    ]
    const sql = "insert into tache (titre, description, date_fin, priorite, etat, categorie, proprietaire) values (?)"
    const create = await db.query(sql, [objet_Tache], (err)=>{
        if(err){
            throw err
        }
        res.send(objet_Tache)
    })

})
app.delete('/delete/:id',async (req, res)=>{
    var id = req.params.id
    const sql = "delete from tache where id =?"
    const delet = await db.query(sql, [id], (err)=>{
        if(err){
            throw err
        }
        res.json('mrigl').send()
    })
})
app.put('/update/:id',async (req, res)=>{
    var id = req.params.id
    var objet_Tache =req.body
    
    var s =""
    for(var i in objet_Tache){
        s+= i + "=" + "'"+objet_Tache[i]+"'" +","
    }
    const sql = "update tache set " + s.slice(0, -1) +" where id =?"
    const delet = await db.query(sql, id, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    })
})
app.get('/gettaches',async (req,res)=>{
    let sql = 'select * from tache'
    const objet = await db.query(sql,(err, results)=>{
        if(err)
            throw err
        res.send(results)
    })
})

app.get('/gettache/:id',async (req,res)=>{
    let sql = 'select * from tache where id =?'
    var id = req.params.id
    const objet = await db.query(sql, id, (err, results)=>{
        if(err)
            throw err
        res.send(results)
    })
})
app.get('/getusers',async (req,res)=>{
    await db.query("select * from utilisateur", (err, results)=>{
        if(err)
            throw err
        res.send(results)
    })

})
app.get(`/search`,async (req,res)=>{
    const titre = req.query.titre
    await db.query("select * from tache where titre =?", titre, (err, results)=>{
        if(err)
            throw err
        res.send(results)
    })
})
//___________comments___________//

app.get('/get_comments', async(req, res)=>{

    var objet_comment =[
        req.params.id_user,
        req.params.id_tache,
        req.body.body,
        req.body.date,
   ]
    let sql = 'select * from commentaire '
    await db.query(sql,(err,results)=>{
        if(err){
            throw err 
        }
        res.send(results)
    })
})
app.post('/add_comments/:id_tache/:id_user', async(req, res)=>{

    var objet_comment =[
        req.params.id_user,
        req.params.id_tache,
        req.body.body,
        req.body.date,
   ]
    let sql = 'insert into commentaire (id_user, id_tache, body, date) values (?)'
    await db.query(sql, [objet_comment], (err)=>{
        if(err){
            throw err 
        }
        res.json(objet_comment).send()
    })
})
app.get('/get_comment/:id_tache', async(req, res)=>{
    let id_tache = req.params.id_tache
    let sql = 'select * from commentaire where id_tache =?'
    await db.query(sql,id_tache,(err,results)=>{
        if(err){
            throw err 
        }
        res.json(results).send()
    })
})
app.delete('/delete_comment/:id_com', async(req, res)=>{
    let id_com = req.params.id_com
    let sql = 'delete from commentaire where id_com =?'
    await db.query(sql, id_com, (err,results)=>{
        if(err){
            throw err 
        }
        res.json(results).send()
    })
})
app.put('/update_comment/:id_com', async(req, res)=>{ 
    let sql = 'update commentaire set body =?, date =?, modifie=1 where id_com =?'
    await db.query(sql, [req.body.body, req.body.date, req.params.id_com ], (err,results)=>{
        if(err){
            throw err 
        }
        res.json(results).send()
    })
})