/**
 * @class FeedViewer.FeedViewer
 * @extends Ext.container.Viewport
 *
 * The main FeedViewer application
 * 
 * @constructor
 * Create a new Feed Viewer app
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.App', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.window.*',
        'Ext.ux.GMapPanel'
    ],

    initComponent: function () {

        Ext.define('Legend', {
            extend: 'Ext.data.Model',
            fields: ['src', 'text']
        });

        Ext.apply(this, {
            layout: {
                type: 'border',
                padding: 150
            },
            items: [
                this.createFeedPanel(), 
                this.opencreateLegend(), 
                this.createMapWindow()
            ]
        });
        this.callParent(arguments);
    },


    /**
    * Create the list of fields to be shown on the left
    * @private
    * @return {FeedViewer.FeedPanel} feedPanel
    */
    createFeedPanel: function () {
        this.feedPanel = Ext.create('widget.feedpanel', {
            title: 'Web CapTOP v1.0',
            region: 'west',
            collapsible: true,
            collapsed: false,
            width: 0.19*screen.width,
            split: true,
            minWidth: 0.19*screen.width,
        });
        return this.feedPanel;
    },

    /**
    * Create the list of fields to be shown on the right
    * @private
    * @return {FeedViewer.LegendPanel} legendPanel
    */
//    createLegend: function () {
//        this.legendPanel = Ext.create('widget.legendpanel', {
//            region: 'east',
//            collapsible: true,
//            collapsed: true,
//            width: 0.17 * screen.width,
//            split: true,
//            minWidth: 0.15*screen.width
//        });
//        return this.legendPanel;
//    },

    opencreateLegend: function () {
        this.legendPanel = Ext.create('widget.legendpanel', {
             region: 'east',
            collapsible: false,
            collapsed: false,
            width: 0.17 * screen.width,
            split: true,
            minWidth: 0.15*screen.width
        });
        return this.legendPanel;
    },

    


    /**
    * Create map window
    */
    createMapWindow: function () {
        this.mapWin = Ext.create('widget.mapWindow', {
            region: 'center',
            minWidth: 0.4*screen.width
        });
        return this.mapWin;
    }
});
