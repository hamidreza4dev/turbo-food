import View from './View';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errMsg = "Error : can't load recipe form server :(";
  _successMsg = 'Start by searching for a recipe or an ingredient. Have fun!';

  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-serving');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (updateTo > 0) handler(+updateTo);
    });
  }

  _generateMarkup(data = this._data) {
    return `
      <div class="relative">
        <figure class="recipe-image">
          <img
            src="${data.image}"
            alt="${data.title}"
            class="w-full h-96 object-cover object-center rounded-primary"
          />
        </figure>

        <div class="-rotate-6 w-1/2 text-4xl text-white font-black absolute top-full left-1/2 -translate-y-3/4 -translate-x-1/2 text-center lg:text-2xl md:w-11/12">
          <span class="recipe-title">${data.title}</span>
        </div>
      </div>

      <div>
        <div class="flex py-24 px-20 text-primary-md-normal text-primary-dark lg:px-12 md:px-0 sm:flex-wrap sm:gap-y-4 sm:pb-12">
          <div class="flex items-center gap-1">
            <span><i class="icon icon-timer"></i></span>
            <span class="text-primary-md-bold">${
              data.cookingTime
            }</span> MINUTES
          </div>

          <div class="servings">
            <span><i class="icon icon-users"></i></span>
            <span class="text-primary-md-bold">${data.servings}</span> SERVINGS
            <div class="flex items-center ml-2 gap-1">
              <button class="btn-serving" data-update-to="${
                data.servings - 1
              }"><i class="icon icon-minus"></i></button>
              <button class="btn-serving" data-update-to="${
                data.servings + 1
              }"><i class="icon icon-add"></i></button>
            </div>
          </div>

          <div class="flex items-center gap-2 ml-auto sm:w-full">
            <div class="flex items-center justify-center">
              <span class="main-icon"><i class="icon icon-user"></i></span>
            </div>

            <div class="flex items-center justify-center">
              <button class="bookmark-btn"><i class="icon icon-bookmark"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div class="py-12 px-[72px] bg-primary-light rounded-primary sm:p-6">
        <h1 class="title">recipe ingredients</h1>

        <ul class="grid grid-cols-2 gap-7 text-primary-dark mt-9 sm:grid-cols-1">
          ${data.ingredients.map(this._generateIngredientsMarkup).join('')}
        </ul>
      </div>

      <div class="py-12 px-[72px] flex flex-col items-center text-center sm:py-10 sm:px-0 sm:pb-4 xs:pb-0">
        <h1 class="title">HOW TO COOK IT ?</h1>

        <p class="py-6">
          This recipe was carefully designed and tested by <span class="font-bold">${
            data.publisher
          }</span>. Please check out directions at their website.
        </p>

        <a href="${data.source}" target="_blank" class="btn-rounded text-lg">
          <span class="text-sm font-normal DIRECTIONS">DIRECTIONS</span>
          <i class="icon icon-arrow-right"></i>
        </a>
      </div>
    `;
  }

  _generateIngredientsMarkup(ing) {
    return `
      <li class="grid [grid-template-columns:0fr_1fr] gap-2">
        <span class="text-primary-blue"><i class="icon icon-tick-circle"></i></span>
        <div class="flex gap-2">
          <span class="whitespace-nowrap">${
            ing.quantity ? new Fraction(ing.quantity) : ''
          }</span>
          <p>${ing.unit} ${ing.description}</p>
        </div>
      </li>
    `;
  }
}

export default new RecipeView();
