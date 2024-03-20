class List extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    // await this.loadData()
    await this.render()
  }

  // async loadData () {
  //   const response = await fetch('/src/data/prompt.json')
  //   this.data = await response.json()
  // }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .accordion-container{
            height: 100%;
            max-height: 90%;
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

          .content-border {
            width: 90%;
            border: 1px solid hsl(300, 95%, 29%);
          }

          .content-border p, h4{
            padding: 0 1rem;
          }

          .content-button-return{
            padding: 1rem;
            width: 95.5%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid hsl(300, 95%, 29%);
          }

          .content-button-return svg{
            width: 1.5rem;
            height: 1.5rem;
            margin: 0.2rem 0.5rem 0 0;
          }

          a{
            text-decoration: none;
            color: hsl(0, 0%, 0%);
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 600;
            font-style: normal;
          }

          a:hover{
            opacity: 0.7;
          }

          h4{
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
          <button class="button-accordion">OZ.Centro de Artes Escénicas</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>OZ. Centro de Artes Escénicas</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">Associació Musical Art Líric</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>Associació Musical Art Líric</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">Anima</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>Anima</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">Associació de Pares i Mares d'Alumnes Es Ferreret</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>Associació de Pares i Mares d'Alumnes Es Ferreret</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">Associació d'Artesns de Pollença</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>Associació d'Artesns de Pollença</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">DiscaEsports Balears</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>DiscaEsports Balears</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">Picky Puss</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>Picky Puss</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">Kreativus, Mentes Creativas</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
                </a>
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <h4>Kreativus, Mentes Creativas</h4>
                <p>Promoure el desenvolupament de les arts escéniques de les Illes Balears</p>
                <p>Barcarola, núm 4, PB. B, Palma</p>
              </div>
            </div>
          </div>
        </div>
      `
      // Botón acordeón (list) 
      const buttons = this.shadowRoot.querySelectorAll('.button-accordion');

      buttons.forEach(button => {
        button.addEventListener('click', function() {
          const content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      });

      // html - js al vuelo 
      const accordionContainer = this.shadow.querySelector('.accordion-container')

      
  }
}

customElements.define('list-component', List)
