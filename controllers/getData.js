const getUser = (req,res, db) => {

    const { id } = req.body;
    if (!id) {
        return res.status(400).json('User not found');
    }
    db.select('*').from('users')
    .where('id', '=', id)
    .then(user => {
        return res.json(user[0].entries)
    })
    .catch(err => res.status(400).json('unable to get user'))
         
         
 }

 module.exports = {
    getUser
 }