import './app';
import { API_URL, searchQueries } from './config';
import { getJSON } from './helpers';
import { loadRecipe, loadSearchResult, state } from './model';
import queryView from './views/queryView';
import recipeView from './views/recipeView';
import resultView from './views/resultView';
import searchView from './views/searchView';

// recipe handlers
const controlRecipe = async function () {
  try {
    // 0. render spinner
    recipeView.renderSpinner();

    // 1. load recipe from api
    const id = window.location.hash.slice(1);

    if (!id) {
      recipeView.renderMessage();
      return;
    }

    const data = await getJSON(`${API_URL}/recipes/${id}`);

    // 2. store recipe in state
    loadRecipe(data);

    // 3. render recipe in View
    recipeView.render(state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

// search handlers
const controlSearch = async function () {
  try {
    // 0. get query
    state.search.query = searchView.getQuery();

    // 1. render spinner
    resultView.renderSpinner();

    // 2. load recipe from api
    const data = await getJSON(
      `${API_URL}/recipes?search=${state.search.query}`
    );

    // 4. store result in state
    loadSearchResult(data);

    // 5. render results
    resultView.sortResult(resultView.getSortingMethod(), state.search.result);
    resultView.render(state.search.result);
  } catch (error) {
    resultView.renderError();
    console.error(error);
  }
};

const controlSearchAutoComplete = function () {
  const query = searchView.getQuery(false);
  const queries = searchQueries.filter((q) => q.includes(query));
  queryView.render(queries);
};

const controlQueryClickList = function (value) {
  searchView.submitCustomValue(value);
};

const controlSearchResultSorting = function (type) {
  state.search.sortingMethod = resultView.sortResult(
    resultView.getSortingMethod(),
    state.search.result
  );

  resultView.render(state.search.result);
};

const init = (function () {
  recipeView.addHandlerRender(controlRecipe);

  searchView.addHandlerSearch(controlSearch);
  searchView.addHandlerTrackInput(controlSearchAutoComplete);
  queryView.addClickHandler(controlQueryClickList);
  queryView.render(searchQueries);

  resultView.addSortHandler(controlSearchResultSorting);
})();
