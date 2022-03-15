import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-tiny');
      if (!btn) return;

      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup(data = this._data) {
    const allPagesCount = Math.ceil(data.result.length / data.resultsPerPage);

    // first page
    if (data.page === 1 && allPagesCount > 1) {
      return this._generateButtonMarkup({ next: true, prev: false });
    }

    // last page (only prev)
    if (data.page === allPagesCount && allPagesCount > 1) {
      return this._generateButtonMarkup({ next: false, prev: true });
    }

    // other pages (both prev and next)
    if (data.page < allPagesCount) {
      return this._generateButtonMarkup({ next: true, prev: true });
    }

    // page 1 and no other page
    return this._generateButtonMarkup({ next: false, prev: false });
  }

  _generateButtonMarkup({ next = true, prev = true }) {
    return `
      ${
        prev
          ? `
              <button class="btn-tiny" data-goto="${this._data.page - 1}">
                <i class="icon icon-arrow-left"></i>
                page ${this._data.page - 1}
              </button>
            `
          : `<button class="btn-tiny opacity-0 pointer-events-none">
                <i class="icon icon-arrow-left"></i>
                page 1
              </button>`
      }
      <div class="rounded-full text-primary-blue bg-primary-lighten flex items-center justify-center aspect-square h-10">${
        this._data.page
      }</div>
      ${
        next
          ? `
            <button class="btn-tiny" data-goto="${this._data.page + 1}">
              page ${this._data.page + 1}
              <i class="icon icon-arrow-right"></i>
            </button>
            `
          : `<button class="btn-tiny opacity-0 pointer-events-none">
              page 2
              <i class="icon icon-arrow-right"></i>
            </button>`
      }
    `;
  }
}

export default new PaginationView();
