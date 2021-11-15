const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = 8080; // default port 8080
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');

<<<<<<< HEAD
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ["lighthouselabs", "key2"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
=======
app.set('view engine' ,'ejs')
app.use(cookieParser())
>>>>>>> feature/user-registration

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW"
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "userRandomID"
  }
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

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: bcrypt.hashSync("purple-monkey-dinosaur", 10)
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password:  bcrypt.hashSync("dishwasher-funk", 10)
  }
};

const validateRegister = (email, password) => {
  if (!email || !password) {
    return false;
  }
  for (let key in users) {
    const userEmail = users[key].email;
    if (email === userEmail) {
      return true;
    }
  }
  if (!email && !password) {
    return false;
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello!");
});


app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
 
app.get("/urls", (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    const userOBJ = users[`${userId}`];
    const templateVars = {
      userInfo: userOBJ,
      //username: req.cookies["username"],
      userId: req.session.userId,
      urls: getUserUrlsList(urlDatabase, userId),

      //urls: urlDatabase,
    };
    console.log("users", users);
    console.log("urlDatabase", urlDatabase);
    console.log("TEST", templateVars);
    res.render("urls_index", templateVars);
  } else {
    res.redirect("/login");
  }
});

<<<<<<< HEAD
app.get("/urls/new", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/login");
    return;
  }

  const userInfo = users[userId];
  if (!userInfo) {
    res.redirect("/login");
    return;
  }

  const templateVars = {
    userInfo,
    urls: urlDatabase,
=======
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
    
>>>>>>> feature/user-registration
  };

  res.render("urls_new", templateVars);
});

<<<<<<< HEAD
app.get("/login", (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    res.redirect("/urls");
  }
  const userOBJ = users[userId];
  const templateVars = {
    userInfo: userOBJ,
    urls: urlDatabase,
  };

  res.render("login", templateVars);
});

app.get("/register", (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    res.redirect("/urls");
  }
  const userOBJ = users[userId];
  const templateVars = {
    userInfo: userOBJ,
    urls: urlDatabase,
  };

  res.render("urls_register", templateVars);
});
=======


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

>>>>>>> feature/user-registration

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const url = urlDatabase[shortURL];

  const templateVars = {
    shortURL,
    longURL: url.longURL ,
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const url = urlDatabase[shortURL];

  const templateVars = {
    shortURL,
    longURL: url.longURL ,
  };
  res.redirect("urls_show" , templateVars);
});

app.post("/urls", (req, res) => {
  const userID = req.session.userId;
  console.log("req.body", req.body, userID);
  if (!userID) {
    res.redirect("/login");
    return;
  }

  const userInfo = users[userID];
  if (!userInfo) {
    res.redirect("/login");
    return;
  }

  // Log the POST request body to the console
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();

  urlDatabase[shortURL] = {userID, longURL};

  res.redirect("/urls");
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});

app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL].longURL = req.body.longURL;
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
<<<<<<< HEAD
  //res.cookie('user_id')
  req.session.userId = null;
  res.redirect("/urls");
});

const authenticateUser = function(email, password) {
  //bcrypt.compareSync(password,users[key].password);
  for (let key in users) {
    if (users[key].email === email &&  bcrypt.compareSync(password,users[key].password)) {
      return users[key];
    }
  }
  return false;
};
//Used when you have username and password
app.post("/login", (req, res) => {
   
  const result = authenticateUser(req.body.email, req.body.password);
  console.log("result", result);
  //if the username and password went well and everything is ok.
  if (result) {
    req.session.userId = result.id;
    res.redirect("/urls");
  } else {
    res
      .status(403)
      .send("Forbidden. Please try again with another username and password");
      
  }
});

app.post("/register", (req, res) => {
 
  const userFound = validateRegister(req.body.email, req.body.password);
  if (!userFound) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const userId = generateRandomString();
    const newUserObject = {
      id: userId,
      email: req.body.email,
      password: hashedPassword,
    };
    users[userId] = newUserObject;
    req.session.userId = userId;
    res.redirect("/urls");
  } else {
    res.status(400).send("not a valid email or password");
  }
});
=======
  //res.cookie('user_id') 
  res.clearCookie('user_id');
   res.redirect("/urls")
  
})
>>>>>>> feature/user-registration

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

const generateRandomString = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomString = randomString + characters[randomNum];
  }
  return randomString;
};
const getUserUrlsList = (urlDatabase, id) => {
  const userUrlsList = {};
  for (let shortURL in urlDatabase) {
    if (urlDatabase[shortURL].userID === id) {
      userUrlsList[shortURL] = urlDatabase[shortURL];
    }
  }
  return userUrlsList;
};


