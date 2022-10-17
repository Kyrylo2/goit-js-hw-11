import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export { gallery };

let gallery = new SimpleLightbox('.images-container a', {
  captionDelay: 250,
});
