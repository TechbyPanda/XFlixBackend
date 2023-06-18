const { videoService } = require('../services/')
const catchAsync = require('../utils/catchAsync')
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

// const getVideos = catchAsync(async (req, res) => {
//     const videos = await videoService.getVideos();
//     console.log(videos.length)
//     res.send({ videos: videos});
// })

const getVideos = catchAsync(async (req, res) => {
    let videos = null;
    console.log(req.query)
    if(req.query.sortBy){
        videos = await videoService.sortBy(req.query);
    }else if(Object.keys(req.query).length !== 0){
        videos = await videoService.filter(req.query)
    }else{
        videos = await videoService.getVideos();
    }
    res.send({ videos: videos});
})

const getVideoById = catchAsync(async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);
    res.send(video);
})

const addVideo = catchAsync(async (req, res) => {
    const data = await videoService.addVideo(req.body);
    res.status(httpStatus.OK).send(data);
})

const handleVotes = catchAsync(async (req, res) => {
    if(req.body.change === "increase"){
        if(req.body.vote === "upVote"){
            await videoService.incrementUpVotes(req.params.videoId);
        }else if(req.body.vote === "downVote"){
            await videoService.incrementDownVotes(req.params.videoId);
        }else{
            throw new ApiError(httpStatus.BAD_REQUEST, "Please send correct parameter.");
        }
    }else if(req.body.change === "decrease"){

    }else{
        throw new ApiError(httpStatus.BAD_REQUEST, "Please send correct parameter.");
    }
    res.status(httpStatus.NO_CONTENT).send()
})

const handleViews = catchAsync(async (req, res) => {
    await videoService.incrementViews(req.params.videoId);
    res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
    getVideos,
    addVideo,
    getVideoById,
    handleVotes,
    handleViews
}