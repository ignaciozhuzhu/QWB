using Trip.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Trip.QWB.API
{
    /// <summary>
    /// 趣玩呗接口
    /// </summary>
    public class qwbApi
    {
        private static string hhlserver = System.Configuration.ConfigurationManager.AppSettings["hhlserver"];

        /// <summary>
        /// 获取城市列表
        /// </summary>
        public static string getCitiesList()
        {
            string url = hhlserver;
            url += "/cities?key=qwb_1467082083&sign=3b1b7113028cc5eeefa5cc61f4872827";
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