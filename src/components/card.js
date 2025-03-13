const createCard = (cardImage, cardTitle) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    newCard.querySelector('.card__title').textContent = cardTitle;
    newCard.querySelector('.card__image').setAttribute('src', cardImage);
    newCard.querySelector('.card__image').setAttribute('alt', cardTitle);

    return newCard;
}

const deleteCard = (e) => {
    if (e.target.classList.contains('card__delete-button')) {
        const card = e.target.closest('.card');
        card.remove();
    }
}

const likeCard = (e) => {
    if (e.target.classList.contains('card__like-button')) {
        e.target.classList.toggle('card__like-button_is-active');
    }
}

export {createCard, deleteCard, likeCard};