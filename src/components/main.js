class Main extends HTMLElement {
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
          .flex-row {
            display: flex;
          }

          map-component, .prompt-list-container {
            flex: 1;
          }

          .prompt-list-container {
            display: flex;
            flex-direction: column;
          }

          prompt-component {
            position: relative;
          }

          list-component {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
          }
        </style>

        <div class="container">
          <div class="flex-row">
            <map-component></map-component>
            <div class="prompt-list-container">
              <prompt-component></prompt-component>
              <list-component></list-component>
            </div>
          </div>
        </div>
      `
  }
}

customElements.define('main-component', Main)
