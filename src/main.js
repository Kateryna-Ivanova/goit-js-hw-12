import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
// --------------------------------------------------------елементи
const form = document.querySelector(".js-search-form");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".js-gallery");
const btnMore = document.querySelector(".js-loadmore");
const target = document.querySelector('.js-backdrop');

let page = 1;
let query = "";

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
// ----------------------------------------------------слухачі подій
form.addEventListener("submit", onSubmit);

btnMore.addEventListener("click", loadMoreData);
//---------------------------------------------------ф-я при натисканні Search
async function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = "";
  btnMore.classList.add("is-hidden");

  page = 1;
  // Витягуємо пошуковий запит із введеної форми.
  query = event.target.elements["search"].value.trim();
  loaderPlay();

  if (!query) {

    loaderStop();
    gallery.innerHTML = "";
    btnMore.classList.add("is-hidden");
    return iziToast.info({
      messageColor: 'rgb(255, 255, 255)',
      backgroundColor: 'blue',
      timeout: '5000',
      message: "Please fill out search field",
      position: 'topRight',
    });
  };
  try {
    //Oтримуємо масив зображень і загальну кількість зображень для запиту.
    const { data: { hits, totalHits } } = await getPicture(query, page);
    if (hits.length > 0) {
      // Відтворюємо галерею із отриманими зображеннями.
     gallery.innerHTML = renderGallery(hits);
      lightbox.refresh();
      btnMore.classList.remove("is-hidden");

    if (page * 40 >= totalHits) {
      btnMore.classList.add("is-hidden");
      iziToast.info({
      messageColor: 'rgb(66, 170, 255)',
      backgroundColor: 'blue',
      timeout: '3000',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    }
    } else {
      btnMore.classList.add("is-hidden");
      iziToast.error({
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"5000",
                        message: "Sorry, there are no images matching your search query. Please try again.",
                        position: 'topRight',
                });
   }
  } catch (error) {
    iziToast.error({   title: Error,
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"3000",
                        position: "topRight",
                });
  }
  finally { loaderStop(); };
  event.target.reset();
};
//--------------------------------------------------------- ф-я при натисканні кнопки Load More
async function loadMoreData() {
  // Збільшуємо номер сторінки.
  page += 1;
  loaderPlay();
  try {
    // Намагаємось отримати більше фотографій зі збільшеним номером сторінки.
    const { data: { hits, totalHits } } = await getPicture(query, page);
      gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
      lightbox.refresh();
      
      btnMore.classList.remove("is-hidden");
// Якщо результатів більше немає, відображаємо повідомлення.
    if (page * 40 >= totalHits) {
        
        btnMore.classList.add("is-hidden");

        iziToast.info({
      messageColor: 'rgb(255, 255, 255)',
      backgroundColor: 'red',
      timeout: '6000',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    };
  } catch (error) {
    iziToast.error({   title: Error,
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"3000",
                        position: "topRight",
                });
  }
   finally { loaderStop() };
};
// -------------------------------------------------------------ф-я запиту
 function getPicture(query, page) {

  const API_KEY = '41659492-ec5a278d39a7ff9431707ab98';
  axios.defaults.baseURL = "https://pixabay.com/api/";
  return axios.get("", {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 40,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });
};
// ---------------------------------------------------ф-я візуалізації галереї
 function renderGallery(arr) {
  // ф-я отримує масив зображень і генерує HTML для кожного зображення.
  // Згенерований HTML містить посилання на велике зображення ,інформацію про вподобання, перегляди, коментарі та завантаження.
  return arr.map(( image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads,  } = image;
       return `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}"  >
          </a>
          <div class="gallery-item-info">
            <div class="info">
            <p><b>Likes</b></p>
            <p>${likes}</p>
            </div>
            <div class="info">
            <p><b>Views</b></p>
            <p>${views}</p>
            </div>
            <div class="info">
            <p><b>Comments</b></p>
            <p>${comments}</p>
            </div>
            <div class="info">
            <p><b>Downloads</b></p>
            <p>${downloads}</p>
            </div>
          </div>
        </li>
      `;
    }).join("");
};
// -------------------------------------------------------ф-ї  завантаження
function loaderPlay() {
  loader.classList.remove("hidden");
  target.classList.remove('is-hidden');
};

function loaderStop() {
  loader.classList.add("hidden");
  target.classList.add('is-hidden');
};


