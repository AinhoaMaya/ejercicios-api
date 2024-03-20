class List extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
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
            max-height: 82vh;
            overflow-y: scroll;
          }

          .accordion-container::-webkit-scrollbar{
            width: 10px;
          }

          .accordion-container::-webkit-scrollbar-thumb {
            background-color: hsl(300, 95%, 29%);
          }

          .button-accordion {
            cursor: pointer;
            padding: 1rem;
            width: 90%;
            border: none;
            text-align: left;
            font-size: 17px;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 500;
            font-style: normal;
          }

          .button-accordion:hover {
            background-color: hsl(300, 95%, 29%);
            color: hsl(0, 0%, 100%);
            border-radius: 1rem;
          }

          .content {
            background-color: white;
            display: none;
            overflow: hidden;
            margin: 1rem 0;
          }

          .content, .content-border, .content-text{
            border-radius: 1rem;
          }

          .content-text{
            padding: 0 1rem 2rem 1rem;
          }

          .content-border {
            width: 90%;
            border: 1px solid hsl(300, 95%, 29%);
          }

          .content-border p, h4{
            padding: 0 1rem;
          }

          .content-button-return{
            padding-top: 1rem;
            width: 95.5%;
            display: flex;
            justify-content: flex-end;
          }

          .content-button-return svg{
            width: 1.7rem;
            height: 1.7rem;
            margin-top: 1rem;
            fill: hsl(300, 95%, 29%);
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
          }
        </style>
        
        <div class="accordion-container">

        </div>
      `

      // html - js al vuelo 
      const accordionContainer = this.shadow.querySelector('.accordion-container')

      this.data.forEach(list => {
        const buttonAccordion = document.createElement('button')
        buttonAccordion.classList.add('button-accordion')
        accordionContainer.appendChild(buttonAccordion)
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
        // linkButton.setAttribute('href', list.buttonLink)
        contentButtonReturn.appendChild(linkButton)
        linkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>'

        // Botón cerrar acordeón
        linkButton.addEventListener('click', function(event) {
          event.preventDefault()
          const content = this.closest('.content')
          if (content) {
            content.style.display = 'none'
          }
        })

        const contentText = document.createElement('div')
        contentText.classList.add('content-text')
        contentBorder.appendChild(contentText)

        const contentTitle = document.createElement('h4')
        contentTitle.textContent = list.name
        contentText.appendChild(contentTitle)

        const contentInfo = document.createElement('p')
        contentInfo.textContent = list.goals
        contentText.appendChild(contentInfo)

        const contentPlace = document.createElement('p')
        contentPlace.textContent = `${list.address} - ${list.town}` 
        contentText.appendChild(contentPlace)
      })

      // Botón acordeón (list) 
      const buttonsAccordion = this.shadowRoot.querySelectorAll('.button-accordion');

      buttonsAccordion.forEach(button => {
        button.addEventListener('click', function() {
          const content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      });

      // Al darle click a un acordeón, que se cierre si hay alguno abierto
      const buttons = this.shadowRoot.querySelectorAll('.button-accordion');
      const accordionContainerButton = this.shadow.querySelector('.accordion-container');

      buttons.forEach(button => {
        button.addEventListener('click', function() {
          // Primero, se cierran todos los contenidos de acordeón
          buttons.forEach(otherButton => {
            const content = otherButton.nextElementSibling;
            content.style.display = "none";
          });

          // Se abre solo el que se le da click
          const content = this.nextElementSibling;
          content.style.display = "block";

          this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // accordionContainerButton.scrollTo(0, 0); // Resetea el scroll del contenedor de acordeones
        });
      });
  }
}

customElements.define('list-component', List)
