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
          .button-accordion {
            cursor: pointer;
            padding: 1rem;
            width: 90%;
            border: none;
            text-align: left;
            font-size: 18px;
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
            margin-top: 1rem;
          }

          .content, .content-border, .content-text{
            border-radius: 1rem;
          }

          .content-border {
            width: 90%;
            border: 1px solid hsl(300, 95%, 29%);
          }

          .content-border p{
            padding: 0 1rem;
          }

          .content-button-return{
            padding: 1rem 0 0 1rem;
            width: 100%;
          }

          a{
            text-decoration: none;
            color: hsl(0, 0%, 0%);
          }

          a:hover{
            opacity: 0.7;
          }

          p{
            font-size: 18px;
          }
        </style>
        
        <div class="accordion-container">
          <button class="button-accordion">OZ.Centro de Artes Escénicas</button>
          <div class="content">
            <div class="content-border">
              <div class="content-button-return">
                <a href="#">Volver</a>
              </div>
              <div class="content-text">
                <p>Lorem</p>
              </div>
            </div>
          </div>

          <button class="button-accordion">Associació Musical Art Liric</button>
          <div class="content">
            <p>Lorem</p>
          </div>

          <button class="button-accordion">Anima</button>
          <div class="content">
            <p>Lorem</p>
          </div>
        </div>
      `
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

  }
}

customElements.define('list-component', List)
