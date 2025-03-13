import "./pages/index.css";
import initialCards from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, closeModalWithEsc, closeModalOnOverlay } from "./components/modal.js";

const page = document.querySelector('.page')
const cardsContainer = page.querySelector('.places__list');
const closeModalButtons = page.querySelectorAll('.popup__close');
const addCardButton = page.querySelector('.profile__add-button');
const editProfileButton = page.querySelector('.profile__edit-button');
const newCardModal = page.querySelector('.popup_type_new-card');
const editProfileModal = page.querySelector('.popup_type_edit');
const editProfileSubmitButton = editProfileModal.querySelector('.popup__button');
const imageModal = page.querySelector('.popup_type_image');
const profileTitle = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const formElement = newCardModal.querySelector('.popup__form');
const newCardImageForm = formElement.querySelector('.popup__input_type_url');
const newCardTitleForm = formElement.querySelector('.popup__input_type_card-name');

initialCards.forEach(card => {
    const cardElement = createCard(card.link, card.name,);
    cardsContainer.append(cardElement);
})

cardsContainer.addEventListener('click', deleteCard);
cardsContainer.addEventListener('click', likeCard);

addCardButton.addEventListener('click', () => {
    openModal(newCardModal);
    closeModalOnOverlay();
    page.addEventListener('keydown', closeModalWithEsc);

    newCardImageForm.value = '';
    newCardTitleForm.value = '';
})

editProfileButton.addEventListener('click', () => {
    openModal(editProfileModal);
    closeModalOnOverlay();
    page.addEventListener('keydown', closeModalWithEsc);
    
    page.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    page.querySelector('.popup__input_type_description').value = profileDescription.textContent;
})

cardsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__image')) {
        const imageLink = e.target.src;

        openModal(imageModal);
        imageModal.querySelector('.popup__image').src = imageLink;
        
        closeModalOnOverlay();
        page.addEventListener('keydown', closeModalWithEsc);
    }
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        closeModal(e.target.closest('.popup'));
    })
})

editProfileSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const newName = page.querySelector('.popup__input_type_name').value;
    const newDescription = page.querySelector('.popup__input_type_description').value;

    profileTitle.textContent = newName;
    profileDescription.textContent = newDescription;

    closeModal(editProfileModal);
})

const handleFormSubmit = (e) => {
    e.preventDefault();

    const newCardImage = newCardImageForm.value;
    const newCardTitle = newCardTitleForm.value;

    const newCard = createCard(newCardImage, newCardTitle);
    cardsContainer.append(newCard);

    closeModal(newCardModal);
}

formElement.addEventListener('submit', handleFormSubmit);