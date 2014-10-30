
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="showvideo.aspx.cs" Inherits="CCTVDisplay_showvideo" %>

<% 
    string [] urlandtype = get_cctv_url();
    string id = "";
    string url = "";
    string type = "";
    if (urlandtype != null)
    {
        url = urlandtype[0];
        type = urlandtype[1];
        id = Request.QueryString["id"];
    }
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html>
<head><title>CCTV <% Response.Write(id); %></title></head>

<body style="background-color:Black;">
<embed type="application/x-vlc-plugin"
         name="video1" id="video1"
         autoplay="yes" loop="yes" width="500" height="400"
         target="<% Response.Write(url); %>" pluginspage='http://www.videolan.org/vlc/'/>
</body>
</html>
