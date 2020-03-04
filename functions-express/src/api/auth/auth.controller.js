const { db } = require('../../db')

const controller = {};

controller.authenticate = (req, res, next) => {
    db.collection('users')
    .where('username', '==', req.body.username)
    .where('password', '==', req.body.password)
    .get()
    .then( snapShot => {
      let users = []
      snapShot.forEach( doc => {
        let obj = doc.data();
        obj.id = doc.id
        users.push(obj)
      })

      if(users.length > 0){
        return res.json({auth: true, user: users[0]})
      }else{
        return res.json({auth: false, user: {}})
      }
    })
    .catch(e => res.json({success: false, error: e}))
  // res.json({success: true, path: 'getAuth'})
}

module.exports = {
  controller: controller
}
