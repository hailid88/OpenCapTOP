<%@ Page Title="CapTOP Open Web" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="CCTV.aspx.cs" Inherits="CCTV" %>


<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAwhhxiaAndGUIXAa24SIvisNN9xuf2Zc4&sensor=false"></script>
    <script type="text/javascript" src="lib/extjs-4.1.0/ext-all.js"></script>
    <script type="text/javascript" src="js/data/CCTVMarkerStore.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
            google.maps.event.trigger(map, 'resize');
            map.setZoom(map.getZoom());
    </script>
   
    <script type="text/javascript" src="lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
    <script type="text/javascript" src="js/viewer/MarkerOperation.js"></script>
    
    <script type="text/javascript">
        var cctvGmap;
        function load() {
            //createIncidentLegend();
            cctvGmap = new google.maps.Map(document.getElementById("map_canvas"), {
                center: new google.maps.LatLng(38.915079, -77.01416),
                zoom: 11,
                mapTypeId: 'roadmap'
            });
            try {
                refresh();
                //alert('refreshed');
            } catch (err) {
                alert('err=' + err);
            }
        }

        function refresh() {
            
            removeMarkers(CCTVCurMarkers, 3);
            try {

                CCTVsStore.load();
            }
            catch (err) {
                alert(err);
            }
            Ext.defer(function () {
                //createIncidentLegend();
                openAddMarkers(CCTVMarkerConfigs, 3);    
            },
            800, this);

        }
        google.maps.event.addDomListener(window, 'load', load);
        //set the interval for update as 5 mins. 
        setInterval(function () { refresh() }, 300000);

    </script>
     <h2>
        CCTV: DDOT CCTV
        <%--<link rel="stylesheet" type="text/css" href="css/CCTV.css"/>--%>
    </h2>
    <div id="map_canvas" style="height:94%; width:100%; margin:0;"></div>
    </asp:Content>