import '../scss/tailwind.scss';

const navItems = document.querySelectorAll('.nav-item:not(:first-child)');
const navHandler = document.querySelector('.nav-handler');

if (window.innerWidth < 1023) {
  const overlay = document.querySelector('.overlay-sm');
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
        panel.classList.toggle('active');
        overlay.classList.toggle('active');

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
