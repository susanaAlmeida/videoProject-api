import Event from '../models/event'
import auth from '../middleware/isAuthenticated'

export default (router) => {

  router.get('/events/today',(req, res) => {
    const moment = require('moment')
    const today = new moment();
    const todayString = today.format('YYYY-MM-DD');

    Event.find({date: todayString}, (err, events) => {

      res.json(events);

    })
  })

  router.get('/events', auth,(req, res) => {
    Event.find({}, (err, events) => {
      res.json(events);
    })
  })

  router.get('/events/:id', auth,(req, res) => {
    var id = req.params.id;
    Event.findById(id, (err, events) => {
      res.json(events);
    })
  })

  router.delete('/events/:id', auth,(req, res) => {
    var id = req.params.id;
    Event.findByIdAndRemove(id, (err) => {
      if (!err) {
        res.json({
          'success':true
        });
      }
      else{
        res.json({
          'success':false
        });
      }
    })
  })

  router.post('/events', auth,(req, res) => {
    const newevent = req.body;
    const event = new Event(newevent)

    event.save((err, newEvent) => {
      if (err) {
        console.log(err);
        res.json({
          'success':false
        });
      } else {
        res.json({
          'success':true
        });
      }
    })
  })

  router.put('/events/:id', auth,(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const room = req.body.room;
    const date = req.body.date;
    const icon = req.body.icon;
    const time_start = req.body.time_start;
    const time_end = req.body.time_end;
    const time_other = req.body.time_other;

    Event.findByIdAndUpdate(id, {
      $set: {
        title,
        room,
        date,
        time_start,
        time_end,
        time_other,
        icon
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
