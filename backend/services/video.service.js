const httpStatus = require('http-status');
const { Video } = require('../models');
const ApiError = require('../utils/ApiError');

const getVideos = () => {
    return Video.find();
}

const getVideoById = (id) => {
    return Video.findById(id);
}


const addVideo = async (video) => {
  const data = await Video.create(video);

    if(!data)
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to add video.");

        return data;
      }
      
const incrementUpVotes = async (videoId) => {
    try {
      const updatedVideo = await Video.findOneAndUpdate(
        { _id: videoId },
        { $inc: { 'votes.upVotes': 1 } },
        { new: true }
      );
  
      if (!updatedVideo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Video not found.');
      }
  
      return updatedVideo;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update votes.');
    }
  };
  
  const incrementDownVotes = async (videoId) => {
    try {
      const updatedVideo = await Video.findOneAndUpdate(
        { _id: videoId },
        { $inc: { 'votes.downVotes': 1 } },
        { new: true }
        );
        
        if (!updatedVideo) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Video not found.');
    }

    return updatedVideo;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update votes.');
  }
};

const incrementViews = async (videoId) => {
  try {
    const updatedVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { $inc: { 'viewCount': 1 } },
      { new: true }
    );

    if (!updatedVideo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Video not found.');
    }

    return updatedVideo;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update votes.');
  }
};

const filter = async (query) => {
  let filterObj = {};

  if(query.title){
    const regex = new RegExp(query.title, 'i');
    filterObj.title = { $regex: regex };
  }

  

  if(query.genres){
    filterObj.genre = { $in: query.genres.split(",")}
  }

  if(query.contentRating){
    filterObj.contentRating = query.contentRating;
  }
  console.log(filterObj);
  try{
    // const videos = await Video.find({genre: {$in: ["Movies"]}})
    const videos = await Video.find(filterObj)
    return videos;
  }catch(error){
    console.log(error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Not able to find data.")
  }
}

const sortBy = (query) => {
    const sortValue = query.sortBy;

    return Video.find().sort({ [sortValue]: -1 });
}

module.exports = {
    getVideos,
    getVideoById,
    sortBy,
    addVideo,
    incrementUpVotes,
    incrementViews,
    incrementDownVotes,
    filter
}