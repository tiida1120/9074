// GoogleMap
var googleMap = null;

// infoウィンドウ
var showInfoWindow = null;

// 現在地用のマーカー
var currentPositionMarker = null;

// 現在地追跡用のID
var watchId = null;

// GoogleMapのオプション
var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(36.565842, 136.658941),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
};

// 現在地種取得のオプション
var watchPositionOptions = {
   enableHighAccuracy: false,
   timeout: 300000,
   maximumAge: 0,
};

//エラーコードのメッセージを定義
var errorMessage = {
  0: '原因不明のエラーが発生しました。',
  1: '位置情報の取得が許可されませんでした。',
  2: '位置情報が取得できませんでした。電波状態の良いところで再度お試し下さい。',
  3: '位置情報の取得がタイムアウトしました。電波状態の良いところで再度お試し下さい。',
};


function init_map() {
    // map初期化
    if (!googleMap) {
        googleMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    // スポット読み込み
    load_spots();

    // 現在地表示&追跡
    watchId　= navigator.geolocation.watchPosition(location_get_success, location_get_error, watchPositionOptions);

    // 地図をドラッグした際は現在地の追跡を解除するように
    // TODO:現在地追跡の復活方法
    google.maps.event.addListener(googleMap, 'dragend', function() {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }
    });
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
    var latlng = new google.maps.LatLng(spot[4], spot[5]);

    // TODO:レベルに合わせた画像の表示
    // csvから値は取れているので、あとはget_icon_name()の中の処理。
    var marker = new google.maps.Marker({
      position: latlng,
      map: googleMap,
      icon: get_icon_name(spot[6])
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

function location_get_success(position) {
    // マーカーが存在していない場合は新規に生成、存在している場合は位置情報のみ更新
    // 現在地の取得周期は不明。10秒に一回更新するくらいにしたい。

    // TODO:一番近いスポットとの距離に合わせた現在地のマーカーの色変更
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if (!currentPositionMarker) {
        var image = new google.maps.MarkerImage(
            '../../res/images/bluedot.png',
            null,
            null,
            new google.maps.Point( 8, 8 ),
            new google.maps.Size( 17, 17 )
        );

        currentPositionMarker = new google.maps.Marker({
            position: latlng,
            map: googleMap,
            flat: true,
            icon: image,
            optimized: false,
            visible: true,
            title: 'CurrentPosition'
        });
    } else {
        currentPositionMarker.setPosition(latlng)
    }

    // mapの中心を現在地に
    googleMap.setCenter(latlng);
}

function location_get_error(error) {
   //エラーコードに合わせたエラー内容をアラート表示
   alert(errorMessage[error.code]);
}

$(function() {
    init_map();
});
