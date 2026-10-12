const navigation = document.querySelector('.main-nav')
const menuToggle = document.querySelector('.menu-toggle')
const inquiryForm = document.querySelector('.inquiry-form')
const planContact = document.querySelector('.plan-contact')
const requestedPlace = new URLSearchParams(window.location.search).get('place')
const journeyNames = {
  'mara-trails': 'Maasai Mara, 5 days',
  'wild-north': 'Samburu & Laikipia, 7 days',
  'amboseli-skyline': 'Amboseli, 3 days',
  'rift-lakes': 'Naivasha & Nakuru, 4 days',
  'tsavo-tides': 'Tsavo & Diani, 8 days',
  'ol-pejeta': 'Ol Pejeta & Aberdare, 5 days',
}

const phoneLink = document.createElement('a')
phoneLink.href = `tel:+254${window.SIROSA_CONTACT.phoneNumber.slice(1)}`
phoneLink.textContent = window.SIROSA_CONTACT.phoneNumber
phoneLink.setAttribute('aria-label', `Call SIROSA Adventures on ${phoneLink.textContent}`)
planContact.querySelector('span').textContent = 'Call or email us directly'
planContact.insertBefore(phoneLink, planContact.querySelector('a'))

Array.from(inquiryForm.elements.journey.options).forEach((option) => {
  if (option.value && !journeyNames[option.value]) option.remove()
})

Object.entries(journeyNames).forEach(([journeyId, journeyName]) => {
  let option = inquiryForm.elements.journey.querySelector(`option[value="${journeyId}"]`)
  if (!option) {
    option = document.createElement('option')
    option.value = journeyId
    inquiryForm.elements.journey.append(option)
  }
  option.textContent = journeyName
})

if (requestedPlace) inquiryForm.elements.interests.value = `I’m interested in visiting ${requestedPlace}.`
document.querySelector('.form-privacy').textContent = 'WhatsApp will open with your trip details ready to review. Tap Send in WhatsApp to deliver your enquiry.'

inquiryForm.querySelector('[name="interests"]').closest('.field-label').insertAdjacentHTML('beforebegin', `
  <div class="field-row trip-preferences">
    <label class="field-label">Where would you like to stay?<select name="stayStyle"><option>Help me choose</option><option>Safari tented camp</option><option>Lodge or boutique hotel</option><option>A mix of camp and lodge</option></select></label>
    <label class="field-label">How would you like to travel?<select name="tourFormat"><option>Open to recommendations</option><option>Private vehicle for our group</option><option>Join a small group</option><option>Mix of road and light aircraft</option></select></label>
  </div>`)

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open')
  menuToggle.setAttribute('aria-expanded', String(isOpen))
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
  menuToggle.innerHTML = isOpen
    ? '<span aria-hidden="true">&#10005;</span>'
    : '<span aria-hidden="true">&#9776;</span>'
})

navigation.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return
  navigation.classList.remove('is-open')
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Open menu')
  menuToggle.innerHTML = '<span aria-hidden="true">&#9776;</span>'
})

document.querySelector('.filter-row').addEventListener('click', (event) => {
  const selectedFilter = event.target.closest('[data-filter]')
  if (!selectedFilter) return

  const filter = selectedFilter.dataset.filter
  document.querySelectorAll('[data-filter]').forEach((button) => {
    const isActive = button === selectedFilter
    button.classList.toggle('active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })

  let visibleCount = 0
  document.querySelectorAll('.journey-card').forEach((card) => {
    const isVisible = filter === 'All journeys' || card.dataset.style === filter
    card.hidden = !isVisible
    if (isVisible) visibleCount += 1
  })
  document.querySelector('.filter-count').textContent = `${visibleCount} PACKAGE${visibleCount === 1 ? '' : 'S'}`
})

document.addEventListener('click', (event) => {
  const journeyButton = event.target.closest('[data-journey]')
  if (journeyButton) {
    inquiryForm.elements.journey.value = journeyButton.dataset.journey
    document.querySelector('#plan').scrollIntoView({ behavior: 'smooth' })
  }

  const destinationLink = event.target.closest('[data-destination]')
  if (destinationLink) {
    inquiryForm.elements.interests.value = `I’m interested in exploring ${destinationLink.dataset.destination}.`
  }
})

inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const values = new FormData(inquiryForm)
  const journey = journeyNames[values.get('journey')] || 'Open to ideas'
  const message = [
    'Hello SIROSA Adventures,',
    '',
    'I would love to start planning a Kenya trip.',
    `Name: ${values.get('name')}`,
    `Email: ${values.get('email')}`,
    `Travel dates: ${values.get('dates') || 'Flexible'}`,
    `Travellers: ${values.get('travellers')}`,
    `Journey: ${journey}`,
    `Accommodation preference: ${values.get('stayStyle')}`,
    `Travel format: ${values.get('tourFormat')}`,
    `Interests: ${values.get('interests') || 'Open to ideas'}`,
    `Budget range: ${values.get('budget') || 'To discuss'}`,
    `A little more: ${values.get('notes') || 'Nothing else for now'}`,
  ].join('\n')

  const status = document.querySelector('.form-status')
  status.hidden = false
  status.textContent = 'Opening WhatsApp with your trip details. Review the message and tap Send to deliver your enquiry.'
  const whatsappUrl = `https://wa.me/${window.SIROSA_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
  window.location.href = whatsappUrl
})

document.querySelector('#current-year').textContent = new Date().getFullYear()
