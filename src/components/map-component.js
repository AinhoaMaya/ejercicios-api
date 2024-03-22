import { Loader } from '@googlemaps/js-api-loader'

class Map extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.markers = []
    this.data = []
    this.loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly'
    })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch('/src/data/geocodedData.json')
    this.data = await response.json()
  }

  async render () {
    this.shadow.innerHTML =
    /* html */`<style>

      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      .map {
        height: 100vh;
        width: 90%;
      }

      .gm-style iframe + div { border:none!important; }

      .RIFvHW-maps-pin-view-background {
        fill: hsl(167, 83%, 30%);
      }

    </style>

    <div class="map"></div>
    `

    await this.loadMap()
  }

  async loadMap () {
    this.google = await this.loader.load()
    const { Map } = await this.google.maps.importLibrary('maps')
    const { AdvancedMarkerElement, PinElement } = await this.google.maps.importLibrary('marker')

    this.map = await new Map(this.shadow.querySelector('.map'), {
      backgroundColor: 'hsl(217, 89%, 79%)',
      center: { lat: 39.6135612, lng: 2.8820133 },
      clickableIcons: false,
      disableDefaultUI: true,
      mapId: '25f3bd1d53babd39',
      minZoom: 10,
      restriction: {
        latLngBounds: {
          east: 4.649715,
          north: 40.971935,
          south: 38.204442,
          west: 1.160065
        },
        strictBounds: true
      },
      zoom: 10
    })

    this.data.forEach((element) => {
      const pinView = new PinElement({
        background: 'hsl(280deg 56% 47%)',
        borderColor: 'hsl(0deg 0% 0%)',
        glyphColor: 'hsl(0deg 0% 0%)'
      })

      if (element.latitude && element.longitude) {
        const marker = new AdvancedMarkerElement({
          map: this.map,
          position: { lat: element.latitude, lng: element.longitude },
          title: element.aso_nom,
          content: pinView.element
        })

        marker.addListener('click', () => {
          const pinElement = {
            title: element.name,
            longitude: element.longitude,
            latitude: element.latitude
          }
        })

        this.markers.push(marker)
      }
    })
  }

  async showLocation (location) {
    const { PinElement } = await this.google.maps.importLibrary('marker')
    const position = { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }
    this.map.setCenter(position)
    this.map.setZoom(15)

    const pinViewActive = new PinElement({
      background: 'hsl(4deg 81% 42%)',
      borderColor: 'hsl(4deg 81% 42%)',
      glyphColor: 'hsl(0deg 0% 100%)'
    })

    this.markers.forEach(marker => {
      if (marker.position.lat === position.lat && marker.position.lng === position.lng) {
        marker.setMap(this.map)
        marker.content = pinViewActive.element
      } else {
        marker.setMap(null)
      }
    })
  }

  async resetMap () {
    const { PinElement } = await this.google.maps.importLibrary('marker')

    this.map.setCenter({ lat: 39.6135612, lng: 2.8820133 })
    this.map.setZoom(10)
    this.markers.forEach(marker => {
      const pinView = new PinElement({
        background: 'hsl(280deg 56% 47%)',
        borderColor: 'hsl(0deg 0% 0%)',
        glyphColor: 'hsl(0deg 0% 0%)'
      })

      marker.setMap(this.map)
      marker.content = pinView.element
    })
  }
}

customElements.define('map-component', Map)
