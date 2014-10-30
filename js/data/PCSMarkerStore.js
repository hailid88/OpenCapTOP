PCSCurMarkers = [];
PCSMarkerConfigs = [];
PCSStore = new Ext.data.JsonStore({
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getPCSMarkerInfo',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd',
            idProperty: "PCSSiteID"
        }
    }),
    fields: ['PCSLocation', 'PCSSiteID', 'PCSTechnology',  'PCSLat', 'PCSLng'],
    listeners: {
        beforeload: function (store, options) {
        },
        load: function (store, records) {
            PCSMarkerConfigs = [];
            Ext.each(records, function (record, index) {
                var contentString = "<b>Location</b>: " + record.get('PCSLocation')
                    + "<br><b>Count Station</b>: " + record.get('PCSSiteID')
                    + "<br><b>Technology</b>: " + record.get('PCSTechnology');

                PCSMarkerConfigs.push({
                    lat: parseFloat(record.get('PCSLat')),
                    lng: parseFloat(record.get('PCSLng')),
                    title: "Location" + record.get('PCSLocation'),
                    //icon: 'resource/legend/maps-icon.png',
                    icon: 'resource/legend/' + record.get('PCSTechnology').toString() + '.png',
                    infoWindow: contentString,
                    siteID: parseInt(record.get('PCSSiteID'))
                });
            });


        }
    }
});