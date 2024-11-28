using Models.Object;

namespace Models.Dtos.DDMValuationModelDto
{
    public class UpdateDDMValuationModelDto
    {
        public string Name { get; set; } = string.Empty;
        public double? Dividend { get; set; }
        public float? RateReturn { get; set; }
        public float? Growth { get; set; }
    }
}