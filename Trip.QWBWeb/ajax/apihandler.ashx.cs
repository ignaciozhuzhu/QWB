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

        /// <summary>
        /// 获取城市列表
        /// </summary>
        public void getcitieslist()
        {
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getCitiesList());
        }
        /// <summary>
        /// 获取车型列表
        /// </summary>
        public void getcarslist()
        {
            int locationid = 0;
            try
            {
                locationid = Convert.ToInt32(HttpContext.Current.Request["locationid"]);
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getCarsList(locationid));
        }

        /// <summary>
        /// 获取机场列表
        /// </summary>
        public void getairports()
        {
            int city_id = 0;
            try
            {
                city_id = Convert.ToInt32(HttpContext.Current.Request["city_id"]);
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getairports(city_id));
        }

        /// <summary>
        /// 接送地址查询自动补全
        /// </summary>
        public void getairbookingsaddrs()
        {
            string airport_code = "";
            string query = "";
            try
            {
                airport_code = HttpContext.Current.Request["airport_code"];
                query = HttpContext.Current.Request["query"];
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getAirbookingsAddrs(airport_code, query));
        }
        /// <summary>
        /// 获取接送机价格
        /// </summary>
        public void getair_bookingsnew()
        {
            string car_category_id = "";
            string pickup_airport_code = "";
            string pickup_flight = "";
            string pickup_time = "";
            string pickup_addr = "";
            int locationid = 0;
            try
            {
                car_category_id = HttpContext.Current.Request["car_category_id"];
                pickup_airport_code = HttpContext.Current.Request["pickup_airport_code"];
                pickup_flight = HttpContext.Current.Request["pickup_flight"];
                pickup_time = HttpContext.Current.Request["pickup_time"];
                pickup_addr = HttpContext.Current.Request["pickup_addr"];
                locationid = Convert.ToInt32(HttpContext.Current.Request["locationid"]);
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getair_bookingsnew(car_category_id, pickup_airport_code, pickup_flight, pickup_time, pickup_addr, locationid));
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