using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SiteMaster : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
            
        if (HttpContext.Current.User.IsInRole("sysadmin") || HttpContext.Current.User.IsInRole("manager") || HttpContext.Current.User.IsInRole("patrol") || HttpContext.Current.User.IsInRole("operator"))
        {
            NavigationMenu.Items.Add(new MenuItem("AVL", "AVL", null, "~/AVL.aspx"));
            NavigationMenu.Items.Add(new MenuItem("Incidents", "Incidents", null, "~/Incidents.aspx"));
            NavigationMenu.Items.Add(new MenuItem("CCTV", "CCTV", null, "~/CCTV.aspx"));
            NavigationMenu.Items.Add(new MenuItem("SNAPs", "SNAPs", null, "~/SNAPs.aspx"));
            NavigationMenu.Items.Add(new MenuItem("PCS", "PCS", null, "~/PCS.aspx"));
            NavigationMenu.Items.Add(new MenuItem("3rd.St Tunnel CCTV", null, null, "~/ThirdStTunnel.aspx"));
            NavigationMenu.Items.Add(new MenuItem("About", "About", null, "~/About.aspx"));
        }
        else
        {
            NavigationMenu.Items.Add(new MenuItem("Incidents", "Incidents", null, "~/Incidents.aspx"));
            NavigationMenu.Items.Add(new MenuItem("CCTV", "CCTV", null, "~/CCTV.aspx"));
            NavigationMenu.Items.Add(new MenuItem("SNAPs", "SNAPs", null, "~/SNAPs.aspx"));
            NavigationMenu.Items.Add(new MenuItem("PCS", "PCS", null, "~/PCS.aspx"));
            NavigationMenu.Items.Add(new MenuItem("3rd.St Tunnel CCTV", null, null, "~/ThirdStTunnel.aspx"));
            NavigationMenu.Items.Add(new MenuItem("About", "About", null, "~/About.aspx"));
        }
        if (HttpContext.Current.User.IsInRole("sysadmin"))
        {
            NavigationMenu.Items.Add(new MenuItem("Management", "Management", null, "~/AccountManagement.aspx"));
        }
    }
    protected void LoginStatus1_LoggingOut(object sender, LoginCancelEventArgs e)
    {

    }
}
