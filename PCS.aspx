<%@ Page Title="CapTOP Open Web" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="PCS.aspx.cs" Inherits="PCS" %>


<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
	<style>
	#dialog-link {
		padding: .4em 1em .4em 20px;
		text-decoration: none;
		position: relative;
	}
	#dialog-link span.ui-icon {
		margin: 0 5px 0 0;
		position: absolute;
		left: .2em;
		top: 50%;
		margin-top: -8px;
	}
	</style>
    <link rel="stylesheet" type="text/css" href="lib/extjs-4.1.0/resources/css/SNAPsDetail.css" />
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAwhhxiaAndGUIXAa24SIvisNN9xuf2Zc4&sensor=false"></script>
    <script type="text/javascript" src="lib/extjs-4.1.0/ext-all.js"></script>
    <script type="text/javascript" src="js/data/PCSMarkerStore.js"></script>
    <script type="text/javascript" src="js/data/InfraredDownloadStore.js"></script>
    <script type="text/javascript" src="js/data/LoopsDownloadStore.js"></script>
    <script type="text/javascript" src="js/data/AcousticDownloadStore.js"></script>
    <script type="text/javascript" src="js/data/VideoDownloadStore.js"></script>
    <script type="text/javascript" src="js/data/MicrowaveDownloadStore.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
            google.maps.event.trigger(map, 'resize');
            map.setZoom(map.getZoom());
    </script>
   
    <script type="text/javascript" src="lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
    <script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="js/viewer/MarkerOperation.js"></script>
    
    <script type="text/javascript">
        var pcsGmap;
        function load() {       
            pcsGmap = new google.maps.Map(document.getElementById("map_canvas"), {
                center: new google.maps.LatLng(38.915079, -77.01416),
                zoom: 11,
                mapTypeId: 'roadmap'
            });
            try {
                refresh();
                
            } catch (err) {
                alert('err=' + err);
            }
        }

        function refresh() {

            removeMarkers(PCSCurMarkers, 4);
            try {
                PCSStore.load();
            }
            catch (err) {
                alert(err);
            }
            Ext.defer(function () {
                
                try {
                    openAddMarkers(PCSMarkerConfigs, 4);
                }
                catch (Error){
                    alert(Error);
                }
            },
            800, this);

        }
        google.maps.event.addDomListener(window, 'load', load);
        

    </script>
     <h2>
        PCS: DDOT Perment Count Station
        <link rel="stylesheet" type="text/css" href="css/CCTV.css"/>
    </h2>
    <div id="map_canvas" style="height:94%; width:100%; margin:0;"> </div>
    <table style="width:100%;">
        <tr>
            <td style="text-align:right;">
                <a href="#" id="dialog-link" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin"></span>Download PCS Data</a>
            </td>
            <%--<td style="text-align:right;">
                <a href="#" id="A1" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin"></span>Download Microwave Data</a>
            </td>
            <td style="text-align:right;">
                <a href="#" id="A2" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin"></span>Download Accoustic Data</a>
            </td>
            <td style="text-align:right;">
                <a href="#" id="A3" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin"></span>Download Video Data</a>
            </td>
            <td style="text-align:right;">
                <a href="#" id="A4" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin"></span>Download Loops Data</a>
            </td>--%>
        </tr>
    </table>

     <div id="dialog" title="Download PCS Data">
         <table style="width: 100%;">
             <tr>
                 <td style="text-align: right; width: 20%">
                 Start Date:</td>
                 <td>
                 <input type="text" id="pcsDateStart"/></td>
                 <td style="text-align: right; width: 20%">
                 Time:</td>
                 <td>
                 <input type="text" id="pcsTimeStart"/></td>
             </tr>
             <tr>
                 <td style="text-align: right; width: 20%">
                 End Date: 
			     </td>
                 <td>
                 <input type="text" id="pcsDateEnd" /></td>
                 <td style="text-align: right; width: 20%">
                 Time: 
			     </td>
                 <td>
                 <input type="text" id="pcsTimeEnd" /></td>
             </tr>
             </table>
    </div>
      
    <%--<br/><input type="checkbox" id="hide_legend" onchange="hideLegend()"/> Hide Incident Legend--%>
    <script>
        $('#pcsDateStart').datepicker();
        $('#pcsDateEnd').datepicker();
        $('#pcsTimeStart').timepicker();
        $('#pcsTimeEnd').timepicker();
    </script>
    <script type="text/javascript" src="js/viewer/PCSSearch.js"></script>
    </asp:Content>