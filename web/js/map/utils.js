// 注意レベルの距離
WARN_DISTANCE = (3*1000.0);

// 警戒レベルの距離
ALERT_DISTANCE = (1*1000.0);

// 危険度レベルの列挙型
var DANGER_LEVEL = {
    ALERT: 1,
    WARN: 2,
    NORMAL: 3
};

function create_maker_image(iconName, size) {
    return new google.maps.MarkerImage(
        iconName,
        null,
        null,
        new google.maps.Point(8, 8),
        size
    );
}

function create_info_content(bearSpot) {
    var infoContent = $('<div id="info-container" style="width:100%; height:100%;"><div id="info-date"></div><div id="info-place"></div><div id="info-detail"></div></div>');
    infoContent.find('#info-date').text('日時：' + bearSpot.date);
    infoContent.find('#info-place').text('住所：' + bearSpot.address);
    infoContent.find('#info-detail').text('詳細：' + bearSpot.detail);

    return infoContent.html();
}

function get_sorted_spot_array(currentlatlng, bearSpotArray) {
    var sortedArray = Array();

    for (var i=0; i<bearSpotArray.length; i++) {
        var bearSpot = bearSpotArray[i];
        bearSpot.distance = get_distance(currentlatlng, bearSpot.latLng);
        sortedArray.push(bearSpot);
     }

    sortedArray.sort(
        function(a,b){
            var aDistance = a.distance;
            var bDistance = b.distance;
            if(aDistance < bDistance) return -1;
            if(aDistance > bDistance) return 1;
            return 0;
        }
    );

    return sortedArray;
}

function get_distance(currentlatlng, spotlatlng) {
    return google.maps.geometry.spherical.computeDistanceBetween(spotlatlng, currentlatlng);
}

function get_marker_icon_name(level) {
    var iconName = '';
    switch (parseInt(level, 10)) {
        case DANGER_LEVEL.ALERT:
            icon_name = '../../res/images/marker/redmarker.png';
            break;
        case DANGER_LEVEL.WARN:
            icon_name = '../../res/images/marker/yellowmarker.png';
            break;
        case DANGER_LEVEL.NORMAL:
            icon_name = '../../res/images/marker/bluemarker.png';
            break;
        default:
            icon_name = '../../res/images/marker/bluemarker.png';
            break;
    }
    return icon_name;
}

// アイコン情報
function IconInfo(_name, _title) {
    this.name = _name;
    this.title = _title;
}

function get_current_icon_info(bearSpot) {
    var distance = bearSpot.distance;

    var iconInfo;
    switch (parseInt(bearSpot.level, 10)) {
        case DANGER_LEVEL.ALERT:
            if (distance < ALERT_DISTANCE) {
                iconInfo = new IconInfo('../../res/images/dot/reddot.png', 'CurrentPositionAlert');
            } else {
                iconInfo = new IconInfo('../../res/images/dot/yellowdot.png', 'CurrentPositionWarn');
            }
            break;
        case DANGER_LEVEL.WARN:
            if (distance < ALERT_DISTANCE) {
                iconInfo = new IconInfo('../../res/images/dot/yellowdot.png', 'CurrentPositionWarn');
            } else {
                iconInfo = new IconInfo('../../res/images/dot/bluedot.png', 'CurrentPositionNormal');
            }
            break;
        case DANGER_LEVEL.NORMAL:
            iconInfo = new IconInfo('../../res/images/dot/bluedot.png', 'CurrentPositionNormal');
            break;
        default:
            iconInfo = new IconInfo('../../res/images/dot/bluedot.png', 'CurrentPositionNormal');
            break;
    }
    return iconInfo;
}
