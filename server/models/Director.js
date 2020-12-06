const { Schema, model } = require('mongoose')

const Director = new Schema({
	name: String,
	age: Number,
})

module.exports = model('Director', Director)