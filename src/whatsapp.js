const whatsappNumber = window.SIROSA_CONTACT.whatsappNumber
const openingMessage = 'Hello SIROSA Adventures, I would like to plan a Kenya trip.'
const whatsappLink = document.createElement('a')

whatsappLink.className = 'whatsapp-float'
whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(openingMessage)}`
whatsappLink.target = '_blank'
whatsappLink.rel = 'noopener noreferrer'
whatsappLink.setAttribute('aria-label', 'Chat with SIROSA Adventures on WhatsApp')
whatsappLink.innerHTML = `
  <span class="whatsapp-icon" aria-hidden="true">
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.2 25.8 7.7 21A11.3 11.3 0 1 1 12 25l-5.8.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 11.2c.3-.7.7-.7 1.1-.7h.6c.2 0 .5.1.6.5l.9 2.1c.1.3.1.5-.1.8l-.7.9c-.2.2-.2.5 0 .8.7 1.2 1.7 2.1 2.9 2.7.3.2.6.2.8-.1l1-1.2c.2-.3.5-.3.8-.2l2 .9c.3.2.5.3.5.6 0 .4-.2 1.5-.9 2.1-.6.7-1.5 1-2.3.9-1.3-.2-3-.8-4.8-2.4-2.1-1.8-3.4-4-3.8-5.2-.4-1.2 0-2.1.4-2.5Z" fill="currentColor"/>
    </svg>
  </span>`

document.body.append(whatsappLink)
