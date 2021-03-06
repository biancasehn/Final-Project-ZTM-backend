const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '496f17b01bef49a19800f6e73da9189d'
   });  

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req,res, db) => {
    const { id } = req.body;
    
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        console.log("entries",entries)
        return res.json(entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}