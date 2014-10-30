using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ThirdStTunnel : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
    protected void imap_Click(object sender, ImageMapEventArgs e)
    {
        string script = string.Format("window.open(\"/CCTVDisplay/showvideo.aspx?set={0}&id={1}\")", "thirdsttunnel", e.PostBackValue);
        string url = string.Format("CCTVDisplay/showvideo.aspx?set={0}&id={1}", "thirdsttunnel", e.PostBackValue);
        ScriptManager.RegisterStartupScript(this, typeof(string), "OPEN_WINDOW", "var Mleft = (screen.width/2)-(760/2);var Mtop = (screen.height/2)-(700/2);window.open( '" + url + "', null, 'height=420,width=520,status=no,location=no,resizable=0,toolbar=no,scrollbars=no,menubar=no,location=no,top=\'+Mtop+\', left=\'+Mleft+\'' );", true);
        //Response.Redirect(url);
    }
}