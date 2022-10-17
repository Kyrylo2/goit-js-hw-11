import { refs } from './js/refs';
import ImageApiService from './js/loadImages/api-images';
import renderImage from './js/loadImages/renderImages';
import { gallery } from './js/simpleLightBox';
import { scrollTo } from './js/smoothScroll';

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSubmit);
// refs.loadMoreButton.addEventListener('click', loadMore);

async function onSubmit(e) {
  e.preventDefault();

  clearImagesMarkup();

  imageApiService.query = e.currentTarget.elements.searchQuery.value;

  imageApiService.resetPage();
  try {
    const imagesArr = await imageApiService.fetchesImages();
    appendImagesMarkup(imagesArr);
  } catch {}
}

async function loadMore() {
  try {
    const imagesArr = await imageApiService.fetchesImages();
    appendImagesMarkup(imagesArr);
  } catch {}
}

function appendImagesMarkup(imagesArr) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', renderImage(imagesArr));
  gallery.refresh();
}

function clearImagesMarkup() {
  refs.imagesContainer.innerHTML = '';
}

// infinite scrolling

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageApiService.searchQuery !== '') {
      loadMore();
    }
  });
};

const options = {
  rootMargin: '200px',
};

const oberver = new IntersectionObserver(onEntry, options);

oberver.observe(refs.sentinal);
