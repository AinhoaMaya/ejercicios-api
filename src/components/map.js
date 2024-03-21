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
          .map{
            background-color: hsl(167, 84%, 43%);
            width: 95%;
            height: 54.4vw;
          }
        </style>

        <div class="map-container">
          <div class="map"></div>
        </div>
      `
  }
}

customElements.define('map-component', Map)
