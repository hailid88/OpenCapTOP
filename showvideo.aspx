<%@ Page Language="C#"%>

<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
    <!-- flowplayer javascript component -->
    <script src="./testflowplayer_files/flowplayer-3.2.11.min.js"></script>
    <title>stream video</title>
  </head>
  <body bgcolor="#000000">
    <!-- widescreen container, 560x240 (clip dimensions) * 1.15, center splash -->
    <% 
       String x = Request.QueryString["vdo"];
       String tp = Request.QueryString["type"];
       if (tp.Equals("RTMP"))
       {
           StringBuilder cstext2 = new StringBuilder();
           cstext2.Append("<script> ");
           cstext2.Append("$f(\"wowza\", \"http://releases.flowplayer.org/swf/flowplayer-3.2.15.swf\", {  \n");
           cstext2.Append("clip: {  \n");
           cstext2.Append("        url: ");
           cstext2.Append("'" + x + "'");
           cstext2.Append("        ,scaling: 'fit', \n");
           cstext2.Append("        provider: 'hddn'   \n");
           cstext2.Append("    },  \n");
           cstext2.Append("    plugins: { \n");
           cstext2.Append("        hddn: {  \n");
           cstext2.Append("            url: \"flowplayer.rtmp-3.2.11.swf\",  \n");
           cstext2.Append("            netConnectionUrl: 'rtmp://10.70.32.38/rtplive' \n");
           cstext2.Append("        }  \n");
           cstext2.Append("    }, \n");
           cstext2.Append("    canvas: { \n");
           cstext2.Append("        backgroundGradient: 'none' \n");
           cstext2.Append("    }\n");
           cstext2.Append("});  </");
           cstext2.Append("script>");
           
           Response.Write("<div id=\"wowza\" style=\"width:400px;height:320px;margin:0 auto;text-align:center\"></div>");
           Response.Write(cstext2.ToString());
       }
       else if (tp.Equals("IMG"))
       {
           StringBuilder sb0 = new StringBuilder();
           Response.Write("<script>");
           Response.Write("var theDate = new Date();\n");
           Response.Write("var output=\"<img HEIGHT=320 WIDTH=400 SRC=\\\"http://jtao:tao123@10.40.62.166/axis-cgi/mjpg/video.cgi?camera=2&resolution=704x240&\";\n");
           Response.Write("output += theDate.getTime() + \"\\\">\";\n");
           Response.Write("document.write(output);\n");
           Response.Write("</script>\n");
       }
        %>
       
  </body>
</html>