//Variables
const index = Array.from(document.querySelectorAll('.index'));
const coffeeTitle = Array.from(document.querySelectorAll('.coffee__title'));
const accordion = document.querySelector('.coffee__accordion')
const parentSection = document.querySelector('.coffee')
const coffeeCards = parentSection.querySelectorAll('.card')
const coffeeContent = Array.from(document.querySelectorAll('.coffee__content'));
const coffeePanel = Array.from(document.querySelectorAll('.coffee__panel'));
const coffeeSvg = Array.from(parentSection.querySelectorAll('svg'));
const coffeeBtnOption = Array.from(parentSection.querySelectorAll('.btn-option'));
const coffeeResume = Array.from(document.querySelectorAll('.resume'));
const grindOption = document.querySelectorAll('.grind-option');
const capsuleCard = document.querySelector('.capsule');
const btnRecap = document.querySelector('.cta-recap');
const btnDialog = document.querySelector('.cta-dialog')
const dialog = document.querySelector('.dialog')



//To catch a title-content or index section (for each accordion tab)
parentSection.addEventListener('click', (e) => {
  const target = e.target.closest('div')
  const dataContent = target.getAttribute('data-content')
  const dataContentIndex = parentSection.querySelector(`.index[data-content="${dataContent}"]`);
  const dataContentTitle = parentSection.querySelector(`.coffee__title[data-content="${dataContent}"]`);
  toggleAccordion(dataContentIndex, dataContentTitle);
})


//To toggle a relative accordion tab and higlights corrispective index;
function toggleAccordion(dataContentIndex, dataContentTitle) {
  const currentPanel = dataContentTitle.closest('.coffee__panel');
  const currentContent = currentPanel.querySelector('.coffee__content');
  const currentSvg = currentPanel.querySelector('svg');
  const currentBtn = currentPanel.querySelector('button');
  const activePanelIsOpened = currentBtn.getAttribute('aria-expanded');

  if (activePanelIsOpened === "true") {
    currentSvg.style.rotate = '0deg';

    currentPanel.classList.remove('panel-open')

    currentBtn.setAttribute("aria-expanded", false);

    currentContent.setAttribute("aria-hidden", true);

    dataContentIndex.classList.remove('index-active');

  } else {
    currentSvg.style.rotate = '180deg';

    currentPanel.classList.add('panel-open')

    currentBtn.setAttribute("aria-expanded", true);

    currentContent.setAttribute("aria-hidden", false);
    
    dataContentIndex.classList.add('index-active');
  }

  //To higlight selected card for each options
  coffeeContent.forEach((coffee) => {
    coffee.addEventListener('click', (e) => {
      const currentCard = e.target.closest('div');
      const currentTitleName = currentCard.querySelector('h4').textContent;
      const cardParent = currentCard.parentNode.parentNode;
      const cardParentData = cardParent.getAttribute('data-tab');
  
      //To remove attribute a all cards
      if(!(currentCard.classList.contains('card'))) return;
      cardParent.querySelectorAll('div').forEach((d) => {
    
        d.removeAttribute('data-current')
      })

      //To give a data-current attribute only a active card
      currentCard.setAttribute('data-current', true);
      
      handleResumeText(cardParentData, currentTitleName, currentCard)
      })
  })
}


