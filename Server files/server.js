const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const database ={
	users:[
		{
			id: '123',
			name: 'john',
			email: 'john@gmail.com',
			password: 'pwd',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'jack',
			email: 'jack@gmail.com',
			password: 'jack',
			entries: 0,
			joined: new Date()
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
	if(req.body.email === database.users[0].email && 
		req.body.password=== database.users[0].password){
			res.json('Sign in success ');
	}else{
		res.json('Error login in ');
	}
	//res.json('Sign in ');
})

// Register

app.post('/register', (req,res)=>{
	const {email, name, password} = req.body;
	database.users.push({
		id: '124',
		name: name,
		email: email,
		password: password,
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