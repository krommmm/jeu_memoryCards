//	VARIABLES GLOBALES
var selectedOption = ''; // option selectionné parmis les différents thèmes
var game = document.getElementById('jeux');
var cpt = 0; // compteur de clicks
var firstCard = null;  // sert de copie pour la 1ère carte afin de stocker sa valeur
var secondCard = null; // sert de copie pour la 2ème carte ...
var backCard = 'backverde.jpg';
var name1 = '';  // doit contenir la class de la première image
var isWaiting = false; // pour ne pas pouvoir cliquer sur une autre carte quand on a déjà cliqué sur 2 cartes et qu'on doit attendre
//joueur =  isWaiting ? "doit attendre " : "peut jouer"
var isEndGame = false;

//	FONCTIONS REUTILISABLES
function creatingElements(tag, className) {
	let newElement = document.createElement(tag);
	newElement.className = className;
	return newElement;
}

const randomNumber = (max) => {
	return Math.floor(Math.random() * (max + 1));
};

const shakeTabOrder = (numbers) => {
	for (let i = 0; i < numbers.length; i++) {
		let randomIndex = randomNumber(i);
		let temporization = numbers[i];
		numbers[i] = numbers[randomIndex];
		numbers[randomIndex] = temporization;
	}
	return numbers;
};

const waitXSecondes = (sec) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, sec);
	});
};

//	CODE

//	fonction qui se lance grâce au html quand on click sur un des boutons radio
const selection = () => {
	//on associe une condition de selection pour toutes les options des input radio
	const options = document.getElementsByName('option');
	Array.from(options).map((option) => {
		if (option.checked) {
			selectedOption = option.value;
		}
	});

	//une fois l'option selectionné, cache la section "selection" et on affiche la section "jeux" pour quitter le menu et rentrer dans le jeu
	document.getElementById('selection').style.display = 'none';
	document.getElementById('jeux').style.display = 'flex';

	//on modèlise et crééer l'apparence des cartes en fonction de selectedOption (films/cartoons/bâtiments)
	creationCards(selectedOption);

	//on selectionne toutes les cartes et on remet le compteur de clicks à 0
	var cartes = document.querySelectorAll('.card');
	let cpt = 0;
	//pour chaque carte
	Array.from(cartes).map((carte) => {
		//quand on clique dessus
		carte.addEventListener('click', async function () {
			//si le joueur est en attente, il ne peut pas jouer
			if (isWaiting) {
				return;
			} else {
				// si la carte a déjà été retournée (visible), ne rien faire
				if (carte.firstChild.classList[1] === 'visible') {
					return;
					//sinon la carte se retourne et le compteur est incrémenté
				} else {
					carte.classList.toggle('flipped');
					cpt++;
					// si on a cliqué sur une 1ère carte
					if (cpt === 1) {
						//on récupère l'index pour ne pas rappuyer sur la même carte
						cartIndex = Array.from(cartes).indexOf(carte);
						// on stocke la classe de la 1ère carte (qui indique le nom de la carte) pour effecter une comparaison plus tard
						name1 = carte.firstChild.classList[2];
						//ainsi que la première carte
						firstCard = carte;
					}
						// si on a cliqué sur une 2ème carte
					if (cpt === 2) {
						// on récupère l'index de la 2ème carte
						cartIndex2 = Array.from(cartes).indexOf(carte);
						// Le joueur doit attendre
						isWaiting = true;
						//on stock la 2ème carte
						secondCard = carte;

						// Comparaison des classes pour voir si les cartes correspondent
						if (
							// si les class correspondent
							name1 === carte.firstChild.classList[2] &&
							//et que les index sont différents alors ces 2 cartes ont la même image
							cartIndex !== cartIndex2
						) {
							// Si les cartes correspondent, affichage des images
							var backCards =
								document.getElementsByClassName('back');
							Array.from(backCards).map((elem) => {
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
							// Le joueur peut à nouveau jouer
							isWaiting = false;
						} else {
							// Si les cartes ne correspondent pas, on retourne les cartes après un délai
							waitXSecondes(2000)
								.then(() => {
									carte.classList.toggle('flipped');
									firstCard.classList.toggle('flipped');
									// on réinitialise firstCard & secondCard
									firstCard = null;
									secondCard = null;
									isWaiting = false;
								})
								.catch((err) => console.log(err));
						};
						//On réinitialie le compteur
						cpt = 0;
					}
				}
				// Vérification si le jeu est terminé
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
