L.mapbox.accessToken = 'pk.eyJ1IjoicmljaG1pbmFyZGkiLCJhIjoiY2lsbDk5eG42NW1iZnR2a3BpdWQzMjUzYiJ9.A1gG0JuwOKyAQUJSuE3qDw';

var map = L.map('mapid').setView([ 45.33, -62.43], 8);

L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
L.control.defaultExtent().addTo(map);



function getColor(name) {
    return name == 'H2' ? '#01A4A4' : 
           name == 'G' ? '#E54028' : 
           name == 'A1' ? '#00A1CB' : 
           name == 'B1' ? '#D0D102' : 
           name == 'C1' ? '#32742C' : 
           name == 'D1' ? '#D70060' : 
           name == 'E1' ? '#61AE24' : 
           name == 'F1' ? '#F18D05' : 
           name == 'H1' ? '#113F8C' : '#616161'
       

           
}
 	
 function style(feature) {
    return {
        color: getColor(feature.properties.Name),
        weight: 7,
        opacity: 1,
        fillOpacity: 0.7
    };
}

 function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 9,
        color: 'dimgray',
        dashArray: '',
        fillOpacity: 0.7
    });
    
   

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}
var geojson;
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    

}



   
function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            
        });
        
       
        var popup = L.popup().setContent(feature.properties.Description);
        layer.bindPopup(popup);
         var labelContent = '<strong>'+ feature.properties.Name + '</strong>';
        layer.bindLabel(labelContent).addTo(map);
    }

geojson = L.geoJson(hwy, {
    style: style,
    onEachFeature: onEachFeature

}).addTo(map);