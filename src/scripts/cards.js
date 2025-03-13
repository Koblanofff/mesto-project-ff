const ArhizImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const ChelabOblImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const IvanovoImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const KamchatkaImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const HolmogorImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg");
const BaikalImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

const initialCards = [
    {
      name: "Архыз",
      link: ArhizImage
    },
    {
      name: "Челябинская область",
      link: ChelabOblImage
    },
    {
      name: "Иваново",
      link: IvanovoImage
    },
    {
      name: "Камчатка",
      link: KamchatkaImage
    },
    {
      name: "Холмогорский район",
      link: HolmogorImage
    },
    {
      name: "Байкал",
      link: BaikalImage
    }
];

export default initialCards;