import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { id, servings } = action.payload;
      const isFavorited = state.value.find(recipe => recipe.id === id);
      if (!isFavorited) {
        state.value.push({ id, servings });
      }
    },
    removeFavorite: (state, action) => {
      state.value = state.value.filter((recipe) => recipe.id !== action.payload);
    },
    updateServings: (state, action) => {
      const { id, servings } = action.payload;
      const favorite = state.value.find(recipe => recipe.id === id);
      if (favorite) {
        favorite.servings = servings;
      }
    },
  },
});

export const { addFavorite, removeFavorite, updateServings } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
