class Map extends HTMLElement {
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
        </style>

        <div class="map-container">
          <div class="map">
            <h1>hola</h1>
          </div>
        </div>
      `
  }
}

customElements.define('map-component', Map)
