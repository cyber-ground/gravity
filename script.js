'use strict';





// -------------------------------------------------------------------------------------------------------

//                                      ----- GRAVITY -----
// -------------------------------------------------------------------------------------------------------
// gravity version 1. 完成版 ---

const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;


class Ball {
  constructor(x, y, radius, color, dy, gravity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dy = dy;
  this.gravity = gravity;
  this.friction = 0.7;
  this.eventHandler();
  }
  eventHandler() {  // gravity switch event
    window.addEventListener('click', (e) => {
      if(e.clientY < 100 &&  // 1G
        e.clientX > 150 && e.clientX < canvas.width - 150) {
        canvas.classList.remove('blank');
      } 
      if(e.clientY < canvas.height - 85  // 1/2G
      && e.clientY > canvas.height - 130 && 
        e.clientX > 150 && e.clientX < canvas.width - 150) {
        canvas.classList.add('blank');
      }
    });
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  movement() {
    this.y += this.dy
  }
  colDetect() {
    if(this.y + this.radius > canvas.height) {
      if(this.dy < 0) {
        // this.y = canvas.height - this.radius
        // this.dy = '';
      } else {
        this.dy = -this.dy * this.friction;
      }
    } 
    else {  // * gravity inside else process * //
      this.dy += this.gravity;
    }
  }
  update() {
    this.draw();
    this.colDetect();
    this.movement();
  }
}

// -------------------------------------------------------------------------

