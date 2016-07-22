using System;

namespace Trip.QWB.Model
{
    /// <summary>
    /// carPriceListMod:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class car_categories
    {
        public car_categories()
        { }
        #region Model
        private int _id;
        private string _name;
        private int? _max_seats;
        private int? _max_bag;
        private string _brand;
        private string _brand_img;
        private string _group;
        private decimal? _total_price;
        private decimal? _pickup_price;
        private decimal?[] _pickup_pricearr;
        private decimal? _drop_off_price;
        private string _driver_category_name;

        /// <summary>
        /// 车型id
        /// </summary>
        public int id
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 车型名称
        /// </summary>
        public string name
        {
            set { _name = value; }
            get { return _name; }
        }
        /// <summary>
        /// 最大座位数
        /// </summary>
        public int? max_seats
        {
            set { _max_seats = value; }
            get { return _max_seats; }
        }
        /// <summary>
        /// 最大行李数
        /// </summary>
        public int? max_bag
        {
            set { _max_bag = value; }
            get { return _max_bag; }
        }
        /// <summary>
        /// 示例品牌
        /// </summary>
        public string brand
        {
            set { _brand = value; }
            get { return _brand; }
        }
        /// <summary>
        /// 示例品牌图片
        /// </summary>
        public string brand_img
        {
            set { _brand_img = value; }
            get { return _brand_img; }
        }
        /// <summary>
        /// 车型组
        /// </summary>
        public string group
        {
            set { _group = value; }
            get { return _group; }
        }
        /// <summary>
        /// 总价格
        /// </summary>
        public decimal? total_price
        {
            set { _total_price = value; }
            get { return _total_price; }
        }
        /// <summary>
        /// 接机价格
        /// </summary>
        public decimal? pickup_price
        {
            set { _pickup_price = value; }
            get { return _pickup_price; }
        }
        public decimal?[] pickup_pricearr
        {
            set { _pickup_pricearr = value; }
            get { return _pickup_pricearr; }
        }
        /// <summary>
        /// 送机价格
        /// </summary>
        public decimal? drop_off_price
        {
            set { _drop_off_price = value; }
            get { return _drop_off_price; }
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