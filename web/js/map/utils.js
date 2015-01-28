// 注意レベルの距離
WARN_DISTANCE = (5*1000.0);

// 警戒レベルの距離
ALERT_DISTANCE = (2*1000.0);

// 危険度レベルの列挙型
var DANGER_LEVEL = {
    ALERT: 1,
    WARN: 2,
    NORMAL: 3
};

function get_sorted_spot_array(currentlatlng, spotArray) {
    var sortedArray = Array();

    for (var i=0; i<spotArray.length; i++) {
        var spot = spotArray[i];
        spot[8] = get_distance(currentlatlng, spot[7]);
        sortedArray.push(spot);
     }

     sortedArray.sort(
        function(a,b){
            var aDistance = a[8];
            var bDistance = b[8];
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
            icon_name = '../../res/images/redmarker.png';
            break;
        case DANGER_LEVEL.WARN:
            icon_name = '../../res/images/yellowmarker.png';
            break;
        case DANGER_LEVEL.NORMAL:
            icon_name = '../../res/images/bluemarker.png';
            break;
        default:
            icon_name = '../../res/images/bluemarker.png';
            break;
    }
    return icon_name;
}

function get_current_icon_name(level) {
    var iconName = '';
    switch (parseInt(level, 10)) {
        case DANGER_LEVEL.ALERT:
            icon_name = '../../res/images/reddot.png';
            break;
        case DANGER_LEVEL.WARN:
            icon_name = '../../res/images/yellowdot.png';
            break;
        case DANGER_LEVEL.NORMAL:
            icon_name = '../../res/images/bluedot.png';
            break;
        default:
            icon_name = '../../res/images/bluedot.png';
            break;
    }
    return icon_name;
}
