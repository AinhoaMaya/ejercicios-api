class Prompt extends HTMLElement {
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
          .prompt-container{
            padding: 2rem 0;
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

        </style>

        <div class="prompt-container">
          <div class="prompt-form">
            <div class="form-label">
              <label>¿Qué asociaciones estás buscando?</label>
            </div>
            <div class="form-text-area">
              <textarea id="comments" name="comments" rows="4" cols="100"></textarea>
            </div>
          </div>
        </div>
      `
  }
}

customElements.define('prompt-component', Prompt)
