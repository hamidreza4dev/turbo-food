import View from './View';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');

  addClearHandler(handler) {
    document.querySelector('.clear-btn').addEventListener('click', handler);
  }

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
}

export default new BookmarksView();
