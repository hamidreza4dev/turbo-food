import './app';
import { API_URL, searchQueries } from './config';
import { getJSON } from './helpers';
import {
  loadRecipe,
  loadSearchResult,
  sliceResult,
  state,
  updateServings,
} from './model';
import paginationView from './views/paginationView';
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

    // 4. update result
    resultView.update(state.search.result);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};
/**
 * update servings in state and update DOM (include ingredients and servings number)
 * @param  {Number} updateTo : next number of serving
 * @returns {undefined} undefined
 */
const controlServingsUpdate = function (updateTo) {
  updateServings(updateTo);

  recipeView.update(state.recipe);
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
    resultView.render(sliceResult());

    // 6. render pagination
    paginationView.render(state.search);

    // 7. reset autoComplete
    queryView.render(searchQueries);
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
/**
 * set search input value to clicked item in auto complete
 * @param  {String} value
 */
const controlQueryClickList = function (value) {
  searchView.submitCustomValue(value);
};
/**
 * sort result and rerender that
 * @param  {String} type : this parameter will get form resultsView.js
 */
const controlSearchResultSorting = function (type) {
  state.search.sortingMethod = resultView.sortResult(
    resultView.getSortingMethod(),
    state.search.result
  );

  resultView.render(sliceResult());
};

// handler pagination
/**
 * handle pagination
 * @param  {Number} goto : page number
 */
const controlPagination = function (goto) {
  resultView.render(sliceResult(goto));

  paginationView.render(state.search);
};

const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServingsUpdate);

  paginationView.addHandlerClick(controlPagination);
  searchView.addHandlerSearch(controlSearch);
  searchView.addHandlerTrackInput(controlSearchAutoComplete);
  queryView.addClickHandler(controlQueryClickList);
  queryView.render(searchQueries);

  resultView.addSortHandler(controlSearchResultSorting);
})();
