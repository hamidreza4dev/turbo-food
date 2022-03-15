export const state = {
  recipe: {},
};

export const loadRecipe = function (data) {
  const { recipe } = data.data;
  state.recipe = {
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    source: recipe.source_url,
    image: recipe.image_url,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    id: recipe.id,
  };
};
