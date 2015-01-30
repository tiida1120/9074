var googleMap = null;

$(function() {
    apply_map();
});

function apply_map() {
    var coordinates = {
        latitude:136.670213,
        longitude:36.579160

    };

    var zoom = 15
    var title = "test"

    show_google_map('map-canvas', coordinates.longitude, coordinates.latitude, zoom, title);
}

function show_google_map(canvas_id, lat, lng, zoom, title) {

    googleMap = null;
    var latlng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        center: latlng,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    googleMap = new google.maps.Map(document.getElementById(canvas_id), mapOptions);


//    var m_latlng1 = new google.maps.LatLng(36.579160, 136.670213);
//    var m_latlng2 = new google.maps.LatLng(36.579720, 136.673433);
//    var m_latlng3 = new google.maps.LatLng(36.578333, 136.673111);
//
//    var marker1 = new google.maps.Marker({
//                                         position: m_latlng1,
//                                         map: googleMap,
//                                         title:title,
//                                         icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=熊|7FFF00|000000',
//                                         animation: google.maps.Animation.BOUNCE
//                                         });
//
//    var marker2 = new google.maps.Marker({
//                                         position: m_latlng2,
//                                         map: googleMap,
//                                         title:title,
//                                         icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=熊|87CEEB|000000',
//                                         animation: google.maps.Animation.BOUNCE
//                                         });
//
//    var marker3 = new google.maps.Marker({
//                                         position: m_latlng3,
//                                         map: googleMap,
//                                         title:title,
//                                         icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=熊|DC143C|000000',
//                                         animation: google.maps.Animation.BOUNCE
//                                         });
//

    function getCSVFile() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            createArray(xhr.responseText);
        };

        xhr.open("get", "../../csv/map/bearInfo.csv", true);
        xhr.send(null);
    }
    getCSVFile();

    function createXMLHttpRequest() {
        var XMLhttpObject = null;
        XMLhttpObject = new XMLHttpRequest();
        return XMLhttpObject;
    }

    function createArray(csvData) {
        var tempArray = csvData.split("\n");
        var csvArray = new Array();
        for(var i = 0; i<tempArray.length;i++){
            csvArray[i] = tempArray[i].split(",");

            var m_latlng = new google.maps.LatLng(csvArray[i][5], csvArray[i][6]);

            if(csvArray[i][7] == 1) {
                var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=熊|7FFF00|000000';
            } else if (csvArray[i][7] == 2) {

                var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=熊|87CEEB|000000';

            } else {

                var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=熊|DC143C|000000';
            }

            var marker = new google.maps.Marker({
                                                 position: m_latlng,
                                                 map: googleMap,
                                                 icon: icon
                                                 });

            addListenerPoint(marker,csvArray[i][4]);

        }

        function addListenerPoint(marker,content) {

            google.maps.event.addListener(marker, "click", function() {

                                          var infowindow = new google.maps.InfoWindow({
                                                                                      content: content
                                                                                      });
                                          infowindow.open(googleMap, marker);
                                          });


        }
    }
}