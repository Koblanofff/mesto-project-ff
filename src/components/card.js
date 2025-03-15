const deleteCard = (e) => {
    e.target.closest('.card').remove();
}

const likeCard = (e) => {
    e.target.classList.toggle('card__like-button_is-active');
}

const createCard = (cardImage, cardTitle, handleCardModal) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImageElement = newCard.querySelector('.card__image');
    const cardTitleElement = newCard.querySelector('.card__title');

    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');

    cardTitleElement.textContent = cardTitle;
    cardImageElement.src = cardImage;
    cardImageElement.alt = cardTitle;

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);

    cardImageElement.addEventListener('click', handleCardModal)
    
    return newCard;
}


export { createCard }