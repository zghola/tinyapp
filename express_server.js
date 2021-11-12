const express = require("express");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080; // default port 8080

app.set('view engine' ,'ejs')
app.use(cookieParser())

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users= { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

const validateRegister = (email, password) => {
 if(!email || !password  ){
   return false
 }
 for(key in users){
   const userEmail = users[key].email;
   if(email === userEmail){
      return true;
   }
 }
 if(!email && !password){
  return false
 }
 
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("Hello!");
});


app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
});
  
app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
});

app.get("/urls", (req, res) => {
  const userId = req.cookies["user_id"]
  const userOBJ = users[userId]

 
  const templateVars = {
    userInfo : userOBJ, 
    //username: req.cookies["username"],
    userId: req.cookies["user_id"],
    urls: urlDatabase
    
  };
  console.log("TEST", templateVars);
  res.render("urls_index", templateVars);
  
});

app.get("/urls/new", (req, res) => {
  const userId = req.cookies["user_id"]
  console.log("userId", userId)
  const userOBJ = users[userId]
  const templateVars = { 
    userInfo : userOBJ,
    urls: urlDatabase,
    
  };
  console.log("git")
  res.render("urls_new", templateVars);
});



app.get('/login' , (req, res) => {
  const userId = req.cookies["user_id"]
  const userOBJ = users[userId]
  const templateVars = { 
    userInfo : userOBJ,
    urls: urlDatabase,
    
  };
  
  res.render("login", templateVars);
  
})

app.get("/register" , (req, res) => {
  const userId = req.cookies["user_id"]
  const userOBJ = users[userId]
  const templateVars = { 
    userInfo : userOBJ,
    urls: urlDatabase,
    
  };
  
  res.render("urls_register", templateVars);

})


app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: req.params.shortURL/* What goes here? */ };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase["b2xVn2"]
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  const longURL = req.body.longURL
  const shortURL = generateRandomString()

  urlDatabase[shortURL] = longURL

  res.redirect(`/urls/${shortURL}`)
 
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
   delete urlDatabase[shortURL]
   res.redirect("/urls")
});

app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL
  res.redirect("/urls")
})

app.post("/logout", (req, res) => {
  res.cookie('user_id') 
   res.redirect("/urls")
  
})

const authenticateUser = function(email, password){
  for(let key in users){
    if(users[key].email === email && users[key].password===password){
      return users[key];
    }
  }
  return false;
}
//Used when you have username and password
app.post("/login", (req, res) => {
  const result  = authenticateUser(req.body.email ,  req.body.password)
  //if the username and password went well and everything is ok.
  if(result){
    res.cookie('user_id',  result.id);
    res.redirect("/urls")
  } else{
    res.status(403).send("Forbidden. Please try again with another username and password")
  }
  
});
  
 


app.post("/register", (req, res) => {
  const userFound  = validateRegister(req.body.email ,  req.body.password)
  if(!userFound){
    const userId = generateRandomString()
    const newUserObject = {
      id : userId,
      email : req.body.email,
      password:req.body.password
    
    };
    users[userId] = newUserObject
    res.cookie('user_id',  userId)
    res.redirect("/urls")
 
  }else{
    res.status(400).send("not a valid email or password")
  }
  
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

function generateRandomString() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';
  for ($i = 0; $i < 6; $i++) {
    const randomNum = Math.floor(Math.random() * characters.length)
    randomString = randomString + characters[randomNum]     
  }
  return randomString;
}
