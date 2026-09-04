const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const database ={
	users:[
		{
			id: '123',
			name: 'john',
			password: "john",
			email: 'john@gmail.com',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'jack',
			password: "john",
			email: 'jack@gmail.com',
			entries: 0,
			joined: new Date()
		}
	],
	login:[
		{
			id: '987',
			has: '',
			email: 'john@gmail.com'	
		}

	]
}

// Basic route --> root

app.get('/', (req,res)=>{
	//res.send('This is the root request');
	// This will show us the users that we have
	res.send(database.users);
})

// Sign in

app.post('/signin', (req,res)=>{
	bcrypt.compare("FE", "$2a$10$1CFKDtxdsE4qftzH1VMEQ.mScSp1MW8VGMwMxL/7ApmVD8a8D.XoS", function(err, res) {
    // res == true
    console.log(res);	
	});
	if(req.body.email === database.users[0].email && 
		req.body.password=== database.users[0].password){
			//res.json('success');
				res.json(database.users[0]);
	}else{
		res.json('Error login in ');
	}
	//res.json('Sign in ');
})

// Register

app.post('/register', (req,res)=>{
	const {email, name, password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
		console.log(hash);
    // Store hash in your password DB.
	});

	database.users.push({
		id: '124',
		name: name,
		email: email,
		//password: password,
		entries: 0,
		joined: new Date()
	})
	// we also have to return a response and we are returning with the last user that has been created.
	res.json(database.users[database.users.length-1]);
})

// Profile
app.get('/profile/:id', (req,res) =>{
	const {id} = req.params;
	let found = false;
	database.users.forEach(users=>{
		if(users.id === id){
			found = true;
			return res.json(users);
		}
	})
	if(!found){
		res.status(404).json("User not found. Please try again later");
	}
})

// image 
app.put('/image', (req,res)=>{
	const {id} = req.body;
	let found = false;
	database.users.forEach(users=>{
		if(users.id === id){
			found = true;
			users.entries++;
			return res.json(users.entries);
		}
	})
	if(!found){
		res.status(404).json("User not found. Please try again later");
	}

})


app.listen(3000, ()=>{
	console.log('Server listening at port 3000');
})

/*
API PLANNING

1. / --> res = This is the root request
2. /signin --> POST = success/fail
3. /register --> POST = user object is returned
4. /profile/:userId --> GET == user is returned
5. /image --> PUT --> updated user object is returned.

*/