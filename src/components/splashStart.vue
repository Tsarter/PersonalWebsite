<script setup>
  import { ref } from 'vue'
defineEmits(["hide-launch"]);
</script>
<template>
  <canvas v-if="showCanvas" id="canvas"></canvas>
  <div v-if="S1Visible" id="splashAnimation">
    <div class="splash">
      <div class="splash_logo">TT</div>
      <div class="splash_svg">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" />
        </svg>
      </div>
      <div class="splash_minimize">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" />
        </svg>
      </div>
    </div>
    <div class="text">
      <p>Welcome,</p>
      <p>explode?</p>
      <button
        id="splash_Btn"
        @click="
          $emit('hide-launch');
          explode($event);
          S1Visible = false;
        "
      >
        Let's go
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "splash-start",
  setup(){
    const canvasShow = true;
    return{canvasShow}
  },
  data() {
    return {
      S1Visible: true,
      vueCanvas: null,
      showCanvas: true
    };
  },
  mounted() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    this.vueCanvas = ctx;
  },
  methods: {
    print() {
      console.log(this.vueCanvas);
    },
    async explode(event) {
      var ctx = this.vueCanvas;
      // Set Canvas to be window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Configuration, Play with these
      var config = {
        particleNumber: 800,
        maxParticleSize: 10,
        maxSpeed: 40,
        colorVariation: 500,
      };

      //DEFAULT Colors
      var colorPalette = {
        bg: { r: 12, g: 9, b: 29 },
        //bg: { r: 96, g: 92, b: 244 },
        matter: [
          { r: 36, g: 18, b: 42 }, // darkPRPL
          { r: 78, g: 36, b: 42 }, // rockDust
          { r: 252, g: 178, b: 96 }, // solorFlare
          { r: 253, g: 238, b: 152 }, // totesASun
        ],
      };
      /* var colorPalette = {
            bg: { r: 96, g: 92, b: 244 },
            matter: [
                { r: 167, g: 167, b: 167 }, // darkPRPL
                { r: 66, g: 62, b: 213 }, // rockDust
                { r: 188, g: 225, b: 40 }, // solorFlare
                { r: 0, g: 0, b: 0 } // totesASun
            ]
            }; */

      // Some Variables hanging out
      var particles = [],
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        drawBg,
        // Draws the background for the canvas, because space
        drawBg = function (ctx, color) {
          ctx.fillStyle =
            "rgb(" + color.r + "," + color.g + "," + color.b + ")";
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

      // Particle Constructor
      var Particle = function (x, y) {
        // X Coordinate
        this.x = x || Math.round(Math.random() * canvas.width);
        // Y Coordinate
        this.y = y || Math.round(Math.random() * canvas.height);
        // Radius of the space dust
        this.r = Math.ceil(Math.random() * config.maxParticleSize);
        // Color of the rock, given some randomness
        this.c = colorVariation(
          colorPalette.matter[
            Math.floor(Math.random() * colorPalette.matter.length)
          ],
          true
        );
        // Speed of which the rock travels
        this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), 0.7);
        // Direction the Rock flies
        this.d = Math.round(Math.random() * 360);
      };

      // Provides some nice color variation
      // Accepts an rgba object
      // returns a modified rgba object or a rgba string if true is passed in for argument 2
      var colorVariation = function (color, returnString) {
        var r, g, b, a, variation;
        r = Math.round(
          Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.r
        );
        g = Math.round(
          Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.g
        );
        b = Math.round(
          Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.b
        );
        a = Math.random() + 0.5;
        if (returnString) {
          return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        } else {
          return { r, g, b, a };
        }
      };

      // Used to find the rocks next point in space, accounting for speed and direction
      var updateParticleModel = function (p) {
        var a = 180 - (p.d + 90); // find the 3rd angle
        p.d > 0 && p.d < 180
          ? (p.x += (p.s * Math.sin(p.d)) / Math.sin(p.s))
          : (p.x -= (p.s * Math.sin(p.d)) / Math.sin(p.s));
        p.d > 90 && p.d < 270
          ? (p.y += (p.s * Math.sin(a)) / Math.sin(p.s))
          : (p.y -= (p.s * Math.sin(a)) / Math.sin(p.s));
        return p;
      };

      // Just the function that physically draws the particles
      // Physically? sure why not, physically.
      var drawParticle = function (x, y, r, c) {
        ctx.beginPath();
        ctx.fillStyle = c;
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
      };

      // Remove particles that aren't on the canvas
      var cleanUpArray = function () {
        particles = particles.filter((p) => {
          return p.x > -100 && p.y > -100;
        });
      };

      var initParticles = function (numParticles, x, y) {
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle(x, y));
        }
        particles.forEach((p) => {
          drawParticle(p.x, p.y, p.r, p.c);
        });
      };

      // That thing
      window.requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      // Our Frame function
      var frame = function () {
        // Draw background first
        drawBg(ctx, colorPalette.bg);
        // Update Particle models to new position
        particles.map((p) => {
          return updateParticleModel(p);
        });
        // Draw em'
        particles.forEach((p) => {
          drawParticle(p.x, p.y, p.r, p.c);
        });
        // Play the same song? Ok!
        window.requestAnimFrame(frame);
      };

      // First Frame
      frame();
      document.getElementById("canvas").style.visibility = "visible";
      document.getElementById("splashAnimation").style.visibility = "hidden";
      var x = event.clientX,
        y = event.clientY;
      cleanUpArray();
      initParticles(config.particleNumber, x, y);

      // First particle explosion
      //initParticles(config.particleNumber);
      //Fade Out https://stackoverflow.com/questions/59528490/how-to-add-a-fade-out-effect-in-an-html-canvas
      function timeout () {
        return new Promise(() => setTimeout(function () {
        var fadeTarget = document.getElementById("canvas");
        var fadeEffect = setInterval(function () {
          if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
          }
          if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.02;
          } else {
            clearInterval(fadeEffect)
          }
        }, 20);
      }, 1500));
      }
      await timeout();

    },
  },
};
</script>

