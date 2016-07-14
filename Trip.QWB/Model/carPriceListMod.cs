using System;

namespace Trip.QWB.Model
{
    /// <summary>
    /// carPriceListMod:实体类(属性说明自动提取数据库字段的描述信息) 
    /// time:7.14
    /// author:lhx
    /// 接口 获取接送机订单价格 URL: get  /air_bookings/new
    /// 该接口只返回价格等部分信息,没什么用,我将直接把价格的值传到carlist类里存好,在前台一并展示.
    /// </summary>
    [Serializable]
    public class carPriceListMod
    {
        public carPriceListMod()
        { }
        #region Model
        private int _status;
        private string _msg;
        private decimal? _total_price;
        private decimal? _pickup_price;
        private decimal? _drop_off_price;
        private string _car_category_name;
        private string _driver_category_name;
        private int _carid;

        /// <summary>
        /// 状态
        /// </summary>
        public int status
        {
            set { _status = value; }
            get { return _status; }
        }
        /// <summary>
        /// 状态消息
        /// </summary>
        public string msg
        {
            set { _msg = value; }
            get { return _msg; }
        }
        /// <summary>
        /// 车型id
        /// </summary>
        public int carid
        {
            set { _carid = value; }
            get { return _carid; }
        }
        /// <summary>
        /// 总价格, RMB元
        /// </summary>
        public decimal? total_price
        {
            set { _total_price = value; }
            get { return _total_price; }
        }
        /// <summary>
        /// 接机价格, RMB元
        /// </summary>
        public decimal? pickup_price
        {
            set { _pickup_price = value; }
            get { return _pickup_price; }
        }
        /// <summary>
        /// 送机价格, RMB元
        /// </summary>
        public decimal? drop_off_price
        {
            set { _drop_off_price = value; }
            get { return _drop_off_price; }
        }
        /// <summary>
        /// 车型名称
        /// </summary>
        public string car_category_name
        {
            set { _car_category_name = value; }
            get { return _car_category_name; }
        }
        /// <summary>
        /// 导游类型名称
        /// </summary>
        public string driver_category_name
        {
            set { _driver_category_name = value; }
            get { return _driver_category_name; }
        }
        #endregion Model

    }
}