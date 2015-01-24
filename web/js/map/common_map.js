var googleMap = null;

function show_google_map(canvas_id, lat, lng, zoom, title) {

    googleMap = null;
    var latlng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        center: latlng,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    googleMap = new google.maps.Map(document.getElementById(canvas_id), mapOptions);
    
    
    var m_latlng1 = new google.maps.LatLng(36.579160,136.670213);
    
    var marker1 = new google.maps.Marker({
                                         position: m_latlng1,
                                         map: googleMap,
                                         title:title,
                                         animation: google.maps.Animation.BOUNCE
                                         });

}