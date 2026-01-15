const burgerButton = document.querySelector('.burger-button');
const mobileMenu = document.querySelector('.mobile-menu-cover');

function switchMenu(event){
  mobileMenu.classList.toggle('visually-hidden');
  burgerButton.classList.toggle('burger-button-close');
  return
}

burgerButton.addEventListener('click', switchMenu);
mobileMenu.addEventListener('click', switchMenu);