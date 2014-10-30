IMCurMarkers = [];
IMMarkerConfigs = [];
IMsStore = new Ext.data.JsonStore({
    // Load data at once
    //autoLoad: true,
    // Override default http proxy settings
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getIMmarkerInfo',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd',
            idProperty: "IncID"
        }
    }),
    fields: ['IncID', 'Longitude', 'Latitude','ImageAddress'],
    listeners: {
        beforeload: function (store, options) {
        },
        load: function (store, records) {
            IMMarkerConfigs = [];
            Ext.each(records, function (record, index) {
                IMMarkerConfigs.push({
                    lat: parseFloat(record.get('Latitude')),
                    lng: parseFloat(record.get('Longitude')),
                    title: record.get('IncID').toString(),
                    icon: record.get('ImageAddress').toString() + '.png'
                });
            });
        }
    }
});



