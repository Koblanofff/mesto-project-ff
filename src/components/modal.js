import { resetValidation } from './formValidation.js'

const closeModalOnOverlay = (e) => {
    if (e.target.classList.contains('popup')) {
        closeModal(e.currentTarget);
    }
}

const closeModalWithEsc = (e) => {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup__is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

const closeModal = (modalWindow) => {
    modalWindow.classList.remove('popup__is-opened');
    document.removeEventListener('keydown', closeModalWithEsc);
    modalWindow.removeEventListener('mousedown', closeModalOnOverlay);
}

const openModal = (modalWindow, validationConfig) => {
    resetValidation(modalWindow, validationConfig);
    openModalWithoutValidation(modalWindow)
}

const openModalWithoutValidation = (modalWindow) => {
    modalWindow.classList.add('popup__is-opened');
    document.addEventListener('keydown', closeModalWithEsc);
    modalWindow.addEventListener('mousedown', closeModalOnOverlay);
}


export { openModal, closeModal, openModalWithoutValidation }