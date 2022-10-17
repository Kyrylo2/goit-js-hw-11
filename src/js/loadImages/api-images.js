import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios').default;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchesImages() {
    try {
      const searchParams = new URLSearchParams({
        key: '30549938-651b5d539a57bc16112485a48',
        q: this.searchQuery,
        image_type: 'photo',
        page: this.page,
        orientation: 'horizontal',
        per_page: 12,
        safesearch: true,
        editors_choice: true,
      });

      const BASE_URL = `https://pixabay.com/api/?${searchParams}`;

      const response = await axios.get(BASE_URL);

      let images = await response.data;

      if (this.page === 1 && images.total > 0) {
        this.totlaHitsFound(images.totalHits);
      }

      this.incrementPage();

      if (images.total === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (images.hits.length === 0 && images.total > 0) {
        throw new Error(
          `We're sorry, but you've reached the end of search results.`
        );
      }

      return images.hits;
    } catch (err) {
      this.notifyFailure(err.message);
    }
  }

  incrementPage() {
    this.page++;
  }

  totlaHitsFound(totalHits) {
    Notify.info(`Hooray! We found ${totalHits} images.`);
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  notifyFailure(notifyText) {
    return Notify.failure(notifyText);
  }
}
