var googleMap = null;

$(document).ready(function(){
    init_map();
});

function init_map() {
    googleMap = null;

    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(36.565842, 136.658941),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    googleMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    load_spots();
}

function load_spots() {
    $.ajax( {
        url: '../../res/data/bearInfo.min.json',
        dataType : 'json',
        success: function(data) {
            for (var i=0; i<data.length; i++) {
                add_marker(data[i]);
            }
        },
        error: function(data) {
            // TODO:エラー時の処理
        }
    });
}

function add_marker(spot) {
    var latlng = new google.maps.LatLng(spot.lat, spot.lng);
    var marker = new google.maps.Marker({
      position: latlng,
      map: googleMap,
    });
}
