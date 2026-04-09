// ================= PARTICLE NETWORK =================
const homeCanvas = document.getElementById('home-canvas')
const ctx = homeCanvas.getContext('2d')

function resizeCanvas() {
  homeCanvas.width = homeCanvas.offsetWidth
  homeCanvas.height = homeCanvas.offsetHeight
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

const PARTICLE_COUNT = 65
const MAX_DIST = 110
const particles = []

class Particle {
  constructor() {
    this.x = Math.random() * homeCanvas.width
    this.y = Math.random() * homeCanvas.height
    this.vx = (Math.random() - 0.5) * 0.45
    this.vy = (Math.random() - 0.5) * 0.45
    this.r = Math.random() * 1.4 + 0.6
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x < 0 || this.x > homeCanvas.width)  this.vx *= -1
    if (this.y < 0 || this.y > homeCanvas.height) this.vy *= -1
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(79, 195, 247, 0.65)'
    ctx.fill()
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())

function animateParticles() {
  ctx.clearRect(0, 0, homeCanvas.width, homeCanvas.height)
  particles.forEach(p => { p.update(); p.draw() })
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MAX_DIST) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(79, 195, 247, ${0.18 * (1 - dist / MAX_DIST)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
  requestAnimationFrame(animateParticles)
}
animateParticles()

// fade in subtitle and social links after name finishes typing (1.5s delay + 1.5s typing = 3s)
// on mobile the typing animation is disabled, so show everything immediately
function revealHeroContent() {
  document.querySelector('.subtitle').style.opacity = '1'
  document.querySelector('.social-links').style.opacity = '1'
  document.querySelector('.home-stats').style.opacity = '1'
  document.querySelector('.terminal-card').style.opacity = '1'
}

if (window.innerWidth <= 768) {
  revealHeroContent()
} else {
  setTimeout(revealHeroContent, 3000)
}

// ================= HAMBURGER MENU =================
const hamburger = document.getElementById('hamburger')
const navMenu   = document.getElementById('nav-menu')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open')
  navMenu.classList.toggle('open')
})

// close menu when a nav link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open')
    navMenu.classList.remove('open')
  })
})

const titles = ['Data Analyst', 'Data Engineer', 'Business  Analyst']
let titleIndex = 0
const rotatingEl = document.getElementById('rotating-title')

setInterval(() => {
  rotatingEl.style.opacity = '0'
  setTimeout(() => {
    titleIndex = (titleIndex + 1) % titles.length
    rotatingEl.textContent = titles[titleIndex]
    rotatingEl.style.opacity = '1'
  }, 400)
}, 4000)

function toggleCard(card) {
  card.classList.toggle('open')
}

function openModal(title, description, tools, link, linkLabel = 'View on GitHub') {
  document.getElementById('modal-title').textContent = title
  document.getElementById('modal-description').textContent = description
  document.getElementById('modal-tools').innerHTML = '<strong>Tools:</strong> ' + tools
  document.getElementById('modal-link').href = link
  document.getElementById('modal-link').textContent = linkLabel
  document.getElementById('project-modal').classList.add('open')
}

function closeModal(event) {
  // close if clicking the dark overlay or the X button
  if (!event || event.target === document.getElementById('project-modal') || event.target.classList.contains('modal-close')) {
    document.getElementById('project-modal').classList.remove('open')
  }
}

