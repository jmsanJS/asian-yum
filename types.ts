// Ingredient structure used in the RecipeProps interface
interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

// RecipeProps interface used in the FoodCard component
export interface RecipeProps {
  id: number;
  name: string;
  desc: string;
  image: any;
  color: string;
  serving: string;
  servingNb: number;
  longDesc: string;
  level: string;
  time: string;
  rating: number;
  ingredients: Ingredient[];
}

// Types for navigation in the App (Stack Navigator)
export type RootStackParamList = {
  Home: undefined;
  Recipe: { recipe: RecipeProps };
  DrawerNavigator: { screen: string };
};

// Types for navigation in the Drawer (Drawer Navigator)
export type RootDrawerParamList = {
  Search: undefined;
  "My recipes": undefined;
};

// Bookmark structure used in the InitialState interface
export interface Bookmark {
  id: number;
  servings: number;
}

// Reducer state interface for handling favorite recipes (Bookmarks)
export interface State {
  value: Bookmark[];
}