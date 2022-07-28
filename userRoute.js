const user = require('./userModels')
const multer = require('multer')
const router = require('express').Router()

const Storage = multer.diskStorage(
	{
		destination: (req, file, cb) => {
			cb(null, './images')
		},

		filename: (req, file, cb) =>
		{
			cb(null, Date.now() + "--" + file.originalname)
		}

});

const upload = multer({ storage: Storage }).single('image')

router.post('/add',upload,async(req, res) => {  //add user(post)

	if (!req.body.username || !req.body.phone_number || !req.body.email) {
		res.status(422).json('Some fields are missing!')
		return
	}

	const newUser = new user({first_name: req.body.first_name, last_name: req.body.last_name,
		username: req.body.username, age: req.body.age, phone_number: req.body.phone_number,
		email: req.body.email,image: req.file.filename,})
        
	try {
		const savedUser = await newUser.save()
		res.status(200).json(savedUser)
	} catch (err) {
		res.status(500).json('User with these credentials already exists!')
	}
})

router.get('/allusers', async (req, res) => {  //show all users(get)

	try {
		const users = await user.find()
		res.status(200).json(users)
		}
	catch (err) {
		res.status(500).json(err)
	}
})

router.put('/update/:id',upload , async (req, res) => { //update user(put)
	try
	{
		const updateduser = await user.findByIdAndUpdate(req.params.id,
			{	first_name: req.body.first_name,last_name: req.body.last_name,
				username: req.body.username, age: req.body.age, phone_number: req.body.phone_number,
				email: req.body.email,image:req.file.filename
			},{ new: true }
	)
		console.log(updateduser)
		res.status(200).json(updateduser)
	}
	catch (err) {res.status(500).json(err)}
})

router.delete('/delete/:id', async (req, res) => {  //delete user(delete)
	try
	{
		await user.findByIdAndDelete(req.params.id)
		res.status(200).json('User has been deleted')
	}
	catch (err) {
		res.status(500).json(err)
	}
})
module.exports=router