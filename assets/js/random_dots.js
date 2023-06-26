// Some random colors
const colors = ['#309a46', '#196499', '#000', '#ca960c', '#c92a2a'];

const numBalls = 100;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}%`;
  ball.style.top = `${Math.floor(Math.random() * 100)}%`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}rem`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.querySelector('.random-dots').appendChild(ball);
}

// Keyframes
balls.forEach((el, i) => {
  let to = {
    x: Math.round(Math.random() * 12),
    y: Math.round(Math.random() * 12),
  };
  el.animate(
    // KeyFrames
    [
      { transform: `translate(0,0)  rotateZ(0)` }, // start
      { transform: `translate(${to.x}rem,${to.y}rem)  rotateZ(180deg) ` }, // 25%
      { transform: `translate(-${to.x}rem,${to.y}rem)  rotateZ(360deg)` }, // 50%
      { transform: `translate(-${to.x}rem,-${to.y}rem)  rotateZ(540deg)` }, // 75%
      { transform: `translate(0,0)  rotateZ(720deg)` }, //end
    ],
    // { transform: [`rotateZ(-90deg)`, `rotateZ(360deg) `] },  // alternate using one object and array for each property

    {
      duration: (Math.random() + 1) * 3000, // random duration  // timing
      direction: 'alternate',
      fill: 'both',
      iterations: Infinity,
      easing: 'linear',
    }
  );
});

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
