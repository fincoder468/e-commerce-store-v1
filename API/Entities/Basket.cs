using System;

namespace API.Entities;

public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; }
    public List<BasketItem> Items { get; set; } = [];

    public void AddItem(Product product, int quantity)
    {
        if (product == null)
            throw new ArgumentNullException(nameof(product));
        if (quantity <= 0)
            throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");
            
        var existingItem = FindItem(product.Id);
        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            Items.Add(new BasketItem
            {
                ProductId = product.Id,
                Product = product,
                Quantity = quantity
            });
        }
    }

    public void RemoveItem(int productId, int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");
            
        var existingItem = FindItem(productId);
        if (existingItem != null)
        {
            existingItem.Quantity -= quantity;
            if (existingItem.Quantity <= 0)
            {
                Items.Remove(existingItem);
            }
        }
    }

    private BasketItem? FindItem(int productId)
    {
        return Items.FirstOrDefault(i => i.ProductId == productId);
    }
}
