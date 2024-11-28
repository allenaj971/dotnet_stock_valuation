using Models.Object;

namespace Models.Dtos.Stock
{
    public class UpdateStockDto
    {
        public string? Name { get; set; } = string.Empty;
        public string? Ticker { get; set; } = string.Empty;
    }
}