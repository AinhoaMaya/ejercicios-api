class Prompt extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    await this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .prompt-container{
            padding: 1.5rem 0;
          }

          textarea{
            width: 93%;
          }

          .form-label{
            margin-bottom: 0.5rem;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 600;
            font-style: normal;
          }

          .form-button button{
            background-color: hsl(167, 83%, 30%);
            color: hsl(0, 0%, 100%);
            cursor: pointer;
            border: none;
            font-size: 12px;
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 500;
            font-style: normal;
            padding: 0.5rem;
            margin-top: 0.5rem;
          }

          .form-button button:hover{
            background-color: hsl(167, 84%, 43%);
            color: hsl(0, 0%, 0%);
          }
        </style>

        <form>
          <div class="prompt-container">
            <div class="prompt-form">
              <div class="form-label">
                <label>¿Qué asociaciones estás buscando?</label>
              </div>
              <div class="form-text-area">
                <textarea id="comments" name="comments" rows="4" cols="100"></textarea>
              </div>
              <div class="form-button">
                <button id="sendButton">Enviar</button>
              </div>
            </div>
          </div>
        </form>
      `
    const sendButton = this.shadow.querySelector('#sendButton')

    sendButton.addEventListener('click', event => {
      event.preventDefault()
      this.sendForm()
    })
  }

  async sendForm () {
    const comments = this.shadow.querySelector('#comments').value
    const formDataJson = { comments }

    const response = await fetch('https://localhost:3000/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataJson)
    })

    const responseData = await response.json()
    console.log(responseData)
  }

  catch (error) {
    console.error('Error:', error)
  }
}

customElements.define('prompt-component', Prompt)
