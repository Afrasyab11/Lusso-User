import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiEndpoints } from '../../constants/api-endpoints';
import makeApiCall from '../../lib/apiCall';
import { Endpoint } from '../../type/api';
import { SocialAnalyticsState } from '../../type/socialAnalytics';

const initialState: SocialAnalyticsState = {
  loading: false,
  error: null,
  socialLogin: '',
  connectedPlatforms: {},
  socialAnalytics: {},
  main: [],
  facebook: [],
  instagram: [],
  youtube: [],
  x: [],
  tiktok: [],
  pinterest: [],
  linkedin: [],
  behance: [],
  snapchat: [],
  thread: [],
};

export const getSocialSigninPage = createAsyncThunk(
  'socialAnalytics/getSocialSigninPage',
  async (content: Endpoint, { rejectWithValue }) => {
    try {
      return await makeApiCall(content);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchsocialAnalyticsData = createAsyncThunk(
  'socialAnalytics/fetchsocialAnalyticsData',
  async (content: Endpoint, { rejectWithValue }) => {
    try {
      return await makeApiCall(content);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getUserSocialNetworks = createAsyncThunk(
  'socialAnalytics/getUserSocialNetworks',
  async (_, { rejectWithValue }) => {
    try {
      return await makeApiCall(apiEndpoints.socialNetworks);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const socialAnalyticsSlice = createSlice({
  name: 'socialAnalytics',
  initialState,
  reducers: {
    resetAnalyticsState: (state) => {
      state.socialAnalytics = initialState.socialAnalytics;
    },
  },
  extraReducers: builder => {

    builder
      .addCase(fetchsocialAnalyticsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchsocialAnalyticsData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;

          state.socialAnalytics = action?.payload?.payload ?? {}

        },
      )
      .addCase(fetchsocialAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload as string;
      })
      .addCase(getUserSocialNetworks.pending, state => {
        state.loading = true;
        state.error = null;
        state.connectedPlatforms = {};
      })
      .addCase(
        getUserSocialNetworks.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;

          const userPlatforms = action.payload ?? [];
          let connected = { ...state.connectedPlatforms };

          for (let platform of userPlatforms) {
            connected[platform === 'gbp' ? 'gmb' : platform] = true
          }
          state.connectedPlatforms = connected;
        },
      )
      .addCase(getUserSocialNetworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload as string;
      });
  },
});
export const { resetAnalyticsState } = socialAnalyticsSlice.actions;
export default socialAnalyticsSlice.reducer;
