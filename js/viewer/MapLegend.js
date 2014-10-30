/**
* @class FeedViewer.FeedPanel
* @extends Ext.panel.Panel
*
* Shows a list of available feeds. Also has the ability to add/remove and load feeds.
*
* @constructor
* Create a new Feed Panel
* @param {Object} config The config object
*/

Ext.define('FeedViewer.LegendPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.legendpanel',
    layout: 'fit',
    title: 'Legend',
    bodyStyle: 'background:#ffc; padding:10px;',

    initComponent: function () {
        Ext.apply(this, {
            items: this.createView()
        });
        this.callParent(arguments);
    },

    /**
    * Create the DataView to be used for the feed list.
    * @private
    * @return {Ext.view.View}
    */
    createView: function () {

        this.view = Ext.create('widget.dataview', {
            store: Ext.create('Ext.data.Store', {
                model: 'Legend',
                data: [{
                    src: 'resource/legend/Major Crash.png',
                    text: 'Major Crash'
                }, {
                    src: 'resource/legend/Minor Crash.png',
                    text: 'Minor Crash'
                }, {
                    src: 'resource/legend/HAZMAT Spill.png',
                    text: 'HAZMAT Spill'
                }, {
                    src: 'resource/legend/Debris.png',
                    text: 'Debris'
                }, {
                    src: 'resource/legend/Suspicious Package.png',
                    text: 'Suspicious Package'
                }, {
                    src: 'resource/legend/Disabled Vehicles.png',
                    text: 'Disabled/Abandoned Vehicle'
                }, {
                    src: 'resource/legend/Fallen Tree.png',
                    text: 'Fallen Tree/Grass and Weeds'
                }, {
                    src: 'resource/legend/Manhole Explosion.png',
                    text: 'Manhole Explosion'
                }, {
                    src: 'resource/legend/Water Break.png',
                    text: 'Water Break',
                    height: 24,
                    width: 24
                }, {
                    src: 'resource/legend/Traffic Signal.png',
                    text: 'Traffic Signal'
                }, {
                    src: 'resource/legend/Street(Alley) Lights.png',
                    text: 'Street/Alley Light'
                }, {
                    src: 'resource/legend/Sign.png',
                    text: 'Sign'
                }, {
                    src: 'resource/legend/Street Repair.png',
                    text: 'Street/Alley Repair'
                }, {
                    src: 'resource/legend/Others.png',
                    text: 'Others',
                    height: '18',
                    width: '5'
                }, {
                    src: 'resource/legend/CCTV.png',
                    text: 'CCTV'
                }]
            }),
            listeners: {
                scope: this
            },
            tpl: '<tpl for="."><div><img src="{src}"height="22" width="22"/><font>{text}</font></div></tpl>'
        });
        return this.view;
    }
});
