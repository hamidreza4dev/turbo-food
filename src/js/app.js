import '../scss/tailwind.scss';

const btnAddRecipe = document.querySelector('.add-recipe');
const overlay = document.querySelector('.overlay');
btnAddRecipe.addEventListener('click', function () {
  overlay.classList.remove('active');
  const allModals = document.querySelectorAll('.modal');
  for (let i = 0; i < allModals.length; i++) {
    allModals[i].classList.remove('active');
  }

  const target = document.getElementById('addRecipeModal');
  overlay.classList.add('active');
  target.classList.add('active');

  // close btn
  const closeModalBtn = target.querySelectorAll('.close-modal-btn');
  if (closeModalBtn.length) {
    closeModalBtn.forEach((item) => {
      item.addEventListener('click', closeModal, { once: true });
    });
  }
  overlay.addEventListener('click', closeModal, { once: true });

  // Escape Kay
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    { once: true }
  );

  // toggle modal options
  function closeModal() {
    overlay.classList.remove('active');
    target.classList.remove('active');
  }
});

const navItems = document.querySelectorAll('.nav-item:not(:first-child)');
const navHandler = document.querySelector('.nav-handler');

if (window.innerWidth < 1140) {
  navItems.forEach((item) =>
    item.addEventListener('click', function () {
      const panel = item.querySelector('.nav-action ~ .nav-dropdown');
      navItems.forEach((item) =>
        item
          .querySelector('.nav-action ~ .nav-dropdown')
          .classList.remove('active')
      );
      overlay.addEventListener('click', toggleDropDown, { once: true });

      function toggleDropDown() {
        console.log(
          overlay.className.includes('active'),
          panel.className.includes('active')
        );

        panel.classList.toggle('active');
        overlay.classList.toggle('active');

        console.log(
          overlay.className.includes('active'),
          panel.className.includes('active')
        );

        navHandler.classList.toggle('!pointer-events-none');
        navHandler.classList.toggle('bg-opacity-50');
        document.querySelectorAll('.nav-item .nav-action').forEach((item) => {
          item.classList.toggle('opacity-30');
        });
      }

      toggleDropDown();
    })
  );
}

const btnToggleMenu = document.getElementById('menuBtn');
btnToggleMenu.addEventListener('click', function () {
  navHandler.classList.toggle('active');
  navHandler.classList.toggle('pointer-events-auto');
});
