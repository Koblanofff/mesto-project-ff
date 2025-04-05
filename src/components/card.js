const createCard = (cardObject, handleCardModal, userId, handleDeleteCard, handleLikeButton) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImageElement = newCard.querySelector('.card__image');
    const cardTitleElement = newCard.querySelector('.card__title');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');
    const numberOfLikes = newCard.querySelector('.card__number-of-likes');

    cardTitleElement.textContent = cardObject.name;
    cardImageElement.src = cardObject.link;
    cardImageElement.alt = cardObject.name;
    numberOfLikes.textContent = cardObject.likes.length;
    
    if (userId !== cardObject.owner._id) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => {
            handleDeleteCard(newCard, cardObject._id);
        });
    }

    const isLikedByCurrentUser = cardObject.likes.some((user) => user._id === userId);

    if (isLikedByCurrentUser) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        handleLikeButton(likeButton, cardObject._id, numberOfLikes);
    });

    cardImageElement.addEventListener('click', handleCardModal)
    
    return newCard;
}

export { createCard }