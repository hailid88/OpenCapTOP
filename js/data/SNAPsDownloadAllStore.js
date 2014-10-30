SNAPsDownloadAllStore = new Ext.data.JsonStore({
    proxy: new Ext.data.HttpProxy(
        {
            url: 'DBAccess.asmx/getSNAPsData',
            headers: { 'Content-type': 'application/json' },

            reader: {
                type: 'json',
                root: 'd'
            }
        }
    ),
    listeners: {
        beforeload: function (store, options) {
        },

        load: function (store, records) {
          
        }
    }
});
