const getImgProcess = ({ post, get }) => {
	const getRemovedImg = (data) => {
		return post(`/api/remove_bg`, data);
	};

	return {
		getRemovedImg
	};
};

export default getImgProcess;
// user_details_by_user_id?id=1584	587	json	200	939087	5267775534
// home_content_for_android	21618	json	200	937594	5267922717
