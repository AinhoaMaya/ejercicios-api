import { setPinElement } from '../redux/map-slice.js'
import { store } from '../redux/store.js'

class List extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()
      console.log(currentState.map.pinElement.title)
      const activeTitle = currentState.map.pinElement.title

      // Al pulsar sobre un registro del mapa se muestra en la tabla
      const buttonsAccordion = this.shadow.querySelectorAll('.button-accordion')

      buttonsAccordion.forEach(button => {
        if (button.dataset.title === activeTitle) {
          const contentAccordion = button.nextElementSibling
          contentAccordion.style.display = 'block'
          contentAccordion.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        } else {
          button.nextElementSibling.style.display = 'none'
        }
      })
    })

    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch('/src/data/geocodedData.json')
    this.data = await response.json()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .accordion-container{
            max-height: 78vh;
            overflow-y: scroll;
          }

          .accordion-container::-webkit-scrollbar{
            width: 10px;
          }

          .accordion-container::-webkit-scrollbar-thumb {
            background-color: hsl(167, 83%, 30%);
          }

          .button-accordion {
            background-color: hsl(167, 83%, 30%);
            color: hsl(0, 0%, 100%);
            margin-bottom: 0.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            padding: 1rem;
            width: 95%;
            border: none;
            font-size: 17px;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 500;
            font-style: normal;
          }

          .button-accordion:hover {
            background-color: hsl(167, 84%, 43%);
            color: hsl(0, 0%, 0%);
          }

          .content {
            background-color: white;
            display: none;
            overflow: hidden;
            margin: 1rem 0;
          }

          .content, .content-border, .content-text{
            border-radius: 0.5rem;
          }

          .content-text{
            padding: 0 1rem 2rem 1rem;
          }

          .content-border {
            width: 94.5%;
            margin-bottom: 0.5rem;
            border: 1px solid hsl(167, 83%, 30%);
          }

          .content-border p, h4{
            padding: 0 1rem;
          }

          .content-button-return{
            width: 95.5%;
            display: flex;
            justify-content: flex-end;
          }

          .content-button-return svg{
            width: 1.7rem;
            height: 1.7rem;
            margin-top: 1rem;
            fill: hsl(167, 83%, 30%);
          }

          a{
            text-decoration: none;
            color: hsl(0, 0%, 0%);
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 600;
            font-style: normal;
            cursor: pointer;
          }

          a:hover{
            opacity: 0.7;
          }

          h4{
            margin-top: 0;
            font-size: 20px;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 600;
            font-style: normal;
          }

          p{
            font-size: 16px;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 500;
            font-style: normal;
            margin: 0.5rem 0;
          }
        </style>
        
        <div class="accordion-container"></div>
      `

    // html - js al vuelo
    const accordionContainer = this.shadow.querySelector('.accordion-container')

    this.data.forEach(list => {
      const buttonAccordion = document.createElement('button')
      buttonAccordion.classList.add('button-accordion')
      accordionContainer.appendChild(buttonAccordion)
      buttonAccordion.dataset.title = list.name
      buttonAccordion.textContent = list.name

      const content = document.createElement('div')
      content.classList.add('content')
      accordionContainer.appendChild(content)

      const contentBorder = document.createElement('div')
      contentBorder.classList.add('content-border')
      content.appendChild(contentBorder)

      const contentButtonReturn = document.createElement('div')
      contentButtonReturn.classList.add('content-button-return')
      contentBorder.appendChild(contentButtonReturn)

      const linkButton = document.createElement('a')
      contentButtonReturn.appendChild(linkButton)
      linkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>'

      // Botón cerrar acordeón (svg)
      linkButton.addEventListener('click', function (event) {
        event.preventDefault()
        const content = this.closest('.content')
        if (content) {
          content.style.display = 'none'
        }
        store.dispatch(setPinElement({}))
      })

      const contentText = document.createElement('div')
      contentText.classList.add('content-text')
      contentBorder.appendChild(contentText)

      const contentInfo = document.createElement('p')
      contentInfo.textContent = list.goals
      contentText.appendChild(contentInfo)

      const contentPlace = document.createElement('p')
      contentPlace.innerHTML = `${list.address} - ${list.town}`
      contentText.appendChild(contentPlace)
    })

    this.shadowRoot.querySelectorAll('.content-button-return a').forEach(linkButton => {
      linkButton.addEventListener('click', (event) => {
        event.preventDefault()
        store.dispatch(setPinElement({ title: null }))
      })
    })

    // Botón acordeón (list)
    const buttonsAccordion = this.shadowRoot.querySelectorAll('.button-accordion')

    buttonsAccordion.forEach(button => {
      button.addEventListener('click', function () {
        const title = this.dataset.title
        const pinElement = {
          title
        }

        store.dispatch(setPinElement(pinElement))
      })

      button.addEventListener('click', function (event) {
        button.addEventListener('click', function () {
          event.preventDefault()
          const content = this.nextElementSibling
          const isOpen = content.style.display === 'block'

          // Si está abierto se cierra; Si está cerrado, se abre
          content.style.display = isOpen ? 'none' : 'block'

          if (!isOpen) {
            const title = this.dataset.title
            const pinElement = { title }
            store.dispatch(setPinElement(pinElement))
          } else {
            store.dispatch(setPinElement({ title: null }))
          }

          if (!isOpen) {
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        })
      })
    })

    // Al darle click a un acordeón, que se cierre si hay alguno abierto
    const buttons = this.shadowRoot.querySelectorAll('.button-accordion')

    buttons.forEach(button => {
      button.addEventListener('click', function () {
        // Primero, se cierran todos los contenidos de acordeón
        buttons.forEach(otherButton => {
          const content = otherButton.nextElementSibling
          content.style.display = 'none'
        })

        // Se abre solo al que se le da click
        const content = this.nextElementSibling
        content.style.display = 'block'

        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    })
  }
}

customElements.define('list-component', List)