  const ballArray = [];
function createBalls(gravity) {
  if(canvas.classList.contains('blank')) 
    {gravity = 0.1} else {gravity = 1}
  for (let i = 0; i < 500; i++) {
    ballArray.push(new Ball(
    Math.random() * (canvas.width - 80) + 40, 
    // Math.random() * canvas.width, // ballsOverCvsWidth
    Math.random() * canvas.height * 2 - 1500,  
    Math.random() * 30 + 10, 
    `hsla(${Math.random() * 360}, 80%, 50%, 0.5)`, 
    Math.random() * 12, gravity));
  }
} createBalls();

function popBalls(gravity) {
  if(canvas.classList.contains('blank')) 
    {gravity = 0.1} else {gravity = 1}
  for (let i = 0; i < 500; i++) {
      ballArray.push(new Ball(
      Math.random() * (canvas.width - 80) + 40, 
      // Math.random() * canvas.width, // ballsOverCvsWidth
      Math.random() * canvas.height - 50,    
      Math.random() * 30 + 10, 
      `hsla(${Math.random() * 360}, 80%, 50%, 0.5)`, 
      Math.random() * -12, gravity));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballArray.forEach(ball => {
    ball.update();
  });
  requestAnimationFrame(animate);
}
animate();


// event ------------------------------------------------------------------

canvas.addEventListener('click', (e) => {
  if(e.clientY < 100 && e.clientX < 100) {
    ballArray.splice(0);
    createBalls(); // new ball
  } else if(e.clientY < 100 && e.clientX > canvas.width - 100) {
      createBalls(); // add ball
      if(ballArray[1001]) {ballArray.splice(0, 500)} 
    // canvas color switch
  } else if(e.clientY > canvas.height / 2 - 25 
      && e.clientY < canvas.height / 2 + 25) {
    canvas.classList.toggle('js_bgColorBlack');
    body.classList.toggle('js_bgColorBlack');
  } 
  // click & pop bottom balls
  if(e.clientY > canvas.height - 50) {
    ballArray.splice(0);
    popBalls();
  }
});

window.addEventListener('resize', () => {
  window.location.reload();
});


// -------------------------------------------------------------------------------------------------------
// gravity version 2. colDetect 改良参考版 ---


// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;

// class Ball {
//   constructor(x, y, radius, color, dy) {
//   this.x = x;
//   this.y = y;
//   this.radius = radius;
//   this.color = color;
//   this.dy = dy;
//   this.gravity = 1;
//   this.friction = 0.5;
//   }
//   draw() {
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.closePath();
//   }
//   movement() {
//     this.y += this.dy
//     // console.log(this.dy);
//   }
//   colDetect() {
//     if(this.dy < 0) {  
//       if(this.y + this.radius > canvas.height) {
//         this.dy = -this.dy * this.friction;
//       } else {
//           this.dy += this.gravity;
//       }
//     } else {
//       if(this.y + this.radius + this.dy > canvas.height) {
//         this.dy = -this.dy * this.friction;
//       } else {
//           this.dy += this.gravity;
//       }
//     }
//   }
//   update() {
//     this.colDetect();
//     this.movement();
//     this.draw();
//   }
// }

// // const ball = new Ball(canvas.width / 2, canvas.height / 2, 30, 'red', 2);

// const balls = [];
// function createBalls() {
//   for (let i = 0; i < 500; i++) {
//     balls.push(new Ball(
//     Math.random() * canvas.width, 
//     Math.random() * canvas.height - 100,  
//     // 30, 
//     Math.random() * 30 + 10, 
//     `hsla(${Math.random() * 360}, 80%, 50%, 0.5)`, 2));
//   }
// } createBalls();


// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // ball.update()
//   balls.forEach(ball => {
//     ball.update();
//   });
//   requestAnimationFrame(animate);
// }
// animate();

// canvas.addEventListener('click', (e) => {
//   if(e.clientY > canvas.height - 50) {
//     balls.splice(0);
//     for (let i = 0; i < 500; i++) {
//       balls.push(new Ball(
//         Math.random() * canvas.width, 
//         Math.random() * canvas.height - 50,    // slowOne +300
//         // 30, 
//         Math.random() * 30 + 10, 
//         `hsla(${Math.random() * 360}, 80%, 50%, 0.5)`, Math.random() * 12))
//     }
//   }
// });

// window.addEventListener('resize', () => {
//   window.location.reload();
// });


// -------------------------------------------------------------------------------------------------------
// gravity version 3. bounce balls 完成版 ---


// const colors = ['#2185c5','#7ecefd','#fff6e5','#ff7f66'];
// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;


//   function randomColor(colorsArr) {
//     return colorsArr[Math.floor(Math.random() * colors.length)];
//   }
//   function randomMinMax(min, max) {
//     return Math.random() * (max - min) + min;
//   }


// class Ball {
//   constructor(x, y, radius, color, dx, dy) {
//   this.x = x;
//   this.y = y;
//   this.radius = radius;
//   this.color = color;
//   this.dx = dx;
//   this.dy = dy;
//   this.gravity = 1;
//   this.friction = 0.98;
//   }
//   draw() {
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.stroke()
//     ctx.closePath();
//   }
//   movement() {
//     this.x += this.dx;
//     this.y += this.dy
//     // console.log(this.dy);
//   }
//   colDetect() {
//     if(this.dy < 0) {  // detect ground
//       if(this.y + this.radius > canvas.height) {
//         this.dy = -this.dy * this.friction;
//       } else {
//         this.dy += this.gravity;
//       }
//     } else {
//       if(this.y + this.radius + this.dy > canvas.height) {
//         this.dy = -this.dy * this.friction;
//       } else {
//         this.dy += this.gravity;
//       }
//     }
//     // detect x coordinate
//     if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
//       this.dx = -this.dx;
//     }
//     // delate dx value
//     if(this.y + this.radius > canvas.height - 3 
//     && this.y - this.radius > canvas.height - 65) {
//       this.dx *= 0.9;
//     } else {this.dx = this.dx}
//   }
//   update() {
//     this.colDetect();
//     this.movement();
//     this.draw();
//   }
// }


// // const ball = new Ball(canvas.width / 2, canvas.height / 2, 30, 'red', 0, 2);
// // --------------------------------------------------------------------------------

// const ballArr = [];
// function createBalls() {
//   for (let i = 0; i < 500; i++) {
//     ballArr.push(new Ball(
//     randomMinMax(40, canvas.width - 40), 
//     randomMinMax(0, canvas.height - 100),  
//     randomMinMax(10, 30), 
//     randomColor(colors), 
//     Math.random() < 0.5 ? 5 : -5, Math.random() * -12));
//   }
// } createBalls();


// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // ball.update()
//   ballArr.forEach(ball => {
//     ball.update();
//   });
//   requestAnimationFrame(animate);
// }
// animate();


// // event ---------------------------------------------------------------

// canvas.addEventListener('click', (e) => {
//   if(e.clientY > canvas.height - 50) {
//     ballArr.splice(0);
//     for (let i = 0; i < 500; i++) {
//       ballArr.push(new Ball(
//         randomMinMax(40, canvas.width - 40), 
//         randomMinMax(50, canvas.height - 100),  
//         randomMinMax(10, 30),
//         randomColor(colors), 
//         Math.random() < 0.5 ? 5 : -5, Math.random() * -12));
//     }
//   }
// });

// window.addEventListener('resize', () => {
//   window.location.reload();
// });


// -------------------------------------------------------------------------------------------------------








