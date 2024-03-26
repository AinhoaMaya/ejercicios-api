class Column extends HTMLElement {
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
          .column{
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
        </style>

        <div class="row">
          <slot></slot>
        </div>
      `
  }
}

customElements.define('column-component', Column)
