class Row extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.columns = this.getAttribute('columns') || 2
  }

  async connectedCallback () {
    await this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
        <style>
          .row{
            display: grid;
            gap: 2rem;
            grid-template-columns: 1fr 1fr;
          }
        </style>

        <div class="row">
          <slot></slot>
        </div>
      `
  }
}

customElements.define('row-component', Row)
