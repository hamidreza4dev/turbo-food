import View from './View';

class ResultView extends View {
  _parentElement = document.querySelector('.search-results');

  _generateMarkup(data = this._data) {
    return data
      .map((result) => {
        return `
        <a class="preview ${
          result.id === window.location.hash.slice(1) ? 'active' : ''
        }" href="#${result.id}">
          <figure class="preview-image">
            <img
              src="${result.image}"
              alt="${result.title}"
              class="rounded-full min-w-[3.5rem] max-w-[3.5rem] h-14 object-cover object-center"
            />
          </figure>

          <div class="preview-description">
            <h3 class="preview-title">${result.title}</h3>
            <div class="preview-info">
              <p class="opacity-40">${result.publisher}</p>
              <span>${result.price}$</span>
            </div>
          </div>
        </a>
      `;
      })
      .join('');
  }
  /**
   * @param  {String(ascending | descending | lowestPrice | highestPrice | none)} type : sorting method
   * @param  {Array} targetArray : an array should be effect
   * @returns  sorting method (type)
   */
  sortResult(type, targetArray) {
    if (type == 'ascending') {
      targetArray = targetArray.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      return 'ascending';
    }

    if (type == 'descending') {
      targetArray = targetArray
        .sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
        .reverse();

      return 'descending';
    }

    if (type == 'lowestPrice') {
      targetArray = targetArray.sort((a, b) => a.price - b.price);

      return 'lowestPrice';
    }

    if (type == 'highestPrice') {
      targetArray = targetArray.sort((a, b) => b.price - a.price);

      return 'highestPrice';
    }

    if (type == 'none') {
      return 'none';
    }
  }

  addSortHandler(handler) {
    document.querySelector('#sorting').addEventListener('input', function (e) {
      handler(this.value);
    });
  }

  getSortingMethod(handler) {
    return document.querySelector('#sorting').value;
  }
}

export default new ResultView();
