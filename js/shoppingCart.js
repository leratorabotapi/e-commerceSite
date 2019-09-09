// Hello World

//  confirm order -- random code genarator + alerts
function orderRef() {
    let finalTotal = localStorage.getItem('total');
    alert("Thank you for shopping with us, " + "your Total is: " + "R" + finalTotal);
    alert("Your Reference code is: " + Math.random().toString(36).substr(2));
    //localStorage.clear();
};

// Shopping Cart functions

let shoppingCart = (function () {



    // Dev methods and properties
    let cart = [];

    function Item(name, price, count) {
        this.name = name
        this.price = price
        this.count = count
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();



    // User methods and properties
    let obj = {};

    obj.addItemToCart = function (name, price, count) {
        for (let i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }

        console.log("addItemToCart:", name, price, count);

        let item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    };

    obj.animate = function () { // MY JQUERY ANIMATION
        $('#five').click(function () {
            var buttonId = $(this).attr('id');
            $('#modal-container').removeAttr('class').addClass(buttonId);
            $('body').addClass('modal-active');
        })

        $('#modal-container').click(function () {
            $(this).addClass('out');
            $('body').removeClass('modal-active');
        });
    };

    obj.dropdown = function () { // MY DROPDOWN FUNCTION
        $(".menu-btn").click(function () {
            var val = $(this).attr('id');
            if (val == 1) {
                $(".atribute").hide();
                $(this).attr('id', '0');
            } else {
                $(".atribute").show();
                $(this).attr('id', '1');
            }
        });

        //Mouse click on setting button and ul list
        $(".atribute, .button").mouseup(function () {
            return false;
        });

        //Document Click
        $(document).mouseup(function () {
            $(".atribute").hide();
            $(".button").attr('id', '0');
        });
    }


    // ***************************************************

    obj.setCountForItem = function (name, count) {
        for (let i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (name) { // Removes one item
        for (let i in cart) {
            if (cart[i].name === name) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (name) { // removes all item name
        for (let i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    };

    obj.countCart = function () { // -> return total count
        let totalCount = 0;
        for (let i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function () { // -> return total cost
        let totalCost = 0;
        for (let i in cart) {
            totalCost += cart[i].price * cart[i].count;
            localStorage.setItem('total', totalCost);
        }
        return totalCost.toFixed(2);
    };

    obj.subTotal = function () { // -> return subtotal cost
        let subTotal = 0;
        for (let i in cart) {
            subTotal += cart[i].price * cart[i].count;
        }
        let calSubtotal = subTotal;
        let subTotalcost = (calSubtotal) * 0.85;
        localStorage.setItem('subtotalAmount', subTotal);
        return subTotalcost.toFixed(2);
    };

    obj.totalVat = function () { // -> return total vat
        let totalVat = 0;
        for (let i in cart) {
            totalVat += cart[i].price * cart[i].count;
        }
        let calVat = totalVat;
        let vatTotal = (calVat) * 0.15;
        localStorage.setItem('vatAmount', totalVat);
        return vatTotal.toFixed(2);
    };

    obj.dlvrychrge = function () { // delivery options
        $('input[type=radio][name=delStatus]').on('change', function () {
            switch ($(this).val()) {
                case 'collection':
                    $("#deliveryOptions").hide(100);
                    break;
                case 'delivery':
                    $("#deliveryOptions").show(100);
                    // Discount for Delivery Happens here
                    break;
            }
        });
    };

    obj.coupon = function () { // coupon function
        $('#discount').click(function () {
            if ($("input:text[name='promo-code']").val() == "DISCOUNT10") {
                let originaltotal = localStorage.getItem('total');
                let promoSum = (originaltotal * 0.9).toFixed(2);
                let promoVat = (originaltotal * 0.15);
                localStorage.setItem('vatAmount', promoVat);
                localStorage.setItem('total', promoSum);
                document.getElementById('total-vat').innerHTML = promoVat.toFixed(2);
                console.log(promoVat);
                document.getElementById('total-cart').innerHTML = promoSum;
                document.getElementById('check').innerHTML = "Coupon applied to total";

              /*  let discount1 = 0;
                for (let i in cart) {
                    discount1 += cart[i].price * cart[i].count;
                }
                let discount2 = (discount1 * 0.1)
                localStorage.setItem('total', discount2); */

                // A function with chained effects + Animation Effects
                $("#five").html("Coupon Applied!").delay(1000).animate({
                    height: "0px",
                    padding: "0px"
                }, 100).delay(500).queue(function () {
                    $(this).hide(1500).dequeue();
                })
            } else {
                alert("INVALID PROMO CODE");
            }
        });
    };

    obj.listCart = function () { // -> array of Items
        let cartCopy = [];
        console.log("Listing cart");
        console.log(cart);
        for (let i in cart) {
            console.log(i);
            let item = cart[i];
            let itemCopy = {};
            for (let p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();