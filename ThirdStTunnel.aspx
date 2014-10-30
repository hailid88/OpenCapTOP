<%@ Page Title="CapTOP Open Web" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="ThirdStTunnel.aspx.cs" Inherits="ThirdStTunnel" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
<h2> Click on the map to open the camera stream: </h2>
<div style="text-align:center; height:95%; width:90%">
    <asp:ImageMap  ImageAlign="Middle" id="imap" runat="server" 
        ImageUrl="~/CCTVDisplay/3st_tunnel01.png" HotSpotMode="PostBack" 
        onclick="imap_Click" OnClientClick="aspnetForm.target ='_blank';">
        <asp:RectangleHotSpot Left="718" Top="121" Right="759" Bottom="138" PostBackValue="201" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="760" Top="121" Right="801" Bottom="138" PostBackValue="202" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="800" Top="56" Right="841" Bottom="73" PostBackValue="203" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="765" Top="57" Right="798" Bottom="74" PostBackValue="204" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="676" Top="121" Right="714" Bottom="140" PostBackValue="205" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="625" Top="121" Right="662" Bottom="139" PostBackValue="206" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="724" Top="56" Right="761" Bottom="75" PostBackValue="207" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="587" Top="121" Right="618" Bottom="141" PostBackValue="208" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="674" Top="56" Right="713" Bottom="73" PostBackValue="209" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="544" Top="122" Right="582" Bottom="139" PostBackValue="210" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="626" Top="57" Right="666" Bottom="75" PostBackValue="211" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="503" Top="122" Right="539" Bottom="139" PostBackValue="212" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="583" Top="57" Right="623" Bottom="76" PostBackValue="213" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="463" Top="121" Right="498" Bottom="139" PostBackValue="214" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="419" Top="120" Right="458" Bottom="139" PostBackValue="215" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="379" Top="122" Right="416" Bottom="141" PostBackValue="216" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="339" Top="123" Right="376" Bottom="142" PostBackValue="217" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="297" Top="121" Right="336" Bottom="140" PostBackValue="218" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="259" Top="97" Right="295" Bottom="119" PostBackValue="219" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="213" Top="99" Right="258" Bottom="120" PostBackValue="220" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="131" Top="101" Right="170" Bottom="120" PostBackValue="221" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="92" Top="124" Right="133" Bottom="140" PostBackValue="222" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="9" Top="101" Right="49" Bottom="119" PostBackValue="223" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="49" Top="122" Right="89" Bottom="140" PostBackValue="224" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="49" Top="100" Right="89" Bottom="121" PostBackValue="225" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="9" Top="217" Right="49" Bottom="234" PostBackValue="226" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="50" Top="213" Right="88" Bottom="234" PostBackValue="227" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="91" Top="234" Right="130" Bottom="254" PostBackValue="228" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="51" Top="237" Right="89" Bottom="254" PostBackValue="229" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="91" Top="213" Right="131" Bottom="236" PostBackValue="230" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="135" Top="215" Right="170" Bottom="235" PostBackValue="231" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="173" Top="214" Right="210" Bottom="235" PostBackValue="232" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="214" Top="214" Right="251" Bottom="236" PostBackValue="233" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="256" Top="214" Right="293" Bottom="234" PostBackValue="234" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="300" Top="216" Right="339" Bottom="234" PostBackValue="235" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="342" Top="215" Right="375" Bottom="237" PostBackValue="236" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="378" Top="216" Right="416" Bottom="234" PostBackValue="237" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="420" Top="215" Right="457" Bottom="234" PostBackValue="238" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="461" Top="214" Right="497" Bottom="236" PostBackValue="239" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="501" Top="214" Right="538" Bottom="237" PostBackValue="240" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="502" Top="237" Right="539" Bottom="255" PostBackValue="241" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="541" Top="213" Right="581" Bottom="234" PostBackValue="243" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="584" Top="212" Right="622" Bottom="238" PostBackValue="244" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="627" Top="213" Right="660" Bottom="233" PostBackValue="247" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="663" Top="212" Right="715" Bottom="236" PostBackValue="250" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="719" Top="215" Right="759" Bottom="235" PostBackValue="252" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="760" Top="238" Right="799" Bottom="254" PostBackValue="253" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="541" Top="100" Right="582" Bottom="121" PostBackValue="254" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="419" Top="98" Right="458" Bottom="119" PostBackValue="255" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="172" Top="101" Right="210" Bottom="121" PostBackValue="256" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="257" Top="235" Right="297" Bottom="257" PostBackValue="257" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="377" Top="234" Right="420" Bottom="257" PostBackValue="258" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="661" Top="238" Right="717" Bottom="259" PostBackValue="259" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="801" Top="101" Right="840" Bottom="119" PostBackValue="200" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="583" Top="283" Right="621" Bottom="300" PostBackValue="242" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="624" Top="281" Right="668" Bottom="300" PostBackValue="245" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="670" Top="282" Right="717" Bottom="303" PostBackValue="246" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="721" Top="282" Right="759" Bottom="303" PostBackValue="248" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="763" Top="282" Right="800" Bottom="302" PostBackValue="249" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="803" Top="280" Right="839" Bottom="303" PostBackValue="251" HotSpotMode="PostBack"/>
    </asp:ImageMap>
    <asp:ImageMap  ImageAlign="Middle" id="ImageMap1" runat="server" 
    ImageUrl="~/CCTVDisplay/3st_tunnel02.png" HotSpotMode="PostBack" 
    onclick="imap_Click" OnClientClick="aspnetForm.target ='_blank';">
        <asp:RectangleHotSpot Left="23" Top="196" Right="63" Bottom="216" PostBackValue="300" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="144" Top="196" Right="185" Bottom="216" PostBackValue="301" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="66" Top="198" Right="107" Bottom="218" PostBackValue="302" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="108" Top="194" Right="145" Bottom="218" PostBackValue="303" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="146" Top="174" Right="186" Bottom="195" PostBackValue="304" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="189" Top="175" Right="226" Bottom="199" PostBackValue="305" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="224" Top="175" Right="270" Bottom="198" PostBackValue="306" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="228" Top="198" Right="270" Bottom="216" PostBackValue="307" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="274" Top="196" Right="306" Bottom="217" PostBackValue="308" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="309" Top="196" Right="344" Bottom="217" PostBackValue="309" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="345" Top="198" Right="388" Bottom="219" PostBackValue="310" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="432" Top="213" Right="473" Bottom="238" PostBackValue="311" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="435" Top="241" Right="473" Bottom="262" PostBackValue="312" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="390" Top="196" Right="431" Bottom="220" PostBackValue="313" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="345" Top="62" Right="389" Bottom="83" PostBackValue="314" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="315" Top="82" Right="349" Bottom="103" PostBackValue="315" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="436" Top="39" Right="472" Bottom="62" PostBackValue="316" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="391" Top="81" Right="433" Bottom="101" PostBackValue="317" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="271" Top="81" Right="314" Bottom="103" PostBackValue="318" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="230" Top="81" Right="271" Bottom="102" PostBackValue="319" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="190" Top="81" Right="227" Bottom="104" PostBackValue="320" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="148" Top="82" Right="190" Bottom="103" PostBackValue="321" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="110" Top="84" Right="147" Bottom="104" PostBackValue="322" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="64" Top="60" Right="108" Bottom="82" PostBackValue="323" HotSpotMode="PostBack"/>
        <asp:RectangleHotSpot Left="22" Top="59" Right="66" Bottom="79" PostBackValue="324" HotSpotMode="PostBack"/>
    </asp:ImageMap>
    </div>
</asp:Content>
