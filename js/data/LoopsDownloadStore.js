LoopsDownloadStore = new Ext.data.JsonStore({
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getLoopsData',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd'
        }
    }),
    //    fields: ['SNAPsTime', 'SNAPsACISA', 'SNAPsLaneDir', 'SNAPsLaneNum', 'SNAPsVolume', 'SNAPsOccupancy', 'SNAPsSpeed'
    //    ],
    listeners: {
        beforeload: function (store, options) {
        },

        load: function (store, records) {
            
        }
    }
});