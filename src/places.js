const menuButton = document.querySelector('.menu-toggle')
const mainNavigation = document.querySelector('.main-nav')

menuButton.addEventListener('click', () => {
  const isOpen = mainNavigation.classList.toggle('is-open')
  menuButton.setAttribute('aria-expanded', String(isOpen))
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
  menuButton.innerHTML = isOpen
    ? '<span aria-hidden="true">&#10005;</span>'
    : '<span aria-hidden="true">&#9776;</span>'
})

mainNavigation.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return
  mainNavigation.classList.remove('is-open')
  menuButton.setAttribute('aria-expanded', 'false')
  menuButton.setAttribute('aria-label', 'Open menu')
  menuButton.innerHTML = '<span aria-hidden="true">&#9776;</span>'
})
