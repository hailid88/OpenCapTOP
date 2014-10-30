using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

public partial class CCTVDisplay_showvideo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       
    }
    protected string [] get_cctv_url()
    {
        XmlDocument xdoc = new XmlDocument();
        string abspath = Server.MapPath("~/CCTVDisplay/CCTVmap.xml");
        string xmlstring = System.IO.File.ReadAllText(abspath);
        xdoc.LoadXml(xmlstring);

        string path = string.Format("/doc/cctvset[@id='{0}']/cam[@id='{1}']", Request.QueryString["set"], Request.QueryString["id"]);
        var node = xdoc.SelectSingleNode(path);
        if (node == null)
        {
            return null;
        }
        else
        {
            return new string [] {node.Attributes["url"].Value, node.Attributes["type"].Value};
        }
    }
}