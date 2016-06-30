using System;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.SessionState;
using Trip.QWB;

namespace Trip.QWBWeb.ajax
{
    /// <summary>
    /// apihandler 的摘要说明
    /// </summary>
    public class apihandler : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                Type type = this.GetType();
                string fn = context.Request["fn"].ToString();
                MethodInfo method = type.GetMethod(fn, BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic);
                method.Invoke(this, null);
            }
            catch (Exception e)
            {
                HttpContext.Current.Response.Write("接口出错!");
            }
        }

        private void ResponseWriteEnd(HttpContext context, string msg)
        {
            context.Response.Write(msg);
            context.Response.End();
        }

        public void getcitieslist()
        {
            HttpContext.Current.Response.Write(QWB.API.qwbApi.getCitiesList());
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}