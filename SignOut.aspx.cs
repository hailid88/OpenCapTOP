using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SignOut : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["userName"] != null)
            Session["userName"] = null;

        if (Session["password"] != null)
            Session["password"] = null;

        if (Session["loginSuccess"] != null)
            Session["loginSuccess"] = null;

        Response.Redirect("Login.aspx");
    }
}