import Meeting from '../models/meeting'
import auth from '../middleware/isAuthenticated'

export default (router) => {
/*
    RETURNS A JSON WITH ALL THE MEETING
*/

  router.get('/meetings', auth, (req, res) => {
    Meeting.find({}, (err, meeting) => {
      res.json(meeting);
    })
  })


/*
    CREATES NEW MEETING ENTRY
    PARAMETERS -> url
      id
    PARAMETERS -> body
      firstName
      role
      employeeSince
      today
*/

  router.get('/meetings/today',(req, res) => {
      const moment = require('moment')
      const today = new moment();
      const todayString = today.format('YYYY-MM-DD');

      Meeting.find({date: todayString}, (err, meetings) => {
        res.json(meetings);
      })
    })

  router.post('/meetings', auth, (req, res) => {
    let meeting = new Meeting;

    meeting.first_name = req.body.first_name;
    meeting.last_name = req.body.last_name;
    meeting.role = req.body.role;
    meeting.room_name = req.body.room_name;
    meeting.company_name = req.body.company_name;
    meeting.meeting_logo = req.body.meeting_logo;
    meeting.date = req.body.date;
    meeting.time_start = req.body.time_start;

    Meeting.save((err, newMeeting) => {
      if(!err){
        res.json({
          success:true
        });
        console.log("Meeting Saved");
      } else {
        res.json({
          success:false
        });
        console.log(err);
      }
    })
  })

/*
    GET AN SPECIFIC MEETING
    PARAMETERS -> url
      id
*/
  router.get('/meetings/:id', auth, (req, res) => {
    const id = req.params.id;
    Meeting.findById(id, (err, meeting) => {
      res.json(meeting);
    })
  })

/*
    DELETES A SPECIFIC MEETING
    PARAMETERS -> url
      id
*/
  router.delete('/meetings/:id', auth, (req, res) =>{
    const id = req.params.id;
    Meeting.findByIdAndRemove(id, (err) => {
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
    UPDATE A SPECIFIC MEETING
    PARAMETERS -> url
      id
    PARAMETERS -> body
      firstName
      role
      employeeSince
      today
*/
  router.put('/meetings/:id', auth, (req, res) =>{

    const id = req.params.id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const role = req.body.role;
    const room_name = req.body.room_name;
    const company_name = req.body.company_name;
    const meeting_logo = req.body.meeting_logo;
    const date = req.body.date;
    const time_start = req.body.time_start;

    Meeting.findByIdAndUpdate(id, {
      $set: {
        first_name,
        last_name,
        role,
        room_name,
        company_name,
        meeting_logo,
        date,
        time_start
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
