// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


// ========================================
// CLOSE MOBILE MENU
// ========================================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ========================================
// ACTIVE NAVBAR
// ========================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// ========================================
// SCROLL REVEAL
// ========================================

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


document
    .querySelectorAll(
        ".skill-card, .project-card, .certificate-card, .timeline-item, .info-card, .contact-wrapper"
    )
    .forEach(element => {

        observer.observe(element);

    });


// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(
        `Thank you ${name}! Your message has been received.`
    );

    contactForm.reset();

});


// ========================================
// NEURAL NETWORK BACKGROUND
// ========================================

const canvas = document.getElementById("neuralCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame;


// Resize canvas

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();

}


// ========================================
// CREATE PARTICLES
// ========================================

function createParticles() {

    particles = [];

    const particleCount =
        window.innerWidth < 700 ? 35 : 65;

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            vx: (Math.random() - 0.5) * 0.25,

            vy: (Math.random() - 0.5) * 0.25,

            radius: Math.random() * 1.5 + 0.5

        });

    }

}


// ========================================
// DRAW PARTICLES
// ========================================

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;


        // Wrap around screen

        if (particle.x < 0)
            particle.x = canvas.width;

        if (particle.x > canvas.width)
            particle.x = 0;

        if (particle.y < 0)
            particle.y = canvas.height;

        if (particle.y > canvas.height)
            particle.y = 0;


        // Draw particle

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,255,255,0.45)";

        ctx.fill();

    });


    // Draw connections

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 130) {

                const opacity =
                    (1 - distance / 130) * 0.12;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(255,255,255,${opacity})`;

                ctx.lineWidth = 0.6;

                ctx.stroke();

            }

        }

    }


    animationFrame =
        requestAnimationFrame(drawParticles);

}


// Start

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();
drawParticles();


// ========================================
// REDUCE ANIMATION FOR REDUCED MOTION
// ========================================

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (prefersReducedMotion.matches) {

    cancelAnimationFrame(animationFrame);

}
