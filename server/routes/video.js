import Video from '../models/video'

export default (router) => {
/*
    RETURNS A JSON WITH ALL THE BIRTHDAYS
*/

  router.get('/videos', (req, res) => {
    Video.find({}, (err, video) => {
      res.json(video);
    })
  })

  // router.get('/birthdays/today',(req, res) => {
  //   const moment = require('moment')
  //   const today = new moment();
  //   const todayString = today.format('YYYY-MM-DD');

  //   Birthday.find({date: todayString}, (err, birthdays) => {

  //     res.json(birthdays);

  //   })
  // })


/*
    CREATES NEW BIRTHDAY ENTRY
*/

  router.post('/videos', (req, res) => {
    let video = new Video;

    video.name = req.body.name;
    video.url = req.body.url;

    video.save((err, newVideo) => {
      if(!err){
        res.json({
          success:true
        });
        console.log("Video Saved");
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
  router.get('/videos/:id', (req, res) => {
    const id = req.params.id;
    Video.findById(id, (err, video) => {
      res.json(video);
    })
  })

/*
    DELETES A SPECIFIC BIRTHDAY
    PARAMETERS -> url
      id
*/
  router.delete('/videos/:id', (req, res) =>{
    const id = req.params.id;
    Video.findByIdAndRemove(id, (err) => {
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
  router.put('/videos/:id', (req, res) => {

    const id = req.params.id;
    const name = req.body.name;
    const url = req.body.url;


    Video.findByIdAndUpdate(id, {
      $set: {
        name,
        url
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
