import './pages/index.css';
import initialCards from './scripts/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const page = document.querySelector('.page'); 
const popups = page.querySelectorAll('.popup') 
const cardModal = page.querySelector('.popup_type_image');
const cardModalName = cardModal.querySelector('.popup__caption');
const cardModalImage = cardModal.querySelector('.popup__image');
const cardsContainer = page.querySelector('.places__list');
const newCardButton = page.querySelector('.profile__add-button');
const newCardModal = page.querySelector('.popup_type_new-card');
const newCardInputImage = newCardModal.querySelector('.popup__input_type_url');
const newCardInputTitle = newCardModal.querySelector('.popup__input_type_card-name');
const newCardForm = newCardModal.querySelector('.popup__form');
const editProfileButton = page.querySelector('.profile__edit-button');
const editProfileModal = page.querySelector('.popup_type_edit'); 
const profileInputName = editProfileModal.querySelector('.popup__input_type_name');
const currentProfileName = page.querySelector('.profile__title');
const profileInputDescription = editProfileModal.querySelector('.popup__input_type_description');
const currentProfileDescription = page.querySelector('.profile__description');
const editProfileSubmitButton = editProfileModal.querySelector('.popup__button');
const closeModalButtons = page.querySelectorAll('.popup__close');

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
});

const handleCardModal = (e) => {
    openModal(cardModal);

    const cardElement = e.target.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title').textContent;

    cardModalName.textContent = cardTitle;
    cardModalImage.src = e.target.src;
    cardModalImage.alt = cardTitle;
}

newCardButton.addEventListener('click', () => {
    openModal(newCardModal);
    newCardForm.reset();
})

const handleNewCardForm = (e) => {
    e.preventDefault();

    const newCardImage = newCardInputImage.value;
    const newCardTitle = newCardInputTitle.value;

    const newCard = createCard(newCardImage, newCardTitle, handleCardModal);
    cardsContainer.append(newCard);

    closeModal(newCardModal);
}

newCardForm.addEventListener('submit', handleNewCardForm);

initialCards.forEach((card) => {
    const newCard = createCard(card.link, card.name, handleCardModal);
    cardsContainer.append(newCard);
});

editProfileButton.addEventListener('click', () => {
    openModal(editProfileModal);

    profileInputName.value = currentProfileName.textContent;
    profileInputDescription.value = currentProfileDescription.textContent;
})

editProfileSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();

    currentProfileName.textContent = profileInputName.value;
    currentProfileDescription.textContent = profileInputDescription.value;

    closeModal(editProfileModal);
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        closeModal(e.target.closest('.popup'));
    })
})