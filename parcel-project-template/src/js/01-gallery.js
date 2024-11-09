// Import gallery items and SimpleLightbox library
import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';

// Create gallery container and generate gallery markup
const galleryContainer = document.querySelector('ul.gallery');
const photosMarkup = createGalleryItem(galleryItems);

function createGalleryItem(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <a class="gallery__item" href="${original}">
              <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>`;
    })
    .join('');
}

// Insert generated markup into the gallery container
galleryContainer.insertAdjacentHTML('beforeend', photosMarkup);

// Initialize SimpleLightbox
const galleryHandler = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

galleryHandler.on('show.simplelightbox');
