// Number of stars to create
const starCount = 400;

// Get the stars container
const starsContainer = document.querySelector('.stars');

// Function to create random stars
function createStars() {
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const size = Math.random() * 2 + 1;  // Star size between 1px and 3px
        const xPosition = Math.random() * 100 + 'vw';  // Random horizontal position
        const yPosition = Math.random() * 100 + 'vh';  // Random vertical position
        
        // Set star size and position
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = xPosition;
        star.style.top = yPosition;

        // Random delay for twinkle animation
        const delay = Math.random() * 2 + 's';  // Random delay between 0 and 2 seconds
        star.style.animationDelay = delay;

        // Add the star to the stars container
        starsContainer.appendChild(star);
    }
}

// Call the function to generate stars
createStars();

// other

//shoting star
let lastX = null;
let lastY = null;

document.addEventListener("mousemove", (e) => {
  if (lastX === null || lastY === null) {
    lastX = e.pageX;
    lastY = e.pageY;
  }

  const deltaX = e.pageX - lastX;
  const deltaY = e.pageY - lastY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const steps = Math.ceil(distance / 5); // Ajusta 5 para la densidad del rastro

  for (let i = 0; i <= steps; i++) {
    const trail = document.createElement("div");
    trail.className = "trail";

    const progress = i / steps;
    trail.style.left = `${lastX + deltaX * progress}px`;
    trail.style.top = `${lastY + deltaY * progress}px`;

    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 100); // Tiempo para borrar
  }

  lastX = e.pageX;
  lastY = e.pageY;
});

// Down button
document.addEventListener("DOMContentLoaded", function () {
    let starsContainer = document.querySelector(".stars"); 
    let arrowButton = document.querySelector("#scrollDown");
    let animationsPaused = false;

    // Function to scroll down
    arrowButton.addEventListener("click", function () {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });

    // Function to pause/resume animations based on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50 && !animationsPaused) {
            starsContainer.style.animationPlayState = "paused"; 
            animationsPaused = true;
        } else if (window.scrollY <= 50 && animationsPaused) {
            starsContainer.style.animationPlayState = "running"; 
            animationsPaused = false;
        }
    });
});

/*header var nav */
const showAnim = gsap.from('.main-tool-bar', { 
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);
  
  ScrollTrigger.create({
    start: "top top",
    end: "max",
   // markers: true,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });

/* Scroll Trigger */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animar la primera sección cuando el usuario haga scroll
gsap.from(".container", {
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".container",
        start: "top 80%",
        end: "bottom center",
        scrub: false, // Animación que ocurre una vez al hacer scroll
       // markers: true // Puedes dejar esto para depuración
    }
});

// Desplazamiento suave cuando se hace clic en el botón
document.getElementById("scrollDown").addEventListener("click", () => {
    gsap.to(window, {
        scrollTo: ".second-section", // Se desplaza directamente a la segunda sección
        duration: 1,
        ease: "power2.inOut"
    });
});

//text randommizer
document.querySelector('.js-menu-link').addEventListener('click', function(event) {
  //event.preventDefault();
  console.log("hola posaditas");
  document.querySelector('.second-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".work-item");

// Inicializa el contenedor para que las tarjetas comiencen desde el lado derecho (fuera de la vista)
gsap.set(".work-container", { xPercent: 80 });  // Contenedor comienza al 100% hacia la derecha

// Anima las tarjetas para que se deslicen hacia la izquierda conforme haces scroll
gsap.to(".work-container", {
  xPercent: 0,  // Mueve el contenedor de las tarjetas hacia la izquierda
  ease: "none",
  scrollTrigger: {
    trigger: ".third-section",
    start: "top top",  // La animación comienza cuando la sección entra en la vista
    end: () => "+=" + (document.querySelector(".work-container").scrollWidth),  // Termina cuando todo el contenido se ha desplazado
    pin: true,  // Fija la sección mientras se hace scroll
    scrub: 1,  // Sincroniza la animación con el scroll
    snap: 1 / (sections.length - 1),  // Hace que se alineen perfectamente
    //markers: true,  // Esto es solo para depuración, puedes eliminarlo cuando ya no lo necesites
  }
});


//jummm
