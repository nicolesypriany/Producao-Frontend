const sidebar = document.querySelector('.sidebar');
sidebar.innerHTML += `
  <h1>Produção</h1>
   <div class="sidebar__section">
      <button class="sidebar__button sidebar__toggle">Produção</button>
      <div class="sidebar__submenu">
        <a href="../../production/html/index.html" class="sidebar__submenu-button">Produções</a>
        <a href="../../machine/html/index.html" class="sidebar__submenu-button">Máquinas</a>
        <a href="../../mold/html/index.html" class="sidebar__submenu-button">Formas</a>
        <a href="../../raw-material/html/index.html" class="sidebar__submenu-button">Matérias-Primas</a>
        <a href="../../product/html/index.html" class="sidebar__submenu-button">Produtos</a>
      </div>
    </div>
    
    <div class="sidebar__section">
      <button class="sidebar__button sidebar__toggle">Custo</button>
      <div class="sidebar__submenu">
        <a href="../../cost/average-cost.html" class="sidebar__submenu-button">Custo Médio</a>
        <a href="../../cost/monthly-cost.html" class="sidebar__submenu-button">Custo Mensal</a>
        <a href="../../expense/html/index.html" class="sidebar__submenu-button">Despesas</a>
      </div>
    </div>
    
    <div class="sidebar__section">
      <a href="../../freight/index.html" class="sidebar__button">Frete</a>
    </div>

    <div class="sidebar__section">
      <a href="../../freight/index.html" class="sidebar__button">Sair</a>
    </div>
  `;

const header = document.querySelector('.header');
header.innerHTML = "";
header.innerHTML += `
  <div class="header__content">
  <div class="header__user">
    <div class="header__avatar">
      <svg class="header__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
    </div>
    <div class="header__info">
      <span class="header__name">Nicole</span>
      <span class="header__role">Desenvolvedora</span>
    </div>

    <div class="header__menu">
      <a href="../../account/html/settings.html" class="header__menu-item">Configurações</a>
      <a href="../../account/html/logout.html" class="header__menu-item">Sair</a>
    </div>
  </div>
</div>
`;

const toggles = document.querySelectorAll('.sidebar__toggle');
toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const submenu = toggle.nextElementSibling;

    if (submenu.classList.contains('show')) {
      submenu.style.maxHeight = null;
      submenu.classList.remove('show');
      toggle.classList.remove('active');
    } else {
      submenu.classList.add('show');
      submenu.style.maxHeight = submenu.scrollHeight + "px";
      toggle.classList.add('active');
    }
  });
});

const headerToggle = document.querySelector('.header__user');
const headerMenu = document.querySelector('.header__menu');

headerToggle.addEventListener('click', () => {
  headerMenu.classList.toggle('show');
  headerToggle.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  const isClickInside = headerToggle.parentElement.contains(event.target);
  if (!isClickInside) {
    headerMenu.classList.remove('show');
    headerToggle.classList.remove('active');
  }
});