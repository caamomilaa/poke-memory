const gameContainerElement = document.getElementById('game-container');
//event.target y ver a que hijo le hago click para añadir la clase de rotar

//array vacio que lleno con numeros randoms para elegir imagenes

let pokemons = [];
let tries = 0;
let point = 0;

let cardA = null; //con esto no limito a que sea un string (en vez de ''), si no que no es "nada" y puedo convertirse en un objeto, array, string... Para booleano es mejor empezar en true/false.
let cardB = null;

const generatePokemons = () => {
  while (pokemons.length < 6) {
    const randomNumbers = Math.floor(Math.random() * 151 + 1);
    if (!pokemons.includes(randomNumbers)) {
      pokemons.push(randomNumbers);
    }
  }
  pokemons = [...pokemons, ...pokemons];
  pokemons.sort(() => Math.random() - 0.5);
};

const createCard = () => {
  generatePokemons();
  const fragment = document.createDocumentFragment();
  pokemons.forEach(pokemon => {
    //DIV CARD
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    //CARD FRONT
    const cardFrontDiv = document.createElement('div');
    cardFrontDiv.classList.add('card-front');
    cardFrontDiv.style.setProperty(
      '--poke-img',
      `url(../assets/images/${pokemon}.png)`
    );
    cardDiv.append(cardFrontDiv);

    //CARD BACK
    const cardBackDiv = document.createElement('div');
    cardBackDiv.classList.add('card-back');
    cardDiv.append(cardBackDiv);
    fragment.append(cardDiv);
  });
  gameContainerElement.append(fragment);
};
createCard();

const showCards = () => {
  for (let i = 0; i < pokemons.length; i++) {
    gameContainerElement.children[i].classList.add('card-clicked');
  }
};
showCards();

const hideCards = setTimeout(() => {
  for (let i = 0; i < pokemons.length; i++) {
    gameContainerElement.children[i].classList.remove('card-clicked');
  }
  clearTimeout(showCards);
}, 2000);

const showClickedCards = event => {
  event.target.classList.add('card-clicked');

  if (!cardA) {
    cardA = event.target.children[0].style.cssText;
    // console.log(`guardo cardA: ${cardA}`);
  } else if (!cardB) {
    cardB = event.target.children[0].style.cssText;

    // console.log(`guardo cardB: ${cardB}`);
  }

  if (cardA === cardB) {
    console.log('ta bien');
  } else {
    console.log('giralas');
    //el primero me sale como giralas
  }
  cardA = '';
  cardB = '';
};
gameContainerElement.addEventListener('click', showClickedCards);
