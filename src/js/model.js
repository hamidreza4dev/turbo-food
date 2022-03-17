import {
  API_KEY,
  API_URL,
  CLOUD_NAME,
  CLOUD_URL,
  RES_PER_PAGE,
  UPLOAD_PRESET,
} from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    result: [],
    query: '',
    page: 1,
    sortingMethod: 'none',
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
/**
 * create maintainable recipe Object that received from API
 * @param  {Object} recipe
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    source: recipe.source_url,
    image: recipe.image_url,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    price: Math.floor(Math.random() * 100),
  };
};

/**
 * store received object into recipe state
 * @param  {Object} data
 * @returns {undefined} undefined
 */
export const loadRecipe = async function (id) {
  const data = await AJAX(`${API_URL}/recipes/${id}?key=${API_KEY}`);
  state.recipe = createRecipeObject(data);

  if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
    state.recipe.bookmarked = true;
  } else {
    state.recipe.bookmarked = false;
  }
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

export const loadBookmarks = function () {
  state.bookmarks =
    JSON.parse(localStorage.getItem('turbo_food_bookmarks')) || [];
};

export const storeBookmarks = function () {
  localStorage.setItem('turbo_food_bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * add bookmark to state
 * @param  {Object} recipe current recipe object (from state)
 * @return {undefined} undefined
 */
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  // make current recipe bookmark
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;

  storeBookmarks();
};

/**
 * remove bookmark from state
 * @param  {Object} recipe current recipe object (from state)
 * @return {undefined} undefined
 */
export const deleteBookmark = function (recipe) {
  const targetRecipe = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === recipe.id
  );

  // delete action
  state.bookmarks.splice(targetRecipe, 1);

  // remove current recipe bookmark
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = false;

  storeBookmarks();
};

export const clearBookmark = function () {
  state.bookmarks = [];

  storeBookmarks();
};

// upload recipe
export const uploadRecipe = async function (newRecipe, image) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(([key, value]) => key.startsWith('ingredient') && value.trim())
      .map(([key, ing]) => {
        const [quantity, unit, description] = ing
          .split(',')
          .map((a) => a.trim());

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}/recipes?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    // add bookmark and store recipe and make it visible
    data.bookmarked = true;
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    console.error(error);
  }
};

/**
 * upload image to cloud server
 * @param  {File} file input[type="file"] target.files
 */
export const uploadImage = async function (file) {
  try {
    const fd = new FormData();
    fd.append('upload_preset', UPLOAD_PRESET);
    fd.append('file', file);

    const data = await AJAX(`${CLOUD_URL}/${CLOUD_NAME}/upload`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: fd,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
