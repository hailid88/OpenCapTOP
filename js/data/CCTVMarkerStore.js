CCTVCurMarkers = [];
CCTVMarkerConfigs = [];
CCTVsStore = new Ext.data.JsonStore({
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getCCTVmarkerInfo',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd',
            idProperty: "CCTVIntersection"
        }
    }),
    fields: ['CCTVIntersection', 'CCTVFilepath', 'CCTVLat', 'CCTVLng', 'CCTVType'
    ],
    listeners: {
        beforeload: function (store, options) {
        },
        load: function (store, records) {
            CCTVMarkerConfigs = [];
            Ext.each(records, function (record, index) {
                var contentString = "<b>Name</b>: " + record.get('CCTVIntersection')
                    + "<br><b>Lat</b>: " + record.get('CCTVLat')
                    + "<br><b>Lng</b>: " + record.get('CCTVLng');
                //var filepath = "http://10.40.62.65:8080/showvideo.aspx?vdo=" + record.get('CCTVFilepath');

                var filepath = "showvideo.aspx?vdo=" + record.get('CCTVFilepath') + '&type=' + record.get('CCTVType');

                //                var contentInfo = '<div class="boris-video">' + '<h1>' + record.get('CCTVIntersection') + '</h1>' + '<object width="400" height="320">'
                //                        + '<param name="movie" value=' + filepath + '></param>'
                //                        + '<param name="allowFullScreen" value="true"></param>'
                //                        + '<param name="allowscriptaccess" value="always"></param>'
                //                        + '<embed src= ' + filepath + '  width="400" height="320" allowscriptaccess="always" allowfullscreen="true"></embed>'
                //                + '</object>'
                //                + '</div>';
                var iconp;
                if (record.get('CCTVType') == 'RTMP')
                    iconp = 'resource/legend/cctv.png';
                else if (record.get('CCTVType') == 'IMG')
                    iconp = 'resource/legend/cctv_img.png';

                CCTVMarkerConfigs.push({
                    lat: parseFloat(record.get('CCTVLat')),
                    lng: parseFloat(record.get('CCTVLng')),
                    //title: "Intersection: " + record.get('CCTVIntersection'),
                    title: record.get('CCTVIntersection'),
                    icon: iconp,
                    fpath: filepath

                    //infoWindow: contentInfo
                });
            });


        }
    }
});