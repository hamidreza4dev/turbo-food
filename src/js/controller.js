import './app';
import { API_URL } from './config';
import { sendJSON } from './helpers';
import { loadRecipe, state } from './model';
import recipeView from './views/recipeView';

const controlRecipe = async function () {
  try {
    // 1. load recipe from api
    const data = await sendJSON(`${API_URL}/recipes/5ed6604591c37cdc054bc886`);

    // 2. store recipe in state
    await loadRecipe(data);

    // 3. render recipe in View
    recipeView.render(state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

const init = (function () {
  controlRecipe();
})();
