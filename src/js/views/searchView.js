import View from './View';

class SearchView extends View {
  _parentElement = document.querySelector('.search-box');
  _input = this._parentElement.querySelector('input[name="searchBox"]');

  constructor() {
    super();
    this._input.addEventListener('focus', () => {
      this._parentElement.classList.add('active');
    });
    this._input.addEventListener('blur', () => {
      setTimeout(() => {
        this._parentElement.classList.remove('active');
      }, 500);
    });
  }
  /**
   * @param  {boolean} [clear=true] clear input or no ;)
   */
  getQuery(clear = true) {
    const query = this._input.value;

    clear && this._clearInput();

    return query;
  }

  _clearInput() {
    this._input.value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerTrackInput(handler) {
    this._input.addEventListener('input', handler);
  }

  submitCustomValue(value) {
    this._input.value = value;
    // this._parentElement.submit();
  }
}

export default new SearchView();
