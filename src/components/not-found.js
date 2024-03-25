class notFound extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.columns = this.getAttribute('columns') || 1
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .text-content{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
          }

          .text-not-found{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: 17px;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 500;
            font-style: normal;
          }

          .text-not-found svg{
            width: 7rem;
            height: 7rem;
            margin-bottom: 1rem;
          }

          img{
            object-fit: cover;
            width: 50%;
          }

          .button-container button{
            background-color: hsl(167, 83%, 30%);
            color: hsl(0, 0%, 100%);
            border-radius: 0.5rem;
            cursor: pointer;
            border: none;
            padding: 0.5rem;
            font-size: 15px;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 500;
            font-style: normal;
            margin-top: 2rem;
          }

          .button-container button:hover{
            background-color: hsl(167, 84%, 43%);
          }

          a{
            text-decoration: none;
            color: hsl(0, 0%, 100%);
          }

          a:hover{
            color: hsl(0, 0%, 0%);
          }
        </style>
        <div class="text-content">
          <div class="text-not-found">
            <div class="text-container">
              <p>OOPS...</p>
            </div>
            <div class="image-container">
              <img src="./public/not-found.webp">
            </div>
            <div class="text-container">
              <p>NO ENCUENTRO LA PÁGINA</p>
            </div>
            <div class="button-container">
              <button>
                <a href="/">Inicio</a>
              </button>
            </div>
          </div>
        </div>
      `
  }
}

customElements.define('not-found-component', notFound)
