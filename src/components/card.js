import { openModalWithoutValidation } from "./modal";
import { likeCard, dislikeCard } from "./api";

const createCard = (cardObject, handleCardModal, userId, deleteCardModal, setCardToDelete) => {
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
            openModalWithoutValidation(deleteCardModal);
            setCardToDelete.element = newCard;
            setCardToDelete.id = cardObject._id;
        })
    }

    const isLikedByCurrentUser = cardObject.likes.some((user) => user._id === userId);

    if (isLikedByCurrentUser) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');

        const setLike = isLiked ? dislikeCard : likeCard

        setLike(cardObject._id)
            .then((res) => {
                toggleLikeButtonState(likeButton);
                numberOfLikes.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка при нажатии на кнопку лайк. ${err}`)
            })
        });
    cardImageElement.addEventListener('click', handleCardModal)
    
    return newCard;
}

const toggleLikeButtonState = (button) => {
    button.classList.toggle('card__like-button_is-active');
}

export { createCard }