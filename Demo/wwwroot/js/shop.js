var Meal = function(title, desc, price, available, imageUrl){
    var self = this;
    self.title = title;
    self.desc = desc;
    self.price = price;
    self.available = ko.observable(available);
    self.imageUrl = imageUrl;
}

var Meals = [
    {title: "The Perfect Sandwich, A Real NYC Classic", desc: "", price: 155, available: 5, imageUrl: "https://www.w3schools.com/w3images/sandwich.jpg"},
    {title: "Let Me Tell You About This Steak", desc: "", price: 1380, available: 1, imageUrl: "https://www.w3schools.com/w3images/steak.jpg"},
    {title: "Cherries, interrupted", desc: "", price: 499, available: 2, imageUrl: "http://www.w3schools.com/w3images/cherries.jpg"},
    {title: "Once Again, Robust Wine and Vegetable Pasta", desc: "", price: 790, available: 3, imageUrl: "http://www.w3schools.com/w3images/wine.jpg"}
]

var ShopViewModel = function(meals){
    self.showCart = ko.observable(false);
    self.meals = ko.observableArray(ko.utils.arrayMap(meals, function(meal) {
        return new Meal(meal.title, meal.desc, meal.price, meal.available, meal.imageUrl);
    }));
    self.cart = ko.observableArray([]);         //Array of Meal
    self.addToCart = function(cart){
        if(cart.available() > 0)
        {
            self.cart.push  (cart);
            cart.available(cart.available() - 1);
        }
    }
}

ko.applyBindings(new ShopViewModel(Meals));