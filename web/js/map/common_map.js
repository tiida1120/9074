var googleMap = null;

function show_google_map(canvas_id, lat, lng, zoom) {
    googleMap = null;
    var latlng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        center: latlng,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    googleMap = new google.maps.Map(document.getElementById(canvas_id), mapOptions);
}