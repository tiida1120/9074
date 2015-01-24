var googleMap = null;

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

    // TODO:レベルに応じたマーカーの表示

    var marker = new google.maps.Marker({
      position: latlng,
      map: googleMap,
    });

    var infoContent = $('<div id="info-container" style="width:100%; height:100%;"><div id="info-date"></div><div id="info-place"></div><div id="info-detail"></div></div>');
    infoContent.find('#info-date').text('日時：' + spot.date);
    infoContent.find('#info-place').text('住所：' + spot.place);
    infoContent.find('#info-detail').text('詳細：' + spot.detail);

    var infowindow = new google.maps.InfoWindow({
        content: infoContent.html()
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(googleMap, marker);
    });
}

$(function(){
    init_map();
});
