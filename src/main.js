
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector('.loader');

// Використання галереї SimpleLightbox(Зображення відкриваються як модальне вікно)
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    overlayOpacity: 0.5,
});

// Використання iziToast (Вспливаюче повідомлення)
function showMessage() {
    iziToast.error({
    message: 'Sorry, there are no images matching your search query. Please try again!',
    messageColor: '#FAFAFB',
    backgroundColor: '#EF4040',
    position: 'topRight',
    close: false,
    closeOnClick: true,
    });
    
}

form.addEventListener('submit', fetchImages);

function fetchImages(event) {
    // прибираємо дію за замовченням
    event.preventDefault();
    // відміняємо приховування loader
    loader.style.display = 'block';
     gallery.innerHTML = '';
    // Створення параметрів пошуку Pixabay
    const searchQueries = event.target.elements.search.value;
    const searchParams = new URLSearchParams({
        key: '41488002-513c6a9a4c115eae6a99045d3',
        q: searchQueries,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    // Отримання даних з Pixabay за параметрами
    fetch(`https://pixabay.com/api/?${searchParams}`)
        .then((response) => {
            loader.style.display = 'none';
            if (!response.ok) { throw new Error(response.status); }
            return response.json();
        })
        .then((data) => {
            // (Якщо data.hits.length дорівнює 0, це означає, що у відповіді немає зображень)
            if (data.hits.length === 0) {
                 gallery.innerHTML = '';
                return showMessage();

            }
            const renderImg = data.hits.reduce((html, image) => {
                return html + imageCard(image);
            }, '');
            gallery.innerHTML = renderImg;
            // оновлюємо вміст
            lightbox.refresh();
        })
        .catch((error) => {
            showAlert(error.toString());
        });
}
function imageCard(images) {
    return `<li>
    <a href="${images.largeImageURL}">
        <img src="${images.webformatURL}" alt="${images.tags}">
    </a>
    <div class="info">
        <div class="image-info">
            <span>Likes</span>
            <span class="image-value">${images.likes}</span>
        </div>
        <div class="image-info">
            <span>Views</span>
            <span class="image-value">${images.views}</span>
        </div>
        <div class="image-info">
            <span>Comments</span>
            <span class="image-value">${images.comments}</span>
        </div>
        <div class="image-info">
            <span>Downloads</span>
            <span class="image-value">${images.downloads}</span>
        </div>
    </div>
    </li>`;
};