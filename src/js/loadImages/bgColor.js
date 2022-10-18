import { FastAverageColor } from 'fast-average-color';
const fac = new FastAverageColor();

export { bgColor };

const bgColor = () => {
  const container = [...document.querySelectorAll('.photo-card')];
  container.forEach(async el => {
    const image = el.querySelector('a');
    const color = await fac.getColorAsync(image.attributes[0].value);

    el.style.backgroundColor = `${color.hex}30`;
  });
};
