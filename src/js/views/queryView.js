import View from './View';

class QueryView extends View {
  _parentElement = document.querySelector('.search-list');
  _errMsg = 'Ops! no Query found :(';

  _generateMarkup() {
    return this._data
      .map((q) => {
        return `<li class="search-list-item">${q}</li>`;
      })
      .join('');
  }

  addClickHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const li = e.target.closest('.search-list-item');
      if (!li) return;

      handler(li.textContent);
    });
  }
}

export default new QueryView();
