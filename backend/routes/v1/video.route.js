const express = require('express');
const { videoController } = require('../../controllers')

const router = express.Router();

router.get('/', videoController.getVideos)
router.post('/', videoController.addVideo)
router.get('/:id', videoController.getVideoById)
router.patch('/:videoId/votes', videoController.handleVotes)
router.patch('/:videoId/views', videoController.handleViews)

module.exports = router;