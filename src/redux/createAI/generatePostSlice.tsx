import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aiPost: {},
  prevPostData: {},
  aiUsePost: {},
  createAIImage: {},
  regeneAIPost: {}
};

const generatePostSlice = createSlice({
  name: 'aiPost',
  initialState,
  reducers: {
    createAIPostData(state, action) {
      // state.aiPost = action.payload;
      return {
        ...state,
        aiPost: { ...action.payload },
      };
    },
    createAIPrevPostData(state, action){
    return {
      ...state,
      prevPostData: {...action.payload}
    }
    },
    PostUseData(state, action){
        // state.aiUsePost = action.payload
        return {
          ...state,
          aiUsePost: { ...action.payload },
        };
    },

    creatingImageWithAI(state, action) {
      state.createAIImage = action.payload
    },

    regeneratingPostWithAI(state, action) {
      state.regeneAIPost = action.payload
    }
  },
});

export const { createAIPostData, PostUseData, creatingImageWithAI, regeneratingPostWithAI, createAIPrevPostData } = generatePostSlice.actions;
export default generatePostSlice.reducer;
