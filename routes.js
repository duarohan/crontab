const express = require('express');
const cronController = require('./controller/cronController');
const router = express.Router();

router.get('/cron', cronController.getCron)
router.post('/cron', cronController.postCron)
router.put('/cron/:id', cronController.putCron)
router.delete('/cron/:id', cronController.deleteCron)

router.get('/ping', (req, res) => {
  res.status(200).send(
    {
      status: 200,
      data: 'PONG',
    },
  );
});


module.exports = router;
