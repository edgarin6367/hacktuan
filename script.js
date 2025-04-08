// Versión optimizada pero idéntica en funcionamiento
const starCount = 400;
const starsContainer = document.querySelector('.stars');

// Crear fragmento para mejor rendimiento
const fragment = document.createDocumentFragment();

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    star.style.cssText = `
        width: ${Math.random() * 2 + 1}px;
        height: ${Math.random() * 2 + 1}px;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    fragment.appendChild(star);
}

starsContainer.appendChild(fragment);

// other

//shoting star
// Versión más limpia con mismo resultado
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = `${e.pageX}px`;
  trail.style.top = `${e.pageY}px`;
  
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 100);
});

// Down button
// Versión más concisa
document.getElementById("scrollDown").addEventListener("click", () => {
  window.scrollBy({ 
      top: window.innerHeight, 
      behavior: "smooth" 
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

//starts scroll 
gsap.registerPlugin(ScrollTrigger);

// 1. Inicialización
const container = document.querySelector(".work-container");
const cards = gsap.utils.toArray(".work-item");
const isMobile = window.innerWidth < 768;

// 2. Resetear estatos iniciales
gsap.set(cards, {
  clearProps: "all" // Limpia cualquier estilo previo
});

// 3. Configuración inicial según dispositivo
if (isMobile) {
  const cards = gsap.utils.toArray(".work-item");

  // Reiniciar las posiciones para las tarjetas
  gsap.set(cards, {
    opacity: 0,
    y: 50
  });

  cards.forEach((card) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",  // La animación comienza cuando la tarjeta está cerca de entrar en vista
        toggleActions: "play none none none", // Solo anima una vez
      },
      opacity: 1,  // Aparece cuando pasa el trigger
      y: 0,  // La tarjeta se mueve hacia su posición original
      duration: 0.8,  // Duración de la animación
      ease: "power2.out"  // Efecto de desaceleración para un movimiento más suave
    });
  });
} else {
  // Versión desktop (aparición escalonada)
  gsap.set(cards, {
    opacity: 0,
    x: 100,
    y: 20
  });

  cards.forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".third-section",
        start: `top+=${index * 150} center`,
        end: `top+=${(index + 1) * 200} center`,
        scrub: true,
        markers: false,
        onEnter: () => centerCardsDesktop()
      }
    });
  });
}

// 4. Función para centrar en desktop
function centerCardsDesktop() {
  if (!isMobile) {
      const totalWidth = cards[0].offsetWidth * cards.length + 30 * (cards.length - 1);
      const containerWidth = container.parentElement.offsetWidth;
      
      if (totalWidth < containerWidth) {
          gsap.to(container, {
              x: (containerWidth - totalWidth) / 2,
              duration: 0.5
          });
      }
  }
}

// 5. Manejo de resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
  centerCardsDesktop();
});
//img transition
document.addEventListener("DOMContentLoaded", function() {
  const img1 = document.querySelector('.js-badge-img');
  const img2 = document.querySelector('.js-badge-img-hover');
  
  let currentImage = 1;

  setInterval(function() {
    if (currentImage === 1) {
      img1.style.opacity = 0;  // Ocultar la primera imagen
      img2.style.opacity = 1;  // Mostrar la segunda imagen
      currentImage = 2;
    } else {
      img1.style.opacity = 1;  // Mostrar la primera imagen
      img2.style.opacity = 0;  // Ocultar la segunda imagen
      currentImage = 1;
    }
  }, 3000); // Cambiar cada 3 segundos (3000 milisegundos)
});
