import View from './View';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');

  addClearHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.clear-btn');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup(data = this._data) {
    return (
      data.map(this._generateBookmarkMarkup).join('') +
      (this._data.length
        ? `
          <div class="p-4 pb-0">
            <button class="clear-btn">
              <span><i class="icon icon-clear"></i></span>
              clear <span>${this._data.length}</span> items
            </button>
          </div>
        `
        : '<p class="text-primary-dark text-center py-8">No bookmarks yet !</p>')
    );
  }

  _generateBookmarkMarkup(result) {
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
  }
}

export default new BookmarksView();
