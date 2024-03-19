class Prompt extends HTMLElement {
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
    const response = await fetch('/src/data/prompt.json')
    this.data = await response.json()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .prompt-container{
            display: flex;
          }

          .prompt-map{
            background-color: hsl(0, 0%, 60%);
          }
        </style>

        <div class="prompt-container">
          <div class="prompt-map">

          </div>
        </div>
      `
  }
}

customElements.define('prompt-component', Prompt)
