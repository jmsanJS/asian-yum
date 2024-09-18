import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Bookmark } from '../types';

const initialState: State = {
  value: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Bookmark>) => {
      const { id, servings } = action.payload;
      const isFavorited = state.value.find((recipe) => recipe.id === id);
      if (!isFavorited) {
        state.value.push({ id, servings });
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((recipe) => recipe.id !== action.payload);
    },
    updateServings: (state, action: PayloadAction<Bookmark>) => {
      const { id, servings } = action.payload;
      const favorite = state.value.find((recipe) => recipe.id === id);
      if (favorite) {
        favorite.servings = servings;
      }
    },
  },
});

export const { addFavorite, removeFavorite, updateServings } = favoritesSlice.actions;
export default favoritesSlice.reducer;