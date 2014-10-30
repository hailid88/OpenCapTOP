/**
 * @class FeedViewer.FeedInfo
 * @extends Ext.tab.Panel
 *
 * A container class for showing a series of feed details
 * 
 * @constructor
 * Create a new Feed Info
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.FeedInfo', {
    
    extend: 'Ext.tab.Panel',
    alias: 'widget.feedinfo',

    requires: [ 
        'Ext.ux.GMapPanel'
    ],
    
    maxTabWidth: 230,
    border: false,

    initComponent: function() {
        this.tabBar = {
            border: true
        };
        //this.creatMap();
        this.callParent();
    },
    
    /**
     * Creat Map Visualization
     *
     */
     /*creatMapWin: function(){
     }*/
     
        /*return;
        
        //if(!win){
            //alert('creat google map');
            //win = Ext.create('Ext.Window', {
        var win = Ext.create('Ext.window.Window', {
            layout: 'fit',
            title: 'GMap Window',
            closeAction: 'hide',
            width:700,
            height:500,
            border: false,
            animCollapse:false,
            constrainHeader:true,
            id: 'map-win',                
            items: {
                id: 'map-panel',
                name: 'map-panel',
                xtype: 'gmappanel',
                zoomLevel: 10,
                gmapType: 'map',
                mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl']
            }
        });
        Ext.defer(function(){
            var latitude = 7.5, longitude = 7.5;
            if (resultStore && resultStore.getAt(0))
            {
                latitude = parseFloat(resultStore.getAt(0).get('Longitude'));
                longitude = parseFloat(resultStore.getAt(0).get('Latitude'));
            }
            var point = new google.maps.LatLng(latitude, longitude);            
            var mapPanel = Ext.getCmp('map-panel');
            if (mapPanel)
            {
                mapPanel.gmap.setCenter(point);
                mapPanel.clearMarkers();
                if (markerConfigs)
                    mapPanel.addMarkers(markerConfigs);
            }
        },
        200, this);
        return win;
     }*/

    /**
     * Add a new feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    addFeed: function(title, url){
        var active = this.items.first();
        if (!active) {
            active = this.add({
                xtype: 'feeddetail',
                title: title,
                url: url,
                closable: false,
                listeners: {
                    scope: this,
                    opentab: this.onTabOpen,
                    openall: this.onOpenAll,
                    rowdblclick: this.onRowDblClick
                }
            });
        } else {
            active.loadFeed(url);
            active.tab.setText(title);
        }
        this.setActiveTab(active);
    },
    
    /**
     * Listens for a new tab request
     * @private
     * @param {FeedViewer.FeedPost} The post
     * @param {Ext.data.Model} model The model
     */
    onTabOpen: function(post, rec) {
        var items = [],
            item,
            title;
            
        if (Ext.isArray(rec)) {
            Ext.each(rec, function(rec) {
                title = rec.get('title');
                if (!this.getTabByTitle(title)) {
                    items.push({
                        inTab: true,
                        xtype: 'feedpost',
                        title: title,
                        closable: true,
                        data: rec.data,
                        active: rec
                    });
                }
            }, this);
            this.add(items);
        }
        else {
            title = rec.get('title');
            item = this.getTabByTitle(title);
            if (!item) {
                item = this.add({
                    inTab: true,
                    xtype: 'feedpost',
                    title: title,
                    closable: true,
                    data: rec.data,
                    active: rec
                });
            }
            this.setActiveTab(item);
        }
    },

    /**
     * Find a tab by title
     * @param {String} title The title of the tab
     * @return {Ext.Component} The panel matching the title. null if not found.
     */
    getTabByTitle: function(title) {
        var index = this.items.findIndex('title', title);
        return (index < 0) ? null : this.items.getAt(index);
    },
    
    /**
     * Listens for a row dblclick
     * @private
     * @param {FeedViewer.Detail} detail The detail
     * @param {Ext.data.Model} model The model
     */
    onRowDblClick: function(info, rec){
        this.onTabOpen(null, rec);
    },
    
    /**
     * Listens for the open all click
     * @private
     * @param {FeedViewer.FeedDetail}
     */
    onOpenAll: function(detail) {
        this.onTabOpen(null, detail.getFeedData());
    }
});