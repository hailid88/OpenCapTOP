MicrowaveDownloadStore = new Ext.data.JsonStore({
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getMicrowaveData',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd'
           
        }
    }),
    
    listeners: {
        beforeload: function (store, options) {
        },

        load: function (store, records) {
            
        }
    }
});