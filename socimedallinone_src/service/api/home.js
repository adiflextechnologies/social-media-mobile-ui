const getHome = ({post, get}) => {
  const getUserDetails = id => {
    return get(`/user_details_by_user_id?id=${id}`);
  };

  const getDashboard = () => {
    return get('/home_content_for_android');
  };

  const getVideos = id => {
    return get(`/movies?id=${id}&page=1`);
  };

  const getReels = () => {
    return get(`/common_reels_list`);
  };

  const getDetailsByCatId = id => {
    return get(`/content_by_genre_id?id=${id}&page=1`);
  };

  const getDetailsByImgId = id => {
    return get(`/single_details?type=tvseries&id=${id}`);
  };

  const getReelsByCatId = id => {
    return get(`reels_list?video_id=${id}`);
  };

  return {
    getUserDetails,
    getDashboard,
    getVideos,
    getReels,
    getDetailsByCatId,
    getReelsByCatId,
    getDetailsByImgId,
  };
};

export default getHome;
// user_details_by_user_id?id=1584	587	json	200	939087	5267775534
// home_content_for_android	21618	json	200	937594	5267922717
