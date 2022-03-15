export const state = {
  recipe: {},
  search: {
    result: [],
    query: '',
    sortingMethod: 'none',
  },
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

export const loadSearchResult = function (data) {
  const { recipes } = data.data;
  state.search.result = recipes.map((recipe) => {
    return {
      publisher: recipe.publisher,
      image: recipe.image_url,
      title: recipe.title,
      id: recipe.id,
      price: Math.floor(Math.random() * 100),
    };
  });
};
