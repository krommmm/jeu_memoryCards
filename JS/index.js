var selectedOption = '';
var game = document.getElementById('jeux');
var cpt = 0;
var youCanClick = true;

var paireCarteUn = '1';
var paireCarteDeux = '2';

var firstCard = null;
var secondCard = null;

var backCard = 'backverde.jpg';
var imgPath = '';

var name1 = '';
var isWaiting = false; // pour ne pas pouvoir cliquer sur une autre carte quand on a déjà cliquer sur 2 cartes et qu'on attend

var isEndGame = false;

//fonction qui créer les cartes dynamiquement
const creationCards = () => {
	var btnReturnDiv = document.querySelector('.bouton_retour');
	var btnReturn = document.createElement('div');
	var btnReturnNode = document.createTextNode('Recommencer le jeu');
	btnReturn.appendChild(btnReturnNode);
	btnReturn.className = 'bouton envoyer';

	btnReturnDiv.appendChild(btnReturn);
	var tabNumbers = [];
	var tabNumbersRandom = [];
	var card;

	switch (selectedOption) {
		case 'film':
			tabNumbers = [
				'parfum.jpg',
				'avatar.jpg',
				'bella.png',
				'jp.png',
				'lotr.jpg',
				'rrr.jpg',
			];
			tabNumbers = tabNumbers.concat(tabNumbers);
			tabNumbersRandom = shakeTabOrder(tabNumbers);
			//creation des cartes en dynamique
			for (let i = 0; i < tabNumbersRandom.length; i++) {
				var imgCardContainer = document.createElement('div');
				var imgCard = document.createElement('div');
				var card = document.createElement('div');
				var front = document.createElement('img');
				var back = document.createElement('img');

				imgCardContainer.className = 'image_card_container';
				imgCard.className = 'imgCard';
				card.className = 'card ';
				front.className = `front  invisible ${tabNumbersRandom[i]}`;
				back.className = `back  invisible ${tabNumbersRandom[i]}`;

				front.setAttribute('src', `./images/backCard/cb1.jpg`);
				back.setAttribute(
					'src',
					`./images/films/${tabNumbersRandom[i]}`
				);

				game.appendChild(imgCardContainer);
				//dos de carte
				imgCardContainer.appendChild(imgCard);
				imgCard.appendChild(card);
				card.appendChild(front);
				// image derriere
				card.appendChild(back);
			}
			break;
		case 'cartoon':
			tabNumbers = [
				'aladdin.webp',
				'chihiro.webp',
				'le_roi_lion.jpg',
				'notre_dame.jpg',
				'pocahontas.jpg',
				'white_snow.jpeg',
			];
			tabNumbers = tabNumbers.concat(tabNumbers);
			tabNumbersRandom = shakeTabOrder(tabNumbers);
			//creation des cartes en dynamique
			for (let i = 0; i < tabNumbersRandom.length; i++) {
				var imgCardContainer = document.createElement('div');
				var imgCard = document.createElement('div');
				var card = document.createElement('div');
				var front = document.createElement('img');
				var back = document.createElement('img');

				imgCardContainer.className = 'image_card_container';
				imgCard.className = 'imgCard';
				card.className = 'card ';
				front.className = `front  invisible ${tabNumbersRandom[i]}`;
				back.className = `back  invisible ${tabNumbersRandom[i]}`;

				front.setAttribute('src', `./images/backCard/cbBart.webp`);
				back.setAttribute(
					'src',
					`./images/cartoon/${tabNumbersRandom[i]}`
				);

				game.appendChild(imgCardContainer);
				//dos de carte
				imgCardContainer.appendChild(imgCard);
				imgCard.appendChild(card);
				card.appendChild(front);
				// image derriere
				card.appendChild(back);
			}
			break;
		case 'bat':
			tabNumbers = [
				'abu.jpg',
				'angleterre.jpg',
				'easter.jpg',
				'japon.jpg',
				'allemagne.jpg',
				'taj.jpg',
			];
			tabNumbers = tabNumbers.concat(tabNumbers);
			tabNumbersRandom = shakeTabOrder(tabNumbers);
			//creation des cartes en dynamique
			for (let i = 0; i < tabNumbersRandom.length; i++) {
				var imgCardContainer = document.createElement('div');
				var imgCard = document.createElement('div');
				var card = document.createElement('div');
				var front = document.createElement('img');
				var back = document.createElement('img');

				imgCardContainer.className = 'image_card_container';
				imgCard.className = 'imgCard';
				card.className = 'card ';
				front.className = `front  invisible ${tabNumbersRandom[i]}`;
				back.className = `back  invisible ${tabNumbersRandom[i]}`;

				front.setAttribute('src', `./images/backCard/red.png`);
				back.setAttribute(
					'src',
					`./images/batiments/${tabNumbersRandom[i]}`
				);

				game.appendChild(imgCardContainer);
				//dos de carte
				imgCardContainer.appendChild(imgCard);
				imgCard.appendChild(card);
				card.appendChild(front);
				// image derriere
				card.appendChild(back);
			}
			break;
		default:
			console.log('error');
	}
	//cart.setAttribute('src', '');

	btnReturnDiv.addEventListener("click",()=>{
		window.location.reload();
	});
};