<style scoped>

#canvas{
  z-index: 10;
}
.text {
  opacity: 0;
  position: absolute;
  z-index: 7;
  text-align: left;
  margin: -50px 0 0 -150px;
  width: 300px;
  height: 100px;
  top: 50%;
  left: 50%;
  font-size: 48px;
  font-weight: 700;
  -webkit-animation: on 0.6s ease-in-out 3.7s forwards;
  -moz-animation: on 0.6s ease-in-out 3.7s forwards;
  -o-animation: on 0.6s ease-in-out 3.7s forwards;
  animation: on 0.6s ease-in-out 3.7s forwards;
}

.text p {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  -webkit-animation: type 0.3s steps(60, end) 3.7s;
  -moz-animation: type 0.3s steps(60, end) 3.7s;
  -o-animation: type 0.3s steps(60, end) 3.7s;
  animation: type 0.3s steps(60, end) 3.7s;
}

.text p:nth-child(2) {
  -webkit-animation: type2 0.5s steps(60, end) 3.7s;
  -moz-animation: type2 0.5s steps(60, end) 3.7s;
  -o-animation: type2 0.5s steps(60, end) 3.7s;
  animation: type2 0.5s steps(60, end) 3.7s;
}

.text button {
  border: 0;
  opacity: 0;
  background: #191919;
  color: var(--main-color);
  border: 1px solid #191919;
  letter-spacing: 2px;
  padding: 0.5rem 2.5rem;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  -webkit-transition: color 0.5s, background-color 0.5s;
  -moz-transition: color 0.5s, background-color 0.5s;
  -ms-transition: color 0.5s, background-color 0.5s;
  -o-transition: color 0.5s, background-color 0.5s;
  transition: color 0.5s, background-color 0.5s;
  -webkit-animation: on 0.6s ease-in-out 4s forwards;
  -moz-animation: on 0.6s ease-in-out 4s forwards;
  -o-animation: on 0.6s ease-in-out 4s forwards;
  animation: on 0.6s ease-in-out 4s forwards;
}

.text button:hover {
  background: var(--main-color);
  color: #191919;
  border: 1px solid #191919;
}

.splash {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
}

.splash_logo {
  position: absolute;
  margin: -15px 0 0 -25px;
  top: 50vh;
  z-index: 5;
  left: 50vw;
  width: 50px;
  text-align: center;
  height: 30px;
  font-size: 26px;
  font-weight: 600;
  color: #ffffff;
  opacity: 1;
  will-change: opacity;
  -webkit-animation: logo 0.3s ease-in 1.5s forwards,
    off 0.6s ease-in-out 3.2s forwards;
  -moz-animation: logo 0.3s ease-in 1.5s forwards,
    off 0.6s ease-in-out 3.2s forwards;
  -o-animation: logo 0.3s ease-in 1.5s forwards,
    off 0.6s ease-in-out 3.2s forwards;
  animation: logo 0.3s ease-in 1.5s forwards, off 0.6s ease-in-out 3.2s forwards;
}

.splash_logo:before {
  display: block;
  position: absolute;
  left: 15px;
  bottom: -5px;
  width: 20px;
  height: 1px;
  background-color: #757474;
  content: "";
}

.splash_logo:after {
  display: block;
  position: absolute;
  left: 15px;
  top: -5px;
  width: 20px;
  height: 1px;
  background-color: #757474;
  content: "";
  will-change: width;
}

