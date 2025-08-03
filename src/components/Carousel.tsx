import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({ images, infinite = false }) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lógica para navegação "Next"
  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex + step) % images.length;
      }

      return Math.min(prevIndex + step, images.length - frameSize);
    });
  };

  // Lógica para navegação "Prev"
  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex - step + images.length) % images.length;
      }

      return Math.max(prevIndex - step, 0);
    });
  };

  // Slice das imagens visíveis
  const visibleImages = infinite
    ? [...images, ...images].slice(currentIndex, currentIndex + frameSize)
    : images.slice(currentIndex, currentIndex + frameSize);

  return (
    <div className="Carousel">
      <h1 data-cy="title">Carrossel</h1>

      {/* Inputs de controle */}
      <div className="Carousel__controls">
        <label>
          Largura de cada item (px):
          <input
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label>
          Imagens visíveis:
          <input
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label>
          Passo:
          <input
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label>
          Duração da animação (ms):
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>
      </div>

      {/* Carrossel */}
      <div
        className="Carousel__container"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms ease-in-out`,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {visibleImages.map((image, index) => (
            <li
              key={index}
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img src={image} alt={`Image ${index}`} />
            </li>
          ))}
        </ul>
      </div>

      {/* Botões de navegação */}
      <div className="Carousel__navigation">
        <button type="button" onClick={handlePrev}>
          Prev
        </button>
        <button type="button" onClick={handleNext} data-cy="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
