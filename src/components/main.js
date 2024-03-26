class Main extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
        </style>

        <main>
          <slot></slot>
        </main>
      `
  }
}

customElements.define('main-component', Main)
