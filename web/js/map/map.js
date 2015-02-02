// GoogleMap
var googleMap = null;

// infoウィンドウ
var showInfoWindow = null;

// 現在地用のマーカー
var currentPositionMarker = null;

// 現在地追跡用のID
var watchId;

// クマのスポットの配列
var bearSpotArray = Array();

// 地図のデフォルト表示地点の座標
var defailtLatlng = new google.maps.LatLng(36.565842, 136.658941);

// GoogleMapのオプション
var mapOptions = {
    zoom: 13,
    center: defailtLatlng,
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

// クマの出現ポイント
function BearSpot(csvData) {
    // csvData
    // 1:日時, 2:住所, 3:詳細, 4:緯度, 5:経度, 6:警戒レベル
    this.date = csvData[1];
    this.address = csvData[2];
    this.detail = csvData[3];
    this.lat = csvData[4];
    this.lng = csvData[5];
    this.level = csvData[6];
    this.atLng = null;
    this.distance = null;
}

// エラーコードのメッセージを定義
var errorMessage = {
  0: '原因不明のエラーが発生しました。',
  1: '位置情報の取得が許可されませんでした。',
  2: '位置情報が取得できませんでした。電波状態の良いところで再度お試し下さい。',
  3: '位置情報の取得がタイムアウトしました。電波状態の良いところで再度お試し下さい。',
};

$(function() {
    $('#map-page').on('pageshow', function() {
        init_map();
    });
});

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
    // 非同期でcsvを読み込む。
    // ajaxを使うのが正しいのかは不明。
    $.ajax( {
        url: '../../res/data/bearInfo.csv',
        dataType: 'text',
        acync: true,
        success: function(data) {
            var csvDataArray = data.split('\n');
            for (var i = 0; i < csvDataArray.length; i++) {
                var csvData = csvDataArray[i].split(',');
                add_marker(new BearSpot(csvData));
            }

            // テスト用
            // add_marker(new BearSpot([251, '2015.01.30 00:00','テスト1', 'テスト1', 36.582651, 136.643537, 3]));
            // add_marker(new BearSpot([252, '2015.01.30 00:00','テスト2', 'テスト2', 36.592651, 136.653537, 1]));
        },
        error: function(data) {
            // TODO:エラー時の処理
        }
    });
}

function add_marker(bearSpot) {
    // レベルに合わせてマーカーの画像を変更
    var latLng = new google.maps.LatLng(bearSpot.lat, bearSpot.lng);
    var markerImage = create_maker_image(get_marker_icon_name(bearSpot.level), new google.maps.Size(35, 35));
    var marker = new google.maps.Marker({
      position: latLng,
      icon: markerImage,
      map: googleMap
    });

    // インフォウィンドウ表示のイベント追加
    google.maps.event.addListener(marker, 'click', function() {
        show_info_window(bearSpot, marker);
    });

    // 現在地マーカー表示用の配列にpush
    push_bear_spot(bearSpot, latLng)
}

function push_bear_spot(bearSpot, latLng) {
    // 距離判定用にLatLngオブジェクトを格納
    bearSpot.latLng = latLng;

    // 配列に格納
    bearSpotArray.push(bearSpot);
}

function show_info_window(bearSpot, marker) {
    // 表示しているウィンドウがあればクローズ
    if (showInfoWindow) {
        showInfoWindow.close();
    }

    // ウィンドウの表示
    var infoContent = create_info_content(bearSpot);
    var infowindow = new google.maps.InfoWindow({
        content: infoContent
    });
    infowindow.open(googleMap, marker);

    // 表示しているウィンドウに設定
    showInfoWindow = infowindow;
}

function location_get_success(position) {
    // TODO:現在地の更新頻度の調整

    // 現在地を基準にソート
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    bearSpotArray = get_sorted_spot_array(latlng, bearSpotArray);

    // 最寄りのスポットに合わせてマーカーを変更。
    var iconInfo = get_current_icon_info(bearSpotArray[0]);
    var iconImage = create_maker_image(iconInfo.name, new google.maps.Size(17, 17));

    // マーカーが存在していない場合は新規に生成、存在している場合は位置情報のみ更新
    if (!currentPositionMarker) {
        currentPositionMarker = new google.maps.Marker({
            position: latlng,
            map: googleMap,
            flat: true,
            optimized: false,
            visible: true,
        });

        // 初回はmapの中心を現在地に
        googleMap.panTo(latlng);
    } else {
        currentPositionMarker.setPosition(latlng);
    }

    // アイコン画像とタイトルの設定
    currentPositionMarker.setIcon(iconImage);
    currentPositionMarker.setTitle(iconInfo.title);
}

function location_get_error(error) {
   //エラーコードに合わせたエラー内容をアラート表示
   alert(errorMessage[error.code]);
}
