using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Models.Object;

[PrimaryKey(nameof(Id))]
public class StockModel
{
    public string Id { get; set; } = string.Empty;
    public required string Name { get; set; }
    public required string Ticker { get; set; }
    public List<DCFValuationModel> DCFValuationModels { get; set; } = new List<DCFValuationModel>();
    public List<DDMValuationModel> DDMValuationModels { get; set; } = new List<DDMValuationModel>();
}
