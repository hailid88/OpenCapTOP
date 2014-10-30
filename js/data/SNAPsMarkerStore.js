SNAPsCurMarkers = [];
SNAPsMarkerConfigs = [];
SNAPsStore = new Ext.data.JsonStore({
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getSNAPsMarkerInfo',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd',
            idProperty: "SNAPsACISA"
        }
    }),
    fields: ['SNAPsACISA', 'SNAPsLat', 'SNAPsLng'],
    listeners: {
        beforeload: function (store, options) {
        },
        load: function (store, records) {
            SNAPsMarkerConfigs = [];
            Ext.each(records, function (record, index) {
                var contentString = "<b>ACISA</b>: " + record.get('SNAPsACISA')
                    + "<br><b>Lat</b>: " + record.get('SNAPsLat')
                    + "<br><b>Lng</b>: " + record.get('SNAPsLng');
                //alert(contentString);

                SNAPsMarkerConfigs.push({
                    lat: parseFloat(record.get('SNAPsLat')),
                    lng: parseFloat(record.get('SNAPsLng')),
                    title: "ACISA"+ record.get('SNAPsACISA'),
                    icon: 'resource/legend/maps-icon.png',
                    infoWindow: contentString,
                    acisa: parseInt(record.get('SNAPsACISA'))
                });
            });


        }
    }
});