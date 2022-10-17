export { scrollTo };

const scrollTo = () => {
  const { height: cardHeight } = document
    .querySelector('.images-container')
    .getBoundingClientRect();

  console.log(cardHeight);
  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
};