.splash_svg {
  position: relative;
  margin: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
}

.splash_svg svg {
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
}

.splash_svg svg rect {
  width: 100%;
  height: 100%;
  fill: var(--main-color);
  stroke: 0;
  -webkit-clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
  clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
  -webkit-animation: expand 0.7s ease-in forwards 2.7s;
  -moz-animation: expand 0.7s ease-in forwards 2.7s;
  -o-animation: expand 0.7s ease-in forwards 2.7s;
  animation: expand 0.7s ease-in forwards 2.7s;
}

.splash_minimize {
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
}

.splash_minimize svg {
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
}

.splash_minimize svg rect {
  width: 100%;
  height: 100%;
  -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
  clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
  -webkit-animation: scale 0.2s ease-out forwards 1s,
    hide 1.3s ease-out forwards 1.2s;
  -moz-animation: scale 0.2s ease-out forwards 1s,
    hide 1.3s ease-out forwards 1.2s;
  -o-animation: scale 0.2s ease-out forwards 1s,
    hide 1.3s ease-out forwards 1.2s;
  animation: scale 0.2s ease-out forwards 1s, hide 1.3s ease-out forwards 1.2s;
}

@-webkit-keyframes scale {
  100% {
    -webkit-clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
  }
}

@-moz-keyframes scale {
  100% {
    -webkit-clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
  }
}

@-o-keyframes scale {
  100% {
    -webkit-clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
  }
}

@keyframes scale {
  100% {
    -webkit-clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
  }
}

@-webkit-keyframes hide {
  100% {
    fill: transparent;
  }
}

@-moz-keyframes hide {
  100% {
    fill: transparent;
  }
}

@-o-keyframes hide {
  100% {
    fill: transparent;
  }
}

@keyframes hide {
  100% {
    fill: transparent;
  }
}

@-webkit-keyframes off {
  100% {
    opacity: 0;
  }
}

@-moz-keyframes off {
  100% {
    opacity: 0;
  }
}

@-o-keyframes off {
  100% {
    opacity: 0;
  }
}

@keyframes off {
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes on {
  100% {
    opacity: 1;
  }
}

@-moz-keyframes on {
  100% {
    opacity: 1;
  }
}

@-o-keyframes on {
  100% {
    opacity: 1;
  }
}

@keyframes on {
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes logo {
  100% {
    color: #292929;
  }
}

@-moz-keyframes logo {
  100% {
    color: #292929;
  }
}

@-o-keyframes logo {
  100% {
    color: #292929;
  }
}

@keyframes logo {
  100% {
    color: #292929;
  }
}

@-webkit-keyframes type {
  0% {
    width: 0;
  }
}

@-moz-keyframes type {
  0% {
    width: 0;
  }
}

@-o-keyframes type {
  0% {
    width: 0;
  }
}

@keyframes type {
  0% {
    width: 0;
  }
}

@-webkit-keyframes type2 {
  0% {
    width: 0;
  }
  50% {
    width: 0;
  }
  100% {
    width: 100;
  }
}

@-moz-keyframes type2 {
  0% {
    width: 0;
  }
  50% {
    width: 0;
  }
  100% {
    width: 100;
  }
}

@-o-keyframes type2 {
  0% {
    width: 0;
  }
  50% {
    width: 0;
  }
  100% {
    width: 100;
  }
}

@keyframes type2 {
  0% {
    width: 0;
  }
  50% {
    width: 0;
  }
  100% {
    width: 100;
  }
}

@-webkit-keyframes expand {
  25% {
    -webkit-clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 58vh, 45vw 58vh);
    clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  50% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  75% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    fill: var(--main-color);
  }
  100% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    fill: var(--main-color);
  }
}

@-moz-keyframes expand {
  25% {
    -webkit-clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 58vh, 45vw 58vh);
    clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  50% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  75% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    fill: var(--main-color);
  }
  100% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    fill: var(--main-color);
  }
}

@-o-keyframes expand {
  25% {
    -webkit-clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 58vh, 45vw 58vh);
    clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  50% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  75% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    fill: var(--main-color);
  }
  100% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    fill: var(--main-color);
  }
}

@keyframes expand {
  25% {
    -webkit-clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 58vh, 45vw 58vh);
    clip-path: polygon(0vw 0vh, 55vw 40vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  50% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 45vw 60vh);
    fill: var(--main-color);
  }
  75% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 55vw 60vh, 0vw 100vh);
    fill: var(--main-color);
  }
  100% {
    -webkit-clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    clip-path: polygon(0vw 0vh, 100vw 0vh, 100vw 100vh, 0vw 100vh);
    fill: var(--main-color);
  }
}
</style>
