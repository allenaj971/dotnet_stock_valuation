using Models.Object;

namespace Models.Dtos.Stock
{
    public class CreateStockDto
    {
        public required string Name { get; set; }
        public required string Ticker { get; set; }
    }
}