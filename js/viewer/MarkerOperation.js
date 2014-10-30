/**
 * Created with JetBrains WebStorm.
 * User: Helli
 * Date: 9/12/12
 * Time: 1:20 PM
 * To change this template use File | Settings | File Templates.
 */
function openAddMarkers(markerConfigures, idnum) {

    var marker = null, point = null;
    var infoWindow = new google.maps.InfoWindow();
    var testwindow;
    var curMarkerConf = null;
    var gmap; 
    switch (idnum) {
        case 1:
            IMCurMarkers = [];
            gmap = incGmap;
            break;
        case 2:
            SNAPsCurMarkers = [];
            gmap = snapsGmap;
            break;
        case 3:
            CCTVCurMarkers = [];
            gmap = cctvGmap;
            break;
        case 4:
            PCSMarker = [];
            gmap = pcsGmap;
            break;
        //idnum is just follow the order in the layer. Incident is 1, and CCTV is 3. 
    }

    
        for (var i = 0; i < markerConfigures.length; i++) {
        
        curMarkerConf = markerConfigures[i];
        point = new google.maps.LatLng(curMarkerConf.lat, curMarkerConf.lng);
        var markerImage = new google.maps.MarkerImage(curMarkerConf.icon,
            new google.maps.Size(20, 32),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 32));
        marker = new google.maps.Marker({
            position: point,
            title: curMarkerConf.title,
            map: gmap,
            icon: markerImage
        });

//        google.maps.event.addListener(marker, 'click', function (marker, contentString) {
//            return function () {
//                infoWindow.setContent(contentString);
//                //alert(contentString);
//                infoWindow.open(gmap, marker);
//            }
//        } (marker, curMarkerConf.infoWindow));

        switch (idnum) {
            case 1:
                google.maps.event.addListener(marker, 'click', function (marker, incID) {
                    return function () {

                        Ext.apply(IMDetailStore.proxy.extraParams, { IncID: incID });
                        IMDetailStore.load();
                    }
                } (marker, curMarkerConf.title));

                IMCurMarkers.push(marker);

                break;
            case 2:
                try {
                    google.maps.event.addListener(marker, 'click', function (marker, acisa) {
                        return function () {
                            Ext.apply(SNAPsDownloadStore.proxy.extraParams, { ACISA: acisa });

                            SNAPsDownloadStore.load();

//                            infoWindow.setContent(test);
//                            infoWindow.open(gmap, marker);


                        }
                    } (marker, curMarkerConf.acisa));
                }
                catch (Error) { alert(Error); }

                SNAPsCurMarkers.push(marker);
                break;
            case 3:
                //var newWindow;
                google.maps.event.addListener(marker, 'click', function (marker, filepath, cctvtitle) {
                    return function () {
                        //var newWindow = window.open("http://www.google.com", cctvtitle, "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=400, height=320");
                        //alert(filepath);
                        //window.open("http://www.google.com", "width=200,height=100");
                        //var cctvmarkerInfo = CCTVsStore.getAt(i);
                        //var name = cctvmarkerInfo.get('CCTVIntersection');
                        //var cctvFilePath = cctvmarkerInfo.get("CCTVFilepath");
                        //alert(cctvFilePath);

                        var newWindow = window.open(filepath, cctvtitle, "toolbar=no, scrollbars=no, resizable=no, top=0, left=0, width=420, height=340");
                        //var newWindow = window.open(filepath, cctvtitle, "width=400, height=320, left=0, top=0");
                        //newWindow.onload = function () { this.document.title = "your new title"; }
                        //                        timerObj = window.setInterval("fun_To_ReTitle('test')", 10);
                        //                        //alert(cctvtitle);
                        //                        //newWindow.onload = function () { this.document.title = "your new title"; }
                        //alert(cctvtitle);
                        //newWindow.document.write("<title>" + cctvtitle + "</title>");
                        //newWindow.document.title = cctvtitle;
                        //                        if (!newWindow || newWindow.closed) {
                        //                            newWindow = window.open("", cctvtitle, "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=400, height=360");
                        //                            newWindow.document.write("<title>" + "stream video" + "</title>");
                        //                        }

                        //                        var newWindow = window.open("", cctvtitle, "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=400, height=360");
                        //add the title

                        //                        newWindow.document.write("<title>" + cctvtitle + "</title>");
                        //                        newWindow.document.write("<h5>" + cctvtitle + "</h5>");
                        //                        newWindow.document.write('<div class="boris-video">' + '<object width="400" height="320">'
                        //                                                                          + '<param name="movie" value=' + filepath + '></param>'
                        //                                                                          + '<param name="allowFullScreen" value="true"></param>'
                        //                                                                          + '<param name="allowscriptaccess" value="always"></param>'
                        //                                                                          + '<embed src= ' + filepath + '  width="400" height="340" allowscriptaccess="always" allowfullscreen="true"></embed>'
                        //                                                                          + '</object>'
                        //                                                                          + '</div>');
                        newWindow.focus();
                    }
                } (marker, curMarkerConf.fpath, curMarkerConf.title)
                );

                CCTVCurMarkers.push(marker);

                break;
            case 4:
                google.maps.event.addListener(marker, 'click', function (marker, contentString) {
                    return function () {

                        infoWindow.setContent(contentString);
                        //alert(contentString);
                        infoWindow.open(gmap, marker);
                    }
                } (marker, curMarkerConf.infoWindow));

                PCSCurMarkers.push(marker);
                break;
            
        }
    }

}


