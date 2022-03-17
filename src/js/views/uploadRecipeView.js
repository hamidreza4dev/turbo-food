import View from './View';

class UploadRecipeView extends View {
  _parentElement = document.querySelector('.upload-recipe-form');
  _successMsg = 'Recipe Uploaded successfully. Have fun!';
  _errMsg = 'Failed to upload recipe :(';

  _btnAddRecipe = document.querySelector('.add-recipe');
  _overlay = document.querySelector('.overlay');
  _target = document.getElementById('addRecipeModal');
  _closeModalBtn = this._target.querySelectorAll('.close-modal-btn');
  _ingInputs = document.querySelectorAll('input[name^="ingredient-"]');
  _uploadImage = document.getElementById('uploadRecipeImage');

  addFormHandler(handler) {
    this._handleIngredientsInput();
    let file;
    this._uploadImage.addEventListener('input', function (e) {
      file = e.target.files[0];
    });
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = [...new FormData(this)];
      const recipe = Object.fromEntries(formData);
      handler(recipe, file);
    });
  }

  _handleIngredientsInput() {
    this._ingInputs.forEach((input, index) => {
      input.addEventListener('keydown', () => {
        const nextInput = this._ingInputs[index + 1];
        if (input.checkValidity()) {
          nextInput.disabled = false;
        } else {
          nextInput.disabled = true;
        }
      });
    });
  }

  addOpenModalHandler() {
    this._btnAddRecipe.addEventListener('click', this.toggleModal.bind(this));
    this._addCloseModalHandler();
  }

  toggleModal() {
    this._overlay.classList.toggle('active');
    this._target.classList.toggle('active');
  }

  _addCloseModalHandler() {
    if (this._closeModalBtn.length) {
      this._closeModalBtn.forEach((item) => {
        item.addEventListener('click', this.toggleModal.bind(this));
      });
    }
    this._overlay.addEventListener('click', this.toggleModal.bind(this));
  }
}

export default new UploadRecipeView();
