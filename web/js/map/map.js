var googleMap = null;
var showInfoWindow = null;

function init_map() {
    googleMap = null;

    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(36.565842, 136.658941),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    googleMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    load_spots();
}

function load_spots() {
    $.ajax( {
        url: '../../res/data/bearInfo.csv',
        dataType: 'text',
        acync: true,
        success: function(data) {
            var csvDataArray = data.split('\n');
            for (var i = 0; i < csvDataArray.length; i++) {
                add_marker(csvDataArray[i].split(','));
            }
        },
        error: function(data) {
            // TODO:エラー時の処理
        }
    });
}

function add_marker(spot) {
    // spot
    // 1:日時, 2:住所, 3:詳細, 4:緯度, 5:経度, 6:警戒レベル

    // TODO:レベルに応じたマーカーの表示
    var latlng = new google.maps.LatLng(spot[4], spot[5]);
    var marker = new google.maps.Marker({
      position: latlng,
      map: googleMap,
    });

    google.maps.event.addListener(marker, 'click', function() {
        show_info_window(spot, marker);
    });
}

function show_info_window(spot, marker) {
    if (showInfoWindow) {
        showInfoWindow.close();
    }

    var infoContent = $('<div id="info-container" style="width:100%; height:100%;"><div id="info-date"></div><div id="info-place"></div><div id="info-detail"></div></div>');
    infoContent.find('#info-date').text('日時：' + spot[1]);
    infoContent.find('#info-place').text('住所：' + spot[2]);
    infoContent.find('#info-detail').text('詳細：' + spot[3]);

    var infowindow = new google.maps.InfoWindow({
        content: infoContent.html()
    });
    showInfoWindow = infowindow;
    infowindow.open(googleMap, marker);
}

$(function(){
    init_map();
});
