import {
   CHANNEL_DETAILS_FAIL,
   CHANNEL_VIDEOS_REQUEST,
   CHANNEL_VIDEOS_SUCCESS,
   HOME_VIDEOS_FAIL,
   HOME_VIDEOS_REQUEST,
   HOME_VIDEOS_SUCCESS,
   RELATED_VIDEO_FAIL,
   RELATED_VIDEO_REQUEST,
   RELATED_VIDEO_SUCCESS,
   SEARCHED_VIDEO_FAIL,
   SEARCHED_VIDEO_REQUEST,
   SEARCHED_VIDEO_SUCCESS,
   SELECTED_VIDEO_FAIL,
   SELECTED_VIDEO_REQUEST,
   SELECTED_VIDEO_SUCCESS,
   SUBSCRIPTIONS_CHANNEL_FAIL,
   SUBSCRIPTIONS_CHANNEL_REQUEST,
   SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from '../actionType';

import request from '../../api';

export const getPopularVideos = () => async (dispatch, getState) => {
   try {
      dispatch({ type: HOME_VIDEOS_REQUEST });
      const { data } = await request('/videos', {
         params: {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            regionCode: 'IN',
            maxResults: 20,
            pageToken: getState().homeVideos.nextPageToken,
         },
      });

      dispatch({
         type: HOME_VIDEOS_SUCCESS,
         payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: 'All',
         },
      });
   } catch (error) {
      console.error('Error fetching popular videos:', error.message);
      dispatch({
         type: HOME_VIDEOS_FAIL,
         payload: error.message,
      });
   }
};

export const getVideosByCategory = keyword => async (dispatch, getState) => {
   try {
      dispatch({ type: HOME_VIDEOS_REQUEST });
      const { data } = await request('/search', {
         params: {
            part: 'snippet',
            maxResults: 20,
            pageToken: getState().homeVideos.nextPageToken,
            q: keyword,
            type: 'video',
         },
      });

      dispatch({
         type: HOME_VIDEOS_SUCCESS,
         payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: keyword,
         },
      });
   } catch (error) {
      console.error('Error fetching videos by category:', error.message);
      dispatch({
         type: HOME_VIDEOS_FAIL,
         payload: error.message,
      });
   }
};

export const getVideoById = id => async dispatch => {
   try {
      dispatch({ type: SELECTED_VIDEO_REQUEST });
      const { data } = await request('/videos', {
         params: {
            part: 'snippet,statistics',
            id: id,
         },
      });

      dispatch({
         type: SELECTED_VIDEO_SUCCESS,
         payload: data.items[0],
      });
   } catch (error) {
      console.error('Error fetching video by ID:', error.message);
      dispatch({
         type: SELECTED_VIDEO_FAIL,
         payload: error.message,
      });
   }
};

export const getRelatedVideos = id => async dispatch => {
   try {
      dispatch({ type: RELATED_VIDEO_REQUEST });
      const { data } = await request('/search', {
         params: {
            part: 'snippet',
            relatedToVideoId: id,
            maxResults: 25,
            type: 'video',
         },
      });

      dispatch({
         type: RELATED_VIDEO_SUCCESS,
         payload: data.items,
      });
   } catch (error) {
      console.error('Error fetching related videos:', error.response?.data?.message || error.message);
      dispatch({
         type: RELATED_VIDEO_FAIL,
         payload: error.response?.data?.message || error.message,
      });
   }
};

export const getVideosBySearch = keyword => async dispatch => {
   try {
      dispatch({ type: SEARCHED_VIDEO_REQUEST });
      const { data } = await request('/search', {
         params: {
            part: 'snippet',
            maxResults: 20,
            q: keyword,
            type: 'video,channel',
         },
      });

      dispatch({
         type: SEARCHED_VIDEO_SUCCESS,
         payload: data.items,
      });
   } catch (error) {
      console.error('Error fetching searched videos:', error.message);
      dispatch({
         type: SEARCHED_VIDEO_FAIL,
         payload: error.message,
      });
   }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
   try {
      dispatch({ type: SUBSCRIPTIONS_CHANNEL_REQUEST });
      const { data } = await request('/subscriptions', {
         params: {
            part: 'snippet,contentDetails',
            mine: true,
         },
         headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
         },
      });

      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
         payload: data.items,
      });
   } catch (error) {
      console.error('Error fetching subscribed channels:', error.response?.data || error.message);
      dispatch({
         type: SUBSCRIPTIONS_CHANNEL_FAIL,
         payload: error.response?.data || error.message,
      });
   }
};

export const getVideosByChannel = id => async dispatch => {
   try {
      dispatch({ type: CHANNEL_VIDEOS_REQUEST });
      const { data: { items } } = await request('/channels', {
         params: {
            part: 'contentDetails',
            id: id,
         },
      });

      const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

      const { data } = await request('/playlistItems', {
         params: {
            part: 'snippet,contentDetails',
            playlistId: uploadPlaylistId,
            maxResults: 30,
         },
      });

      dispatch({
         type: CHANNEL_VIDEOS_SUCCESS,
         payload: data.items,
      });
   } catch (error) {
      console.error('Error fetching videos by channel:', error.response?.data?.message || error.message);
      dispatch({
         type: CHANNEL_DETAILS_FAIL,
         payload: error.response?.data?.message || error.message,
      });
   }
};
