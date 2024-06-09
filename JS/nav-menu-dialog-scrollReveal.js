const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 40em)');
const mediaReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const topNavMenu = document.querySelector('.headernav__menu');
const main = document.querySelector('main');
const body = document.querySelector('body');

function openMobileMenu() {
  btnOpen.setAttribute('aria-expanded', 'true');
  topNavMenu.removeAttribute('inert');
  topNavMenu.removeAttribute('style');
  
  //To hide every content for screen-reader when nav-menu is open (only for mobile)
  main.setAttribute('inert', '');
  body.style.overflowY = 'hidden';
  btnClose.focus();
}

function closeMobileMenu() {
  btnOpen.setAttribute('aria-expanded', 'false');
  topNavMenu.setAttribute('inert', '');
  main.removeAttribute('inert');
  body.style.overflowY = 'auto';
  btnOpen.focus();

  setTimeout(() => {
    topNavMenu.style.transition = 'none';
  }, 500);
}

function setupTopNav(e) {
  if (e.matches) {
    topNavMenu.setAttribute('inert', '');
    topNavMenu.style.transition = 'none';
  } else {
    closeMobileMenu();
    topNavMenu.removeAttribute('inert');
  }
}

setupTopNav(media);

//to call the correct function - open and close nav-menu
btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);

media.addEventListener('change', function (e) {
  setupTopNav(e);
});


//To check if user don't prefer motion
  function checkMotions(e){
    if(!e.matches){
      //ScrollReveal setup
      ScrollReveal().reveal('.reveal', { 
        scale: 0.8,
        easing: 'cubic-bezier(.77,-0.22,.08,1.44)',
        duration: 700,
        origin: 'top',
        distance: '150px',
        interval: '800'});
    }
  }

  checkMotions(mediaReduceMotion);

  mediaReduceMotion.addEventListener('change', function (e) {
    checkMotions(e);
  });