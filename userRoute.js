const user = require('./userModels')
const router = require('express').Router()


//add user  post
router.post('/add', async (req, res) => {
	const newUser = new user(
	{
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		age: req.body.age,
		phone_number: req.body.phone_number,
		email: req.body.email
	})
	if (!req.body.username ||
		!req.body.phone_number ||
		!req.body.email)
	{
		res.status(422).json('Some fields are missing!')
		return
	}
	try {
		const savedUser = await newUser.save()
		res.status(200).json(savedUser)

	} catch (err) {

		res.status(500).json(err)
	}

})

//show all users   get

router.get('/allusers', async (req, res) => {

	try {
		const users =await user.find()
		res.status(200).json(users)
	}

	catch (err) {
		res.status(500).json(err)
	}
})

//update user put

router.put('/update/:id', async (req, res) => {

	try {
		const updateduser = await user.findByIdAndUpdate(
			req.params.id,
			{
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			age: req.body.age,
			phone_number: req.body.phone_number,
			email: req.body.email
			},
			{ new: true }
		)
		console.log(updateduser)
		res.status(200).json(updateduser)
	}
	catch (err) {
		res.status(500).json(err)
	}
})

//delete user  delete

router.delete('/delete/:id', async (req, res) => {

	try {
		await user.findByIdAndDelete(req.params.id)
		res.status(200).json('User has been deleted')

	}
	catch (err) {

		res.status(500).json(err)

	}
})

module.exports=router