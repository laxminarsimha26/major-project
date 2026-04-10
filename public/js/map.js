
    maptilersdk.config.apiKey = mapToken;
    
const [lng, lat] = listing.geometry.coordinates;

      const map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat], // Hyderabad
        zoom: 10
      });

// 🧠 Create popup
const popup = new maptilersdk.Popup({ offset: 25 })
  .setHTML(`
    <h5>${listing.title}</h5>
    <p>${listing.location}</p>
  `);

       new maptilersdk.Marker({color: "red"})
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(map);    