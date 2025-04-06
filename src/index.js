import './pages/index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal, openModalWithoutValidation } from './components/modal.js';
import { enableValidation } from './components/formValidation.js';
import { getUserData, getInitialCards, editUserData, addNewCard, deleteCard, changeAvatar, dislikeCard, likeCard} from './components/api.js';

const page = document.querySelector('.page'); 
const popups = page.querySelectorAll('.popup');
const cardModal = page.querySelector('.popup_type_image');
const cardModalName = cardModal.querySelector('.popup__caption');
const cardModalImage = cardModal.querySelector('.popup__image');
const cardsContainer = page.querySelector('.places__list');
const newCardButton = page.querySelector('.profile__add-button');
const newCardModal = page.querySelector('.popup_type_new-card');
const newCardInputImage = newCardModal.querySelector('.popup__input_type_url');
const newCardInputTitle = newCardModal.querySelector('.popup__input_type_card-name');
const newCardForm = newCardModal.querySelector('.popup__form');
const newCardSubmitButton = newCardModal.querySelector('.popup__button');
const editProfileButton = page.querySelector('.profile__edit-button');
const editProfileModal = page.querySelector('.popup_type_edit'); 
const profileInputName = editProfileModal.querySelector('.popup__input_type_name');
const currentProfileName = page.querySelector('.profile__title');
const profileInputDescription = editProfileModal.querySelector('.popup__input_type_description');
const currentProfileDescription = page.querySelector('.profile__description');
const currentProfileImage = page.querySelector('.profile__image');
const editProfileSubmitButton = editProfileModal.querySelector('.popup__button');
const deleteCardModal = page.querySelector('.popup_type_delete-card');
const deleteCardSubmitButton = deleteCardModal.querySelector('.popup__button');
const closeModalButtons = page.querySelectorAll('.popup__close');
const profileAvatarButton = page.querySelector('.profile__image');
const profileAvatarChangeModal = page.querySelector('.popup_type_change-avatar');
const profileAvatarChangeForm = profileAvatarChangeModal.querySelector('.popup__form')
const profileAvatarSubmitButton = profileAvatarChangeForm.querySelector('.popup__button');
const newAvatarInput = profileAvatarChangeForm.querySelector('.popup__input');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

let currentCard = {
    element: null,
    id: null
}

let currentUserId;

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
});

const handleCardModal = (e) => {
    openModalWithoutValidation(cardModal);

    const cardElement = e.target.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title').textContent;

    cardModalName.textContent = cardTitle;
    cardModalImage.src = e.target.src;
    cardModalImage.alt = cardTitle;
}

const handleButtonLoadingState = (button, isLoading) => {
    if (isLoading) {
        button.dataset.originalText = button.textContent;
        button.textContent = 'Сохранение...';
        button.disabled = true;
    } else {
        button.textContent = button.dataset.originalText;
        button.disabled = false;
    }
}

const handleDeleteCard = (cardElement, cardId) => {
    openModalWithoutValidation(deleteCardModal);
    currentCard.element = cardElement;
    currentCard.id = cardId;
} 

const handleLikeCard = (button, cardId, numberOfLikesElement) => {
    const isLiked = button.classList.contains('card__like-button_is-active');

    const setLike = isLiked ? dislikeCard : likeCard;

    setLike(cardId)
        .then((res) => {
            button.classList.toggle('card__like-button_is-active');
            numberOfLikesElement.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(`Ошибка при нажатии на кнопку лайк. ${err}`)
        })
}

const handleNewCard = () => {
    const newLink = newCardInputImage.value;
    const newName = newCardInputTitle.value;

    handleButtonLoadingState(newCardSubmitButton, true)

    addNewCard(newName, newLink)
        .then((newCardData) => {
            const newCard = createCard(newCardData, handleCardModal, currentUserId, handleDeleteCard, handleLikeCard);
            cardsContainer.prepend(newCard);
            closeModal(newCardModal);
            newCardForm.reset();
        })
        .catch((err) => {
            console.log(`Ошибка при создании новой карточки. ${err}`);
        })
        .finally(() => {
            handleButtonLoadingState(newCardSubmitButton, false)
        })
}

newCardButton.addEventListener('click', () => {
    openModal(newCardModal, validationConfig)
})

Promise.all([getUserData(), getInitialCards()]) 
    .then(([userData, initialCards]) => {
        currentProfileName.textContent = userData.name; 
        currentProfileDescription.textContent = userData.about; 
        currentProfileImage.style.backgroundImage = `url(${userData.avatar})` 
        currentUserId = userData._id; 

        initialCards.forEach((card) => {
            const newCard = createCard(card, handleCardModal, currentUserId, handleDeleteCard, handleLikeCard); 
            cardsContainer.append(newCard); 
        })
    }) 
    .catch((err) => { 
        console.log(`Ошибка при загрузки даненых пользователя и начальный карточек. ${err}`) 
    }) 

newCardForm.addEventListener('submit', handleNewCard);

deleteCardSubmitButton.addEventListener('click', () => { 
    if (currentCard.element && currentCard.id) { 
        deleteCard(currentCard.id) 
            .then(() => { 
                currentCard.element.remove(); 
                currentCard.element = null; 
                currentCard.id = null; 
                closeModal(deleteCardModal); 
            }) 
            .catch((err) => { 
                console.log(`Ошибка при удалении карточки. ${err}`) 
            }) 
    } 
})

editProfileButton.addEventListener('click', () => {
    openModal(editProfileModal, validationConfig);

    profileInputName.value = currentProfileName.textContent;
    profileInputDescription.value = currentProfileDescription.textContent;
})

editProfileSubmitButton.addEventListener('click', (e) => {
    handleButtonLoadingState(editProfileSubmitButton, true);

    const name = profileInputName.value;
    const about = profileInputDescription.value;

    editUserData(name, about)
        .then((newUserData) => {
            currentProfileName.textContent = newUserData.name;
            currentProfileDescription.textContent = newUserData.about;
            closeModal(editProfileModal);
        })
        .catch((err) => {
            console.log(`Ошибка при изменении профиля. ${err}`)
        })
        .finally(() => {
            handleButtonLoadingState(editProfileSubmitButton, false)
        })

})

profileAvatarButton.addEventListener('click', () => {
    openModal(profileAvatarChangeModal, validationConfig);
})

profileAvatarSubmitButton.addEventListener('click', () => {
    handleButtonLoadingState(profileAvatarSubmitButton, true);

    const newAvatar = newAvatarInput.value;

    changeAvatar(newAvatar)
        .then((res) => {
            currentProfileImage.style.backgroundImage = `url(${res.avatar})`;
            closeModal(profileAvatarChangeModal);
            profileAvatarChangeForm.reset();
        })
        .catch((err) => {
            console.log(`Ошибка при изменении аватара. ${err}`)
        })
        .finally(() => {
            handleButtonLoadingState(profileAvatarSubmitButton, false)
        })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        closeModal(e.target.closest('.popup'));      
    })
})


enableValidation(validationConfig);