//To put the correct choice in its corrispective slice text in the Summary order
function handleResumeText(cardParentData, currentTitleName, currentCard){
  
  if(cardParentData == 'preference'){
    coffeeResume[0].textContent = currentTitleName;
    coffeeResume[5].textContent = currentTitleName;
  } else if(cardParentData == 'type'){
    coffeeResume[1].textContent = currentTitleName;
    coffeeResume[6].textContent = currentTitleName;
  } else if(cardParentData == 'quantity'){
    coffeeResume[2].textContent = currentTitleName;
    coffeeResume[7].textContent = currentTitleName;
    currentCard.setAttribute('data-active-quantity', true)
  }else if(cardParentData == 'grind'){
    coffeeResume[3].textContent = currentTitleName;
    coffeeResume[8].textContent = currentTitleName;
  }else if(cardParentData == 'delivery'){
    coffeeResume[4].textContent = currentTitleName;
    coffeeResume[9].textContent = currentTitleName;
    currentCard.setAttribute('data-active-delivery', true)
  }

  //To handle the exception of grind option (when user choose a capsule card, the grind option will be hide)
  if ((cardParentData == 'preference') && (currentTitleName == 'Capsule')){
    capsuleCard.setAttribute('data-active', true)
    coffeeTitle[3].classList.add('disabled-tab');
    index[3].classList.add('disabled-tab');
    grindOption.forEach((grind) => {
    grind.style.display = 'none';
    grind.setAttribute('data-active', true)
    })
  } else if((cardParentData == 'preference') && !(currentTitleName == 'Capsule')) {
    capsuleCard.setAttribute('data-active', false)
    coffeeTitle[3].classList.remove('disabled-tab');
    index[3].classList.remove('disabled-tab');
    grindOption.forEach((grind) => {
    grind.style.display = 'inline';
    })
  }

  //To activate the cta when all options are chosen
  const coffeeResumeText = Array.from(document.querySelectorAll('.resume-text'));
  if(!(coffeeResumeText[0].innerText.includes('_'))){
    btnRecap.classList.remove('cta-disabled')
  } else {
    btnRecap.classList.add('cta-disabled')
  }

  checkTotal()
}


//Variables to final order cost
const week250 = 7.20;
const weekTwo250 = 9.60;
const month250 = 12.00;

const week500 = 13.00;
const weekTwo500 = 17.50;
const month500 = 22.00;

const week1000 = 22.00;
const weekTwo1000 = 32.00;
const month1000 = 42.00;

const total = document.querySelectorAll('.total');


//To open dialog after choices and calculate total cost
function checkTotal(){
  const quantity = document.querySelector('div[data-active-quantity]')
  const quantityValue = quantity.getAttribute('data-quantity')
  const delivery = document.querySelector('div[data-active-delivery]')
  const deliveryvalue = delivery.getAttribute('data-delivery')
  btnRecap.addEventListener('click', () => {

    dialog.showModal();
    dialog.setAttribute('aria-hidden', 'false')
    
    total.forEach((tot) => {
      if(quantityValue == '250' && deliveryvalue == 'week'){
        tot.textContent = (week250 * 4).toFixed(2);
      } else if (quantityValue == '250' && deliveryvalue == 'week2'){
        tot.textContent = (weekTwo250 * 2).toFixed(2);
      } else if(quantityValue == '250' && deliveryvalue == 'month'){
        tot.textContent = month250;
      }
  
      if(quantityValue == '500' && deliveryvalue == 'week'){
        tot.textContent = (week500 * 4).toFixed(2);
      }else if (quantityValue == '500' && deliveryvalue == 'week2'){
        tot.textContent = (weekTwo500 * 2).toFixed(2);
      } else if(quantityValue == '500' && deliveryvalue == 'month'){
        tot.textContent = month500;
      }
  
      if(quantityValue == '1000' && deliveryvalue == 'week'){
        tot.textContent = (week1000 * 4).toFixed(2);
      } else if (quantityValue == '1000' && deliveryvalue == 'week2'){
        tot.textContent = (weekTwo1000 * 2).toFixed(2);
      } else if(quantityValue == '1000' && deliveryvalue == 'month'){
        tot.textContent = month1000;
      }
    })
    
  })
}

resetdata()

//To close dialog and reset all data
function resetdata(){
    btnDialog.addEventListener('click', () => {
  
      coffeeResume.forEach((coffee) => {
        coffee.textContent = '_'
      })

      total.textContent = '00.00'

      coffeeSvg.forEach((svg) => {
        svg.style.rotate = '0deg';
      })

      coffeePanel.forEach((panel) => {
        panel.classList.remove('panel-open')
      })

      coffeeContent.forEach((cont) => {
        cont.setAttribute('aria-hidden', true)
      })

      coffeeBtnOption.forEach((btn) => {
        btn.setAttribute('aria-expanded', false)
      })

      index.forEach((ind) => {
        ind.classList.remove('index-active');
      })

      coffeeCards.forEach((card) => {
        card.removeAttribute('data-current')
      })

      grindOption.forEach((grind) => {
        grind.style.display = 'inline';
        grind.setAttribute('data-active', false)
        })

      coffeeTitle[3].classList.remove('disabled-tab');

      index[3].classList.remove('disabled-tab');

      btnRecap.classList.add('cta-disabled')

      dialog.close();
      dialog.setAttribute('aria-hidden', 'true')
  })
}