import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../../services/api/exploreAPI';
import { ExploreState, ProductData } from '../../type/explore';

const initialState: ExploreState = {
  loading: false,
  error: null,
  apps: [],
  games: [],
  movies: [],
  courses: [],
  services: [],
  aiProducts: [],
};
export const fetchExploreData = createAsyncThunk(
  'explore/fetchExploreData',
  async (_, { rejectWithValue }) => {
    if (!navigator.onLine) {
      return rejectWithValue("No internet connection");
    }

    try {
      return await fetchProducts();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);


const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExploreData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExploreData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.error = null;
        const products = action.payload;

        // Reset all category arrays
        Object.keys(state)?.forEach(key => {
          if (Array.isArray(state[key as keyof ExploreState])) {
            (state[key as keyof ExploreState] as any[]) = [];
          }
        });

        products?.forEach((product) => {
          const requiredData: ProductData = {
            ...product,
            category: product?.category || '',
            imageSrc: product?.exploreImage || '',
            title: product?.name || '',
            subtitle: Array.isArray(product?.additionalInfo?.genre)
              ? product?.additionalInfo?.genre?.join(' | ')
              : typeof product?.additionalInfo?.genre === 'string'
                ? product?.additionalInfo?.genre
                : product?.subCategory || '',
            productId: product?.productId || '',
          };

          const category = requiredData.category.toUpperCase().trim();

          // Use a mapping object with arrays to handle multiple variations
          const categoryMap: { [key: string]: (keyof ExploreState)[] } = {
            'APP': ['apps'],
            'APPS': ['apps'],
            'GAME': ['games'],
            'GAMES': ['games'],
            'MOVIE': ['movies'],
            'MOVIES': ['movies'],
            'COURSE': ['courses'],
            'COURSES': ['courses'],
            'SERVICE': ['services'],
            'SERVICES': ['services'],
            'AI PRODUCT': ['aiProducts'],
            'AI PRODUCTS': ['aiProducts'],
            'AI': ['aiProducts'],
          };

          const stateKeys = categoryMap[category] || [];
          if (stateKeys.length > 0) {
            stateKeys?.forEach(stateKey => {
              (state[stateKey] as ProductData[]).push(requiredData);
            });
          } else {
            console.warn(`Unknown category: ${category} for product: ${requiredData.productId}`);
          }
        });
      })
      .addCase(fetchExploreData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default exploreSlice.reducer;
