const closeModalOnOverlay = (e) => {
    if (e.target.classList.contains('popup')) {
        closeModal(e.currentTarget);
    }
}

const closeModalWithEsc = (e) => {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}
const closeModal = (modalWindow) => {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalWithEsc);
    modalWindow.removeEventListener('mousedown', closeModalOnOverlay);
}

const openModal = (modalWindow) => {
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalWithEsc);
    modalWindow.addEventListener('mousedown', closeModalOnOverlay);
}



export { openModal, closeModal }