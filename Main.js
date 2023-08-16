const sidebarBtn = document.querySelector('.sidebar-btn');
const sidebarContent = document.querySelector('.sidebar-content')
const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const sliderDots = document.querySelector('.slider-dots');

let slideIndex = 0;


function addDots() {
    sliderDots.innerHTML = '';
    for (let i = 0; i < sliderWrapper.children.length; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        sliderDots.appendChild(dot);
        dot.addEventListener('click', () => {
            slideIndex = i;
            moveToSlide(slideIndex);
        });
    }
    sliderDots.children[slideIndex].classList.add('active');
}


function moveToSlide(index) {
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    sliderDots.querySelector('.active').classList.remove('active');
    sliderDots.children[index].classList.add('active');
}


sliderPrev.addEventListener('click', () => {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = sliderWrapper.children.length - 1;
    }
    moveToSlide(slideIndex);
});

sliderNext.addEventListener('click', () => {
    slideIndex++;
    if (slideIndex >= sliderWrapper.children.length) {
        slideIndex = 0;
    }
    moveToSlide(slideIndex);
});

addDots();
moveToSlide(slideIndex);

window.addEventListener('scroll', function () {

    const pageHeight = document.documentElement.scrollHeight;

    const currentPosition = window.pageYOffset + window.innerHeight;

    const footer = document.getElementById('footer');

    if (currentPosition >= pageHeight) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});


sidebarBtn.addEventListener("mouseenter", function (event) {
    if (sidebarContent.style.display === "none") {
        sidebarContent.style.display = "block";
    } else {
        sidebarContent.style.display = "none";
    }
});

document.addEventListener("mouseover", function (event) {
    var sidebar = document.querySelector(".sidebar");
    if (event.target.closest(".sidebar") !== sidebar) {
        sidebar.querySelector(".sidebar-content").style.display = "none";
    }
});







const contactoBtn = document.getElementById('contacto');
const overlay = document.getElementById('overlay');
const contactForm = document.getElementById('contact-form');
const enviarBtn = document.getElementById('enviar-btn');
const emailInput = document.getElementById('email');
const errorBubble = document.getElementById('error-bubble');
const errorMessage = document.getElementById('error-mensaje');

contactoBtn.addEventListener('click', (event) => {
  event.preventDefault();
  overlay.classList.remove('invisible');
  overlay.classList.add('fade-in-down');
});


overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.classList.remove('fade-in-down');
    overlay.classList.add('invisible');
  }
});

contactForm.addEventListener('input', () => {
  const nombreValue = document.getElementById('nombre').value;
  const emailValue = emailInput.value;
  const mensajeValue = document.getElementById('mensaje').value;
  const isValid =
    nombreValue.trim() !== '' &&
    emailValue.trim() !== '' &&
    validateEmail(emailValue) &&
    mensajeValue.trim() !== '';

  enviarBtn.disabled = !isValid;

  if (emailInput === document.activeElement) {
    if (!validateEmail(emailValue)) {
      emailInput.classList.add('error');
      errorBubble.style.visibility = 'visible';
      errorBubble.style.opacity = 1;
    } else {
      emailInput.classList.remove('error');
      errorBubble.style.visibility = 'hidden';
      errorBubble.style.opacity = 0;
    }
  }
});

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();


  const nombreValue = document.getElementById('nombre').value;
  const emailValue = emailInput.value;
  const mensajeValue = document.getElementById('mensaje').value;

  if (
    nombreValue.trim() !== '' &&
    emailValue.trim() !== '' &&
    validateEmail(emailValue) &&
    mensajeValue.trim() !== ''
  ) {
    const subject = 'Nuevo mensaje de contacto';
    const body = `Nombre: ${nombreValue}\nEmail: ${emailValue}\nMensaje: ${mensajeValue}`;

    const mailtoLink = `mailto:ayrton241000@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    contactForm.reset();

    overlay.classList.add('invisible');
  }
});

window.addEventListener('load', () => {
  overlay.classList.add('invisible');
});
