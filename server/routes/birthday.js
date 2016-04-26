import Birthday from '../models/birthday'
import auth from '../middleware/isAuthenticated'

export default (router) => {
/*
    RETURNS A JSON WITH ALL THE BIRTHDAYS
*/

  router.get('/birthdays', auth, (req, res) => {
    Birthday.find({}, (err, birthday) => {
      res.json(birthday);
    })
  })

  router.get('/birthdays/today',(req, res) => {
    const moment = require('moment')
    const today = new moment();
    const todayString = today.format('YYYY-MM-DD');

    Birthday.find({date: todayString}, (err, birthdays) => {

      res.json(birthdays);

    })
  })


/*
    CREATES NEW BIRTHDAY ENTRY
*/

  router.post('/birthdays', auth, (req, res) => {
    let birthday = new Birthday;

    birthday.first_name = req.body.first_name;
    birthday.last_name = req.body.last_name;
    birthday.role = req.body.role;
    birthday.employee_since = req.body.employee_since;
    birthday.cake_time = req.body.cake_time;
    birthday.birthday = req.body.birthday;

    Birthday.save((err, newBirthday) => {
      if(!err){
        res.json({
          success:true
        });
        console.log("Birthday Saved");
      } else {
        res.json({
          success:false
        });
        console.log(err);
      }
    })
  })

/*
    GET AN SPECIFIC BIRTHDAY
    PARAMETERS -> url
      id
*/
  router.get('/birthdays/:id', auth, (req, res) => {
    const id = req.params.id;
    Birthday.findById(id, (err, birthday) => {
      res.json(birthday);
    })
  })

/*
    DELETES A SPECIFIC BIRTHDAY
    PARAMETERS -> url
      id
*/
  router.delete('/birthdays/:id', auth, (req, res) =>{
    const id = req.params.id;
    Birthday.findByIdAndRemove(id, (err) => {
      if (!err) {
        res.json({
          'success': true
        });
      } else {
        res.json({
          'success': false
        });
      }
    })
  })

/*
    UPDATE A SPECIFIC BIRTHDAY
    PARAMETERS -> url
      id
      firstName
      role
      employeeSince
      today
*/
  router.put('/birthdays/:id', auth, (req, res) => {

    const id = req.params.id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const role = req.body.role;
    const employee_since = req.body.employee_since;
    const cake_time = req.body.cake_time;
    const birthday = req.body.birthday;

    Birthday.findByIdAndUpdate(id, {
      $set: {
        first_name,
        last_name,
        role,
        employee_since,
        cake_time,
        birthday
      }
    },
    (err) => {
      if (!err) {
        res.json({
          'success': true
        });
      } else {
        res.json({
          'success': false
        });
      }
    })
  })
}
