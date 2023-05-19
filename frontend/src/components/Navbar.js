import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

const Navbar = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const ml4 = {};
    ml4.opacityIn = [0, 1];
    ml4.scaleIn = [0.2, 1];
    ml4.scaleOut = 3;
    ml4.durationIn = 500;
    ml4.durationOut = 900;
    ml4.delay = 1000;

    const animation = anime.timeline({ loop: true })
      .add({
        targets: textRef.current,
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      }).add({
        targets: textRef.current,
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      });

    const timeoutId = setTimeout(() => {
      animation.pause(); // Pauses the animation
      anime.remove(textRef.current); // Removes the animation from the element
      anime({
        targets: textRef.current,
        opacity: 1, // Sets the opacity to 1 to make it visible
        scale: 1 // Sets the scale to 1 to stop the movement
      });
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="ml4" ref={textRef}>
            to-Do
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
