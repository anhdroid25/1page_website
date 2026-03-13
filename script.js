// fade in subtitle and social links after name finishes typing (1.5s delay + 1.5s typing = 3s)
setTimeout(() => {
  document.querySelector('.subtitle').style.opacity = '1'
  document.querySelector('.social-links').style.opacity = '1'
}, 3000)

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

