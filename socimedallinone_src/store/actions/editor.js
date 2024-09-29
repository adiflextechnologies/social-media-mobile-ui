import api from '../../service';

import {
	SET_EDITOR_VALUES,
	SET_FRAME,
	ADD_FRAME,
	SET_BACKGROUND_SIZE,
	REMOVE_FRAME,
	ADD_TEXT,
	REMOVE_TEXT,
	UPDATE_TEXT_STYLE,
	SET_ACTIVE_ITEM,
	REMOVE_ACTIVE_ITEM,
	ADD_PHOTO,
	UPDATE_IMAGE_STYLE,
	REMOVE_PHOTO,
	CHANGE_TEXT_POSITION,
	CHANGE_IMAGE_POSITION,
	SET_UPDATE_TEXT,
	SET_UPDATED_TEXT,
	SET_UPDATE_PHOTO,
	SET_UPDATED_PHOTO,
	ADD_CANVAS,
	UPDATE_CANVAS_STYLE,
	PASS_CANVAS_ACTIONS,
	SET_UPDATED_CANVAS,
	SET_BACK_IMAGES,
	REMOVE_BACK_IMAGES,
	ADD_BACKGROUND_REMOVED_IMAGE,
	TOGGLE_AI_IMAGE
} from '../actionsTypes';
import { getImageSize } from '../helper';

export const getFrames = () => (dispatch, getState) => {
	dispatch({ type: SET_EDITOR_VALUES, payload: { isFrameLoading: true } });
	const user_id = getState().user.userid;
	return api.posts.getFrames({ user_id }).then(({ data }) => {
		const stickers = data.output.map((item) => item.images);
		dispatch({ type: SET_FRAME, payload: stickers });
	});
};

export const addFrame = (data) => (dispatch, getState) => {
	return dispatch({ type: ADD_FRAME, payload: data });
};

export const addText = (data) => (dispatch, getState) => {
	return dispatch({ type: ADD_TEXT, payload: data });
};

export const addImage = (data) => (dispatch, getState) => {
	// dispatch(removeBackground(data));
	return dispatch({ type: ADD_PHOTO, payload: data });
};

export const addCanvas = (data) => (dispatch, getState) => {
	return dispatch({ type: ADD_CANVAS, payload: data });
};

export const removeImage = (id) => (dispatch, getState) => {
	return dispatch({ type: REMOVE_PHOTO, payload: { id } });
};

export const updateTextStyle = (style) => (dispatch, getState) => {
	return dispatch({ type: UPDATE_TEXT_STYLE, payload: { style } });
};

export const updateCanvasStyle = (style) => (dispatch, getState) => {
	return dispatch({ type: UPDATE_CANVAS_STYLE, payload: { style } });
};

export const passCanvasAction = (data) => (dispatch, getState) => {
	return dispatch({ type: PASS_CANVAS_ACTIONS, payload: data });
};

export const updateImageStyle = (style) => (dispatch, getState) => {
	return dispatch({ type: UPDATE_IMAGE_STYLE, payload: { style } });
};

export const setBackImages = (id) => (dispatch, getState) => {
	return dispatch({ type: SET_BACK_IMAGES, payload: { id } });
};

export const removeBackImages = (id) => (dispatch, getState) => {
	return dispatch({ type: REMOVE_BACK_IMAGES, payload: { id } });
};

export const removeFrame = () => (dispatch, getState) => {
	return dispatch({ type: REMOVE_FRAME });
};

export const removeText = (id) => (dispatch, getState) => {
	return dispatch({ type: REMOVE_TEXT, payload: { id } });
};

export const setActiveItem =
	(id, style, type, data, restData) => (dispatch, getState) => {
		return dispatch({
			type: SET_ACTIVE_ITEM,
			payload: { id, style, type, data, restData }
		});
	};

export const removeActiveItem = () => (dispatch, getState) => {
	return dispatch({ type: REMOVE_ACTIVE_ITEM });
};

export const setImageSize = (data) => (dispatch, getState) => {
	return getImageSize(data).then((response) => {
		return dispatch({ type: SET_BACKGROUND_SIZE, payload: response });
	});
};
//{id, xValue, yValue}
export const changeTextPosition = (param) => (dispatch, getState) => {
	return dispatch({ type: CHANGE_TEXT_POSITION, payload: param });
};

//{id, xValue, yValue}
export const changeImagePosition = (param) => (dispatch, getState) => {
	return dispatch({ type: CHANGE_IMAGE_POSITION, payload: param });
};

export const setUpdateText = (data) => (dispatch, getState) => {
	return dispatch({ type: SET_UPDATE_TEXT, payload: data });
};

export const updateText = (data) => (dispatch, getState) => {
	return dispatch({ type: SET_UPDATED_TEXT, payload: data });
};

export const updateCanvas = (data) => (dispatch, getState) => {
	return dispatch({ type: SET_UPDATED_CANVAS, payload: data });
};

export const setUpdatePhot = (data) => (dispatch, getState) => {
	return dispatch({ type: SET_UPDATE_PHOTO, payload: data });
};
export const toggleAiImg = (data) => (dispatch, getState) => {
	return dispatch({ type: TOGGLE_AI_IMAGE, payload: data });
};

export const updatePhoto = (data) => (dispatch, getState) => {
	// dispatch(removeBackground(data));
	return dispatch({ type: SET_UPDATED_PHOTO, payload: data });
};

export const removeBackground = (imgData) => (dispatch, getState) => {
	const images = getState().editor.images || [];

	const reqImgData = images.find((item) => item.id === imgData.id);
	if (reqImgData.aiImg) {
		return;
	}
	const data = new FormData();
	data.append('file', {
		uri: imgData.data, // local image URI
		name: 'image.jpg',
		type: 'image/jpeg'
	});

	// // axios.create()

	// try {
	// 	const result = await api.ai.getRemovedImg(data);
	// 	console.log('Result ==> ', result);
	// } catch (error) {
	// 	console.log('Error ==> ', JSON.stringify(error));
	// }

	api.ai
		.getRemovedImg(data)
		.then((response) => {
			const dispatchData = {
				aiImgUri: response.data.s3_url,
				id: imgData.id
			};

			return dispatch({
				type: ADD_BACKGROUND_REMOVED_IMAGE,
				payload: dispatchData
			});
		})
		.catch((error) => {
			console.log('++> ', JSON.stringify(error));
		});
};