function addMarkers(markerConfigures,idnum) {
    var mapPanel = Ext.getCmp('map-panel');
    var marker = null, point = null;
    var infoWindow = new google.maps.InfoWindow();
    var curMarkerConf = null;
    switch(idnum)
    {
        case 1:
            IMCurMarkers = [];
            break;
        case 3:
            CCTVCurMarkers=[];
            break;
        //idnum is just follow the order in the layer. Incident is 1, and CCTV is 3.
    }


    for (var i = 0; i < markerConfigures.length; i++) {
        curMarkerConf = markerConfigures[i];
        point = new google.maps.LatLng(curMarkerConf.lat, curMarkerConf.lng);
        var markerImage = new google.maps.MarkerImage(curMarkerConf.icon,
            new google.maps.Size(20, 32),
            new google.maps.Point(0,0),
            new google.maps.Point(0, 32));
        marker = new google.maps.Marker({
            position: point,
            title: curMarkerConf.title,
            map: mapPanel.gmap,
            icon: markerImage
        });
        google.maps.event.addListener(marker, 'click', function (marker, contentString) {
            return function () {
                infoWindow.setContent(contentString);
                //alert(contentString);
                infoWindow.open(mapPanel.gmap, marker);
            }
        } (marker, curMarkerConf.infoWindow));

        switch(idnum)
        {
            case 1:
                
                IMCurMarkers.push(marker);
                break;
            case 2:
                SNAPsCurMarker.push(marker);
                break;
            case 3:
               
                
                CCTVCurMarkers.push(marker);
                break;
            //idnum is just follow the order in the layer. Incident is 1, and CCTV is 3. 

        }
    }
}

function removeMarkers(curMarkers, idnum) {
    //try {
        //var mapPanel = Ext.getCmp('map-panel');
        var marker;
        //alert(curMarkers.length);
        for (var i = 0; i < curMarkers.length; i++) {
            marker = curMarkers[i];
            marker.setMap(null);
        }

        switch (idnum) {
            case 1:
                IMCurMarkers = [];
                break;
            case 2:
                SNAPsCurMarkers = [];
                break;
            case 3:
                CCTVCurMarkers = [];
                break;
            //idnum is just follow the order in the layer. Incident is 1, and CCTV is 3.  
            case 4:
                PCSCurMarkers = [];
                break;
        }
        curMarkers = [];
    //} catch (err) {alert(err); }
}

