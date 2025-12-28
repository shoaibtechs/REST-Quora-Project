const express =  require("express");
const app =  express();
const port = 8080;
const path =  require("path");
const methodOverride = require("method-override");
const{v4 : uuidv4} = require('uuid');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views" ));

app.use(express.static(path.join(__dirname, "public")))


app.listen(port, ()=>{

    console.log(`The Server is listening at port ${port}`);


})

let posts =  [

    {
        id : uuidv4(),
        username : "Shoaib",
        content : "I Love Coding "


    },


    {   
        id : uuidv4(),
        username : "Jawad",
        content : " I am genius in coding "


    }, 
    
    {   
       
        id : uuidv4(),
        username : "Waleed",
        content : "I am legend in coding "


    }


]



app.get("/posts", (req, res)=>{

    res.render("index.ejs", {posts});

})


app.get("/posts/new", (req, res)=>{

    res.render("new.ejs");



})


app.post("/posts", (req, res)=>{


    console.log(req.body);
    let {username, content} =  req.body;
    let id =  uuidv4();

    posts.push({id, username, content});
    res.redirect("/posts");


})

app.get("/posts/:id", (req, res)=>{


    let {id} =  req.params;
    
    let post =  posts.find((p)=> id === p.id);

    if(post)
    {
        res.render("show.ejs", {post});

    }
    

    else{

        res.render("error.ejs");

    }
    
    
    
})


app.get("/posts/:id/edit", (req, res)=>{


    let{id} =  req.params;

    let post =  posts.find((p)=> id === p.id);

    res.render("edit", {post});



})







app.patch("/posts/:id", (req, res)=>{

    let{id} = req.params;
    let newContent =  req.body.content;
    
    let post =  posts.find((p)  => id ===p.id);

    post.content =  newContent;


    console.log(`New content: ${newContent}`);
    res.redirect("http://localhost:8080/posts");


    
})



app.delete("/posts/:id", (req, res)=>{


    let{id} = req.params;
     posts =  posts.filter((p)=> id !== p.id);
    res.redirect("/posts");


})