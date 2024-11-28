using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Mvc;
using Models.Object;
using Models.Dtos.Converters;
using Models.Dtos.Stock;
using Microsoft.EntityFrameworkCore.Internal;

namespace Controllers
{
    [Route("api/stocks")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public StocksController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getAllStocks()
        {
            if (dbContext.Stocks.ToList().Count != 0)
            {
                return Ok(dbContext.Stocks.ToList());
            }
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult getStockById([FromRoute] string id)
        {
            var res = dbContext.Stocks.ToList().FirstOrDefault(x => x.Id == id);
            if (res == null) return NotFound("id not found");
            return Ok(res);
        }
        [HttpPost]
        public IActionResult newStock([FromBody] CreateStockDto csd)
        {
            Console.WriteLine(csd);
            StockModel sm = csd.ToStockFromCreateStock();
            Console.WriteLine(sm.Name);
            dbContext.Stocks.Add(sm);
            dbContext.SaveChanges();
            return Ok(sm);
        }
        [HttpPut("{id}")]
        public IActionResult updateStock([FromRoute] string id, [FromBody] UpdateStockDto usd)
        {
            StockModel sm = usd.ToStockFromUpdateStock();
            var res = dbContext.Stocks.FirstOrDefault(x => x.Id == id);
            if (res != null)
            {
                res.Name = sm.Name == null ? res.Name : sm.Name;
                res.Ticker = sm.Ticker == null ? res.Ticker : sm.Ticker;

                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound("id not found");
        }
        [HttpDelete("{id}")]
        public IActionResult removeStock([FromRoute] string id)
        {
            var res = dbContext.Stocks.FirstOrDefault(x => x.Id == id);
            if (res != null)
            {
                dbContext.Stocks.Remove(res);
                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound("id not found");
        }
    }
}