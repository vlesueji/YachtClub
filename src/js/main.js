const burgerButton = document.querySelector('.burger-button');
const mobileMenu = document.querySelector('.mobile-menu-cover');

function switchMenu(event){
  mobileMenu.classList.toggle('visually-hidden');
  burgerButton.classList.toggle('burger-button-close');
  document.body.classList.toggle('modal-open');
  return
}

burgerButton.addEventListener('click', switchMenu);
mobileMenu.addEventListener('click', switchMenu);