export const state = {
  recipe: {},
  search: {
    result: [],
    query: '',
    page: 1,
    sortingMethod: 'none',
    resultsPerPage: 10,
  },
};
/**
 * store received object into recipe state
 * @param  {Object} data
 * @returns {undefined} undefined
 */
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

/**
 * store received object into search result state
 * @param  {Object} data
 * @returns {undefined} undefined
 */
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
/**
 * get period of search result page
 * @param  {Number} [page=state.search.page]
 * @returns {Array} returns and specific period of search result Array
 */
export const sliceResult = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.result.slice(start, end);
};
/**
 * change number of servings in state :)
 * @param  {Number} newServings
 * @returns {undefined} undefined
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });

  state.recipe.servings = newServings;
};
