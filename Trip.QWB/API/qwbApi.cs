using Trip.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Trip.QWB.Model;
using System.Web.Script.Serialization;
using Trip.Api.Models.QuWanBei;
using Trip.QWB.Common;
using System.Web.Security;

namespace Trip.QWB
{
    /// <summary>
    /// 趣玩呗接口
    /// </summary>
    public class qwbApi
    {
        private static string hhlserver = System.Configuration.ConfigurationManager.AppSettings["hhlserver"];
        private static string adndoairserver = System.Configuration.ConfigurationManager.AppSettings["adndoairserver"];
        private static string adndocarserver = System.Configuration.ConfigurationManager.AppSettings["adndocarserver"];
        private static string testuser = System.Configuration.ConfigurationManager.AppSettings["testuser"];

        /// <summary>
        /// 获取城市列表
        /// </summary>
        public static string getCitiesList()
        {
            string url = hhlserver;
            url += "/cities?" + testuser + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取车型列表
        /// </summary>
        public static string getCarsList(int locationid)
        {
            string url = hhlserver;
            url += "/car_categories?" + testuser + "&location_id=" + locationid + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }


        //以下接送机--------------------------------------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// 获取机场列表
        /// </summary>
        public static string getairports(int city_id)
        {
            string url = hhlserver;
            url += "/airports?" + testuser + "&location_id=" + city_id + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 接送地址查询自动补全
        /// </summary>
        public static string getAirbookingsAddrs(string airport_code, string query)
        {
            string url = hhlserver;
            url += "/air_bookings/addrs?" + testuser + "&airport_code=" + airport_code + "&query=" + query + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取接送机价格, carlist 将显示包含价格的全部车型信息.
        /// </summary>
        public static string getair_bookingsnew(string car_category_id, string pickup_airport_code, string pickup_flight, string pickup_time, string pickup_addr, int locationid)
        {
            string strparam2 = "";
            strparam2 += "&pickup_airport_code=" + pickup_airport_code + "";
            strparam2 += "&pickup_flight=" + pickup_flight + "";
            strparam2 += "&pickup_time=" + pickup_time + "";
            strparam2 += "&pickup_addr=" + pickup_addr + "";

            var response = BuildResponses.buildCarlistResponse(car_category_id, locationid, strparam2, "/air_bookings/new");
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 创建接送机订单(拓谷)
        /// </summary>
        public static string createordertg(string json)
        {
            //var pickupObject = JsonConvert.DeserializeObject<PlaceOrderRequest>(json);
            //pickupObject.shop_id= FormsAuthentication.Decrypt(guideId.shop_id);
            string url = adndoairserver;
            var response = HttpUtil.Post(json, url, contentType: "application/json");
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }
        //以下标准车--------------------------------------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// 获取标准车价格(列表),单地多地合并写,与精确价显示的区别在于会给出部分字段默认值,显示价格多少起.
        /// </summary>
        public static string getbookingsnew(string car_category_id, string pickup_time1, string pickup_time2, string locationid)
        {
            string strparam2 = "";
            System.TimeSpan ts;
            int days;
            string[] _locationidlist = locationid.Split('|');
            //pickup_time2有值是单地用车,pickup_time2无值是多地用车,因为把日期全存入pickup_time1了.
            if (pickup_time2 == "")
            {
                string[] _pickup_timelist = pickup_time1.Split('|');

                strparam2 += "&from_date=" + _pickup_timelist[0] + "";
                strparam2 += "&to_date=" + _pickup_timelist[_pickup_timelist.Length - 1] + "";
                strparam2 += "&from_location_id=" + _locationidlist[0] + "";
                for (int i = 0; i < _pickup_timelist.Length; i++)
                {
                    //第一个为1天,剩下的天数按相减的来算.
                    if (i == 0)
                    {
                        days = 0;
                    }
                    else if (i == 1)
                    {
                        DateTime t1 = DateTime.Parse(_pickup_timelist[i - 1]);
                        DateTime t2 = DateTime.Parse(_pickup_timelist[i]);
                        ts = t2 - t1;
                        days = ts.Days + 1;
                    }
                    else
                    {
                        DateTime t1 = DateTime.Parse(_pickup_timelist[i - 1]);
                        DateTime t2 = DateTime.Parse(_pickup_timelist[i]);
                        ts = t2 - t1;
                        days = ts.Days;
                    }
                    strparam2 += "&travel_items[][days]=" + days + "";
                    strparam2 += "&travel_items[][location_id]=" + _locationidlist[i] + "";
                }
            }
            else {
                DateTime t1 = DateTime.Parse(pickup_time1);
                DateTime t2 = DateTime.Parse(pickup_time2);
                ts = t2 - t1;
                days = ts.Days + 1;

                strparam2 += "&from_date=" + pickup_time1 + "";
                strparam2 += "&to_date=" + pickup_time2 + "";
                strparam2 += "&travel_items[][days]=" + days + "";
                strparam2 += "&travel_items[][location_id]=" + locationid + "";
                strparam2 += "&from_location_id=" + locationid + "";
            }

            strparam2 += "&driver_category_id=" + 1 + "";
            strparam2 += "&adults=" + 1 + "";

            var response = BuildResponses.buildCarlistResponse(car_category_id, Convert.ToInt32(_locationidlist[0]), strparam2, "/bookings/new");
            if (response != null && response != "{\"list\": null}")
            {
                return response;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 获取标准车价格(服务--精确价),单地多地合并写
        /// </summary>
        public static string getbookingsnewP1(string from_date, string from_location_id, string to_date, int car_category_id, int driver_category_id, int adults, int kids, int[] kids_age)
        {
            string strparam2 = "";
            System.TimeSpan ts;
            int days;
            //如果到达时间是空则为多地用车.
            if (to_date == "")
            {
                string[] _locationidlist = from_location_id.Split('|');

                string[] _from_datelist = from_date.Split('|');
                strparam2 += "&from_date=" + _from_datelist[0] + "";
                strparam2 += "&from_location_id=" + _locationidlist[0] + "";
                strparam2 += "&to_date=" + _from_datelist[_from_datelist.Length - 1] + "";

                for (int i = 0; i < _from_datelist.Length; i++)
                {
                    //第一个为1天,剩下的天数按相减的来算.
                    if (i == 0)
                    {
                        days = 1;
                    }
                    else {
                        DateTime t1 = DateTime.Parse(_from_datelist[i - 1]);
                        DateTime t2 = DateTime.Parse(_from_datelist[i]);
                        ts = t2 - t1;
                        days = ts.Days;
                    }
                    strparam2 += "&travel_items[][days]=" + days + "";
                    strparam2 += "&travel_items[][location_id]=" + _locationidlist[i] + "";
                }

            }
            //否则为单地
            else
            {
                DateTime t1 = DateTime.Parse(from_date);
                DateTime t2 = DateTime.Parse(to_date);
                ts = t2 - t1;
                days = ts.Days + 1;

                strparam2 += "&from_date=" + from_date + "";
                strparam2 += "&from_location_id=" + from_location_id + "";
                strparam2 += "&to_date=" + to_date + "";
                strparam2 += "&travel_items[][days]=" + days + "";
                strparam2 += "&travel_items[][location_id]=" + from_location_id + "";
            }

            strparam2 += "&car_category_id=" + car_category_id + "";
            strparam2 += "&driver_category_id=" + driver_category_id + "";
            strparam2 += "&adults=" + adults + "";
            if (kids > 0)
            {
                strparam2 += "&kids=" + kids + "";
                for (int i = 0; i < kids; i++)
                {
                    strparam2 += "&kids_age[]=" + 10 + "";
                }
            }

            string url = hhlserver;
            url += "/bookings/new?" + testuser + "" + strparam2 + "";
            var response = HttpUtil.Get(url);

            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 创建标准用车订单(一地用车拓谷)
        /// </summary>
        public static string createcarordertg(string json)//, int shopid, int guideId, int cusid
        {
            //var pickupObject = JsonConvert.DeserializeObject<PlaceOrderRequest>(json);
            //json = ConvertJson.ToJSON(pickupObject);
            string url = adndocarserver;
            var response = HttpUtil.Post(json, url, contentType: "application/json");
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取城市间距离
        /// </summary>
        public static string getdistances(int from_location_id, int to_location_id)
        {
            string url = hhlserver;
            url += "/distances?" + testuser + "&from_location_id=" + from_location_id + "&to_location_id=" + to_location_id + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取获取导游类型列表
        /// </summary>
        public static string getdriver_categories()
        {
            string url = hhlserver;
            url += "/driver_categories?" + testuser + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

    }
}