export default class View {
  _data;

  render(data) {
    if (!data && !Array.from(data).length) this.renderError();

    this._clear();
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    this._clear();

    const markup = `
      <div class="flex">
        <div class="spinner mx-auto my-12"><i class="icon icon-spinner !text-7xl text-primary-blue"></i></div>
      </div>
    `;

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderError(message = this._errMsg) {
    this._clear();

    const markup = `
      <div class="flex justify-center item-center my-12">
        <div class="flex text-primary-red items-center gap-3 max-w-lg">
          <div>
            <span><i class="icon icon-error !text-6xl"></i></span>
          </div>
          <p class="grow text-2xl">${message}</p>
        </div>
      </div>
    `;

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderMessage(message = this._successMsg) {
    this._clear();

    const markup = `
      <div class="flex justify-center item-center my-12">
        <div class="flex text-primary-blue items-center gap-3 max-w-lg">
          <div>
            <span><i class="icon icon-emoji-happy !text-6xl"></i></span>
          </div>
          <p class="grow text-2xl">${message}</p>
        </div>
      </div>
    `;

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}
