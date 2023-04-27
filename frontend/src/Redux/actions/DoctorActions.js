import {
    NOTES_CREATE_FAIL,
    NOTES_CREATE_REQUEST,
    NOTES_CREATE_SUCCESS,
    NOTES_DELETE_FAIL,
    NOTES_DELETE_REQUEST,
    NOTES_DELETE_SUCCESS,
    NOTES_LIST_FAIL,
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS,
    NOTES_UPDATE_FAIL,
    NOTES_UPDATE_REQUEST,
    NOTES_UPDATE_SUCCESS,
  } from "../constants/DoctorConstants";
  import axios from "axios";
import axiosConfig from "../../axiosConfig";
  
  export const listNotes = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/notes`, config);
  
      dispatch({
        type: NOTES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createNoteAction =


    (title, content,pic) => async (dispatch, getState) => {


      try {

  console.log("action reached",pic,content)

        dispatch({
          type: NOTES_CREATE_REQUEST,
        });
  
 

 const { data } = await axiosConfig.post(
    `/api/doctors/create`,{ title, content,pic },
    
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
      },
    }
  );
 

    
  
        dispatch({
          type: NOTES_CREATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: NOTES_CREATE_FAIL,
          payload: message,
        });
      }
    };
  
  export const deleteNoteAction = (blogId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_DELETE_REQUEST,
      });
  
      
  
 const { data } = await axiosConfig.delete(
    `/api/doctors/deleteBlog/${blogId}`,
    
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
      },
    }
  );
  
      dispatch({
        type: NOTES_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateNoteAction =
    (blogId, title, content, pic) => async (dispatch, getState) => {
      try {
        dispatch({
          type: NOTES_UPDATE_REQUEST,
        });
  
  console.log("22okk")
       
 const { data } = await axiosConfig.put(
    `/api/doctors/editBlog/${blogId}`,
          { title, content, pic },
    
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
      },
    }
  );
  
        
        dispatch({
          type: NOTES_UPDATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: NOTES_UPDATE_FAIL,
          payload: message,
        });
      }
    };