jQuery(function() {
    var emptyCart = $('.cart-empty');
    var cartList = $('.cart-list');
    var cartListItems = $('.cart-list-items');

    cartList.css('display', 'none');

    addItemToCart = (product_id) => {
        // console.log("Product id is: "+product_id);
        CartJS.addItem(product_id, 1);

        openCartBar(); //this function defines in main.js

        setTimeout(() => {
            getCartList();
        }, 1000);
    }

    removeItemFromCart = (product_id) => {
        // console.log(product_id);
        CartJS.removeItemById(product_id);

        setTimeout(() => {
            getCartList();
        }, 1000);
    }

    getCartList = () => {
        jQuery.getJSON('/cart.js', function(cart) {
            // now have access to Shopify cart object
            // alert('There are now ' + cart.item_count + ' items in the cart.');
            if (cart.item_count) {
                emptyCart.css('display', 'none');
                cartList.css('display', 'unset');
            }else{
                cartList.css('display', 'none');
                emptyCart.css('display', 'unset');
            }

            var carItemDesigns = [];
            cart.items.forEach(item => {
                var itemDesign = `
                <div class="row mt-3">
                        <div class="col-1">
                            <i class="fa fa-times text-dark cursor-pointer" onclick="removeItemFromCart(${item.variant_id})"></i>
                        </div>
                        <div class="col-8">
                            <a class="text-decoration-none text-dark" href="/">${item.product_title} ${item.price}</a>
                        </div>
                    </div>
                `;

                carItemDesigns.push(itemDesign);
                // console.log(item);
            });

            cartListItems.html(carItemDesigns);
            // console.log(cart);
         } );
    }
});