const openModal = (modalWindow) => {
    modalWindow.classList.add('popup_is-animated', 'popup_is-opened');
}

const closeModal = (modalWindow) => {
    modalWindow.classList.remove('popup_is-animated', 'popup_is-opened');
}

const closeModalWithEsc = (e) => {
    const modal = document.querySelector('.popup_is-opened');
    if (modal && e.key === 'Escape') {
        closeModal(modal)
    } 
}

const closeModalOnOverlay = (e) => {
    const modal = document.querySelector('.popup_is-opened');
    
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) {
            closeModal(modal);
        }
    })
}

export { openModal, closeModal, closeModalWithEsc, closeModalOnOverlay }