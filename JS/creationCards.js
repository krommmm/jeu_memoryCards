
//fonction qui créer les cartes dynamiquement
const creationCards = (selectedOption) => {
	
	var btnReturnDiv = document.querySelector('.bouton_retour');
	var btnReturn = document.createElement('div');
	var btnReturnNode = document.createTextNode('Restart');
	btnReturn.appendChild(btnReturnNode);
	btnReturn.className = 'bouton envoyer';

	btnReturnDiv.appendChild(btnReturn);
	var tabNumbers = [];
	var tabNumbersRandom = [];
	var card;

	switch (selectedOption) {
		//SECTION FILMS
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

				var imgCardContainer = creatingElements('div','image_card_container');
				var imgCard = creatingElements('div','imgCard');
				var card = creatingElements('div','card');
				var front = creatingElements('img',`front  invisible ${tabNumbersRandom[i]}`);
				var back = creatingElements('img',`back  invisible ${tabNumbersRandom[i]}`);

				front.setAttribute('src', `./images/backCard/fgfg.png`);
				back.setAttribute(
					'src',
					`./images/films/${tabNumbersRandom[i]}`
				);

				game.appendChild(imgCardContainer);
				imgCardContainer.appendChild(imgCard);
				imgCard.appendChild(card);
				card.appendChild(front);
				card.appendChild(back);
			}
			break;
			//	SECTION CARTOON
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
				var imgCardContainer = creatingElements('div','image_card_container');
				var imgCard = creatingElements('div','imgCard');
				var card = creatingElements('div','card');
				var front = creatingElements('img',`front  invisible ${tabNumbersRandom[i]}`);
				var back = creatingElements('img',`back  invisible ${tabNumbersRandom[i]}`);

				front.setAttribute('src', `./images/backCard/fgfg.png`);
				back.setAttribute('src',`./images/cartoon/${tabNumbersRandom[i]}`);

				game.appendChild(imgCardContainer);
				imgCardContainer.appendChild(imgCard);
				imgCard.appendChild(card);
				card.appendChild(front);
				card.appendChild(back);
			}
			break;
			//	SECTION BATIMENTS
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
				var imgCardContainer = creatingElements('div','image_card_container');
				var imgCard = creatingElements('div','imgCard');
				var card = creatingElements('div','card');
				var front = creatingElements('img',`front  invisible ${tabNumbersRandom[i]}`);
				var back = creatingElements('img',`back  invisible ${tabNumbersRandom[i]}`);

				front.setAttribute('src', `./images/backCard/fgfg.png`);
				back.setAttribute('src',`./images/batiments/${tabNumbersRandom[i]}`);

				game.appendChild(imgCardContainer);
				imgCardContainer.appendChild(imgCard);
				imgCard.appendChild(card);
				card.appendChild(front);
				card.appendChild(back);
			}
			break;
		default:
			console.log('error');
	};

	btnReturnDiv.addEventListener("click",()=>{
		window.location.reload();
	});
};