//fonction qui reçoit un tab.length et qui renvoit un nb random entre 1 et tab.length
const randomNumber = (max) => {
	return Math.floor(Math.random() * (max + 1));
};

//fonction qui reçoit un tableau et mélange l'ordre des values
const shakeTabOrder = (numbers) => {
	for (let i = 0; i < numbers.length; i++) {
		let randomIndex = randomNumber(i);
		let temporization = numbers[i];
		numbers[i] = numbers[randomIndex];
		numbers[randomIndex] = temporization;
	}
	return numbers;
};

const wait2Secondes = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			//console.log("c'est prêt");
			resolve();
		}, 2000);
	});
};

const checkEndOfGame = () => {
	let gameChilds = game.children;
	for (let i = 0; i < gameChilds.length; i++) {
		if (gameChilds[i].classList.contains('invisible')) {
			return false; // At least one card is still invisible
		}
	}
	return true; // All cards are visible, end of the game
};

const selection = () => {
	const options = document.getElementsByName('option');
	Array.from(options).map((option) => {
		if (option.checked) {
			selectedOption = option.value;
		}
	});

	//	console.log(selectedOption);
	document.getElementById('selection').style.display = 'none';
	document.getElementById('jeux').style.display = 'flex';

	creationCards();
	var cartes = document.querySelectorAll('.card');
	let cpt = 0;

	Array.from(cartes).map((carte) => {
		carte.addEventListener('click', async function () {
			if (isWaiting) {
			} else {
				//condition pour ne pas recliquer sur une carte déjà visible
				if (carte.firstChild.classList[1] === 'visible') {
					return;
				} else {
					carte.classList.toggle('flipped');
					cpt++;
					if (cpt === 1) {
						//on chope l'index pour ne pas rappuyer sur la même carte
						cartIndex = Array.from(cartes).indexOf(carte);
						console.log(cartIndex);
						name1 = carte.firstChild.classList[2];
						firstCard = carte;
					}
					if (cpt === 2) {
						cartIndex2 = Array.from(cartes).indexOf(carte);
						isWaiting = true;
						secondCard = carte;
						// 2 cartes ont été cliquées
						//si 2 cartes identiques => class visible
						//sinon wait2Secondes()
						//restart à 0 => cpt=0
						//retourner les 2
						//attendre 2seondes  avant de pouvoir recliquer (if onTruc ?)
						// console.log(`name1 : ${name1}`);
						// console.log(
						// 	`currentName : ${carte.firstChild.classList[2]}`
						// );
						//Si img 1 et img 2 sont identiques
						if (
							name1 === carte.firstChild.classList[2] &&
							cartIndex !== cartIndex2
						) {
							// console.log('identiques');

							// pour tous les img si une a la classe du même nom que name1 alors
							var backCards =
								document.getElementsByClassName('back');
							Array.from(backCards).map((elem) => {
								// console.log(
								// 	'current name : ' + elem.classList[2]
								// );
								// console.log('name1 : ' + name1);
								if (elem.classList[2] === name1) {
									elem.classList.replace(
										'invisible',
										'visible'
									);
								}
							});
							//pareil pour les 2èmes images
							var frontCards =
								document.getElementsByClassName('front');
							Array.from(frontCards).map((elem) => {
								if (elem.classList[2] === name1) {
									elem.classList.replace(
										'invisible',
										'visible'
									);
								}
							});
							isWaiting = false;
						} else {
							// console.log('pas identiques');
							wait2Secondes()
								.then(() => {
									carte.classList.toggle('flipped');
									firstCard.classList.toggle('flipped');
									firstCard = null;
									secondCard = null;
									isWaiting = false;
								})
								.catch((err) => console.log(err));
						}
						cpt = 0;
					}

					//si identique carte reste verso sinon launch wait2Secondes
				}
				//ici
				var backCards = document.getElementsByClassName('back');
				//Si callback sur tous les back cards return false
				isEndGame = true;
				Array.from(backCards).map((elem) => {
					if (elem.classList[1] === 'invisible') {
						isEndGame = false;
					}
				});

				if (isEndGame) {
					window.location.reload();
				}
			}
		});
	});
};

// il faut que dès que cpt = 2 ça envoie la fonction
// et non pas quand je clique pour la troizième fois
