using Models.Object;
using Models.Dtos.Stock;

namespace Models.Dtos.Converters
{
    public static class StockConverters
    {
        public static StockModel ToStockFromCreateStock(this CreateStockDto csd)
        {
            return new StockModel
            {
                Id = Guid.NewGuid().ToString(),
                Name = csd.Name,
                Ticker = csd.Ticker
            };
        }

        public static StockModel ReadStockFromStockModel(this StockModel csd)
        {
            return new StockModel
            {
                Id = csd.Id,
                Name = csd.Name,
                Ticker = csd.Ticker
            };
        }

        public static StockModel ToStockFromUpdateStock(this UpdateStockDto usd)
        {
            return new StockModel
            {
                Name = usd.Name,
                Ticker = usd.Ticker
            };
        }
    }
}