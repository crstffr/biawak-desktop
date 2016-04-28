<?include 'library/functions.php';?>
<?$filename = basename(__FILE__, ".php");?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title><?=$config[$filename]['pagetitle'];?></title>
        <?php include 'library/common/head.php';?>
        <?php include 'library/common/javascript.php';?>
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script>
            var poly, map, plainMap;
            var markers = [];
            var path = new google.maps.MVCArray;
            function initialize() {
                var plainMap = new google.maps.Map(document.getElementById("plainMap"), {
                    zoom: 7,
                    center: new google.maps.LatLng(40.771166,-73.974209),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var hybridMap = new google.maps.Map(document.getElementById("hybridMap"), {
                    zoom: 7,
                    center: new google.maps.LatLng(51.507335,-0.127683),
                    mapTypeId: google.maps.MapTypeId.HYBRID
                });
                //                $.pnotify.defaults.styling = "jqueryui";
                //                $.pnotify.defaults.history = false;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                    function (position) {
                        printGeoMap(position.coords.latitude, position.coords.longitude);
                    }, 
                    function() {
                        // Gelocation fallback: Defaults to Stockholm, Sweden
                        printGeoMap(59.3325215, 18.0643818)
                        $.pnotify({
                            title: 'Geolocation Error',
                            addclass: 'loginNote',
                            text: 'Please accept geolocation for me to be able to find you. I\'ve put you in Stockholm for now.'
                        });
                    }
                );
                } else {
                    // No geolocation fallback: Defaults to Eeaster Island, Chile
                    printGeoMap(-27.121192, -109.366424)
                    $.pnotify({
                        title: 'Geolocation Error',
                        addclass: 'loginNote',
                        text: 'No location support. Try Easter Island for now. :)'
                    });
                }
                var uluru = new google.maps.LatLng(48.857939, 2.346611);
                var map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 7,
                    center: uluru,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                });
                var poly = new google.maps.Polygon({
                    strokeWeight: 3,
                    clickable: false,
                    fillColor: '#aad5f5'
                });
                poly.setMap(map);
                poly.setPaths(new google.maps.MVCArray([path]));
                google.maps.event.addListener(map, 'click', addPoint);
            }
            function printGeoMap(lat, lng) {
                myLatlng = new google.maps.LatLng(lat, lng);
                var geolocation = new google.maps.Map(document.getElementById('geolocation'), {
                    zoom: 8,
                    center: myLatlng,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                });
                var newMarker = new google.maps.Marker({
                    position: myLatlng,
                    map: geolocation,
                    title: "My Location"
                });
            }
            function addPoint(event, latLng) {
                if(!latLng) latLng = event.latLng;
                path.insertAt(path.length, latLng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    draggable: true
                });
                markers.push(marker);
                marker.setTitle("#" + path.length);
                google.maps.event.addListener(marker, 'click', function() {
                    marker.setMap(null);
                    for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
                    markers.splice(i, 1);
                    path.removeAt(i);
                    updateCoordinates(markers);
                });
                google.maps.event.addListener(marker, 'dragend', function() {
                    for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
                    path.setAt(i, marker.getPosition());
                    updateCoordinates(markers);
                });
                updateCoordinates(markers);
            }
            function updateCoordinates(markers) {
                var coor = '';
                $.each(markers, function(){
                    coor += ' ' + this.position.Qa;
                    coor += ',' + this.position.Ra;
                });
                $('#coordinates').val(coor);
            }
            $().ready(function() {
                initialize();
            });
        </script>

    </head>

    <body class="body-inner">
        <?include 'library/common/main_menu.php';?>
        <?include 'library/common/user_menu.php';?>
        <?include 'library/common/panel.php';?>
        <div class="main-content<?=($_COOKIE["jsTreeMenu"] == 'retracted' ? ' retracted' : '');?>">
            <?include 'library/common/breadcrumbs.php';?>
            <header>
                <i class="icon-big-notepad"></i>
                <h2><small><?=$config[$filename]['h2'];?></small></h2>
                <h3><small><?=$config[$filename]['h3'];?></small></h3>
            </header>
            <div class="container-fluid">
                <form class="form-horizontal">
                    <div class="row-fluid">
                        <div class="span6">
                            <div id="Road_Map" class="container-fluid">

                                    <div class="form-legend">Road Map</div>
                                    <!--Map1 begin-->
                                    <div class="control-group row-fluid">
                                        <div class="span12">
                                            <div class="controls controls-map">
                                                <div id="plainMap" style="height:400px; width:100%"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Map1 end-->

                            </div><!-- end container -->
                        </div>

                        <div class="span6">
                            <div id="Hybrid_Map" class="container-fluid">

                                    <div class="form-legend">Hybrid Map</div>
                                    <!--Map2 begin-->
                                    <div class="control-group row-fluid">
                                        <div class="span12">
                                            <div class="controls controls-map">
                                                <div id="hybridMap" style="height:400px; width:100%"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Map2 end-->

                            </div><!-- end container -->
                        </div>
                    </div>

                    <div id="Geolocation_Detection" class="container-fluid">

                            <div class="form-legend">Geolocation Detection</div>
                            <!--Map3 begin-->
                            <div class="control-group row-fluid">
                                <div class="span12">
                                    <div class="controls controls-map">
                                        <div id="geolocation" style="height:400px; width:100%"></div>
                                    </div>
                                </div>
                            </div>
                            <!--Map3 end-->

                    </div><!-- end container -->

                    <div id="Polygon_Creator_Tool" class="container-fluid">

                            <div class="form-legend">Polygon Creator Tool</div>
                            <!--Map3 begin-->
                            <div class="control-group row-fluid">
                                <div class="span12">
                                    <label class="control-label">Instructions: Create a polygon by clicking on a map.</label>
                                    <div class="controls controls-map">
                                        <div id="map" style="height:400px; width:100%"></div>
                                        <input type="hidden" name="coordinates" id="coordinates" value="">
                                    </div>
                                </div>
                            </div>
                            <!--Map3 end-->

                    </div><!-- end container -->
                </form>
            </div><!-- end container -->
        </div>
    <?php include 'library/common/ga.php';?>
    </body>
</html>