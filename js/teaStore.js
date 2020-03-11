$(document).ready(function () {
    setOnClickListeners();
    loadJSON();
    loadCart();
    renderCartItems();
    listShoppingCartItems();
    listOrderConfirmation();
})



var teaList = [];
var shoppingList = [];
var orderList = [];
console.log(shoppingList);




function loadJSON() {
    console.log("Loading JSON");
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../json/teaStore.json', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this);

            let data = this.responseText;
            //console.log(json);

            let json = JSON.parse(data);
            console.log(json);
            console.log(json.teas.length);

            localStorage.setItem("teaList", JSON.stringify(json));
            teaList = json.teas; // save all tea here

            json.teas.forEach(tea => {
                $("#tea-list").append(`<li class="list-group-item">
                 <div class="row">
                    <div class="col-3"><img src="` + tea.image + `" id="teaImage" class="img-fluid " alt="Black tea">
                    </div>
                    <div class="col-9">
                        <div class="row">
                            <div class="col-12">
                                <h4>` + tea.name + `</h4>
                                <p> This tea comes from ` + tea.country + ` | ` + tea.steepingTime + ` <br> Best before ` + tea.bestBefore + `</p> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <div class="price">
                                    <p> ` + tea.price + `</p>
                                </div>
                            </div>
                            <div class="col-4" index="plusMinus">
                                <button type="button" class="minus btn btn-success">-</button>
                                    <input class="teaAmountInput" type="text" teaAmount="`+ tea.id + `" id="input` + tea.id + `" size="1" value="1" min="1" name="number" readonly>
                                <button type="button" class="plus btn btn-success">+</button>
                            </div>
                            <div class="col-4">
                                <button type="button" class="addToCart btn btn-success btn-sm" teaID="`+ tea.id + `">add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>`)
            });
        }
    }
}

function setOnClickListeners() {

    $('#listProducts').on('click', '.addToCart', function (event) {
        renderCartItems()
        var teID = $(this).attr('teaID')
        var specificVal = $("#input" + teID).val();
        addToCart(teID, parseInt(specificVal));
        event.stopPropagation();
    });

    $('#listProducts').on('click', '.plus', function (event) {
        var oldValue = $(this).parent().find("input").val();
        var newVal = parseInt(oldValue) + 1;
        $(this).parent().find("input").val(newVal);
        event.stopPropagation();
    })

    $('#listProducts').on('click', '.minus', function (event) {
        var oldValue = $(this).parent().find("input").val();
        var newVal = parseInt(oldValue) - 1;
        if (oldValue > 1) {
            $(this).parent().find("input").val(newVal);
        }
        event.stopPropagation();
    })

    $('#cart-list').on('click', '.plus', function (event) {
        console.log('clicko');
        var cartItemId = $(this).attr('plusTeaID')
        console.log(cartItemId);
        incrementAmountByOne(cartItemId)
        event.stopPropagation();
    })

    $('#cart-list').on('click', '.minus', function (event) {
        console.log('clicko');
        var cartItemId = $(this).attr('minusTeaID')
        console.log(cartItemId);
        decrementFromAmountByOne(cartItemId)
        event.stopPropagation();
    })

    $('#cart-list').on('click', '.remove-from-cart', function (event) {
        var idCloseToButton = $(this).attr('teaId')
        removeCartItem(idCloseToButton);
        event.stopPropagation();
    })

    $('.clear-cart').click(function (event) {
        emptyCart();
        event.stopPropagation();
    })

    $('.checkout-button').click(function (event) {
        goToCheckout();
        event.stopPropagation();
    })

    $('.sendorder-button').click(function (event) {
        goToOrderConfirmation();
        event.stopPropagation();
    })

    $('.home-button').click(function (event) {
        goToHome();
        event.stopPropagation();
    })

}

function addToCart(id, amount) {
    if (!existsInArray(shoppingList, id)) {
        let teaProduct = { id, amount };
        shoppingList.push(teaProduct);
    } else {
        addToAmount(id, amount)
    }
    saveCart();
    saveOrder();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem("toBuyList", JSON.stringify(shoppingList));
}

function loadCart() {
    if (localStorage.getItem("toBuyList") !== null) {
        shoppingList = JSON.parse(localStorage.getItem("toBuyList"));
    }
}

function emptyCart() {
    shoppingList = [];
    saveCart();
    renderCartItems();
}

function existsInArray(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return true;
        }
    }
    return false;
}

function addToAmount(id, amount) {
    for (var i in shoppingList) {
        if (shoppingList[i].id == id) {
            shoppingList[i].amount = parseInt(shoppingList[i].amount) + parseInt(amount)
            break;
        }
    }
}

function decrementFromAmountByOne(id) {
    for (var i in shoppingList) {
        if (shoppingList[i].id == id) {
            shoppingList[i].amount = parseInt(shoppingList[i].amount) - 1;
            break;
        }
    }
    saveCart();
    renderCartItems();
}

function incrementAmountByOne(id) {
    for (var i in shoppingList) {
        if (shoppingList[i].id == id) {
            shoppingList[i].amount = parseInt(shoppingList[i].amount) + 1;
        }
    }
    saveCart();
       saveOrder(orderList);
    renderCartItems();
}

function renderCartItems() {
    $("#cart-list").empty()
    loadCart();


    loadTeaList();
    console.log(teaList);
    var innerTeas = Object.values(teaList);
    console.log(innerTeas);
    var innerTeas2 = Object.values(innerTeas);
    console.log(innerTeas2[0]);

    for (teas in innerTeas) {
        console.log(teas);
      }
        
    shoppingList.forEach(tea => {



        $("#cart-list").append(`<li class="list-group-item">` + "TeaID: " + tea.id +`"
        <button type="button" class="minus btn btn-success" minusTeaID="`+ tea.id +`">-</button>
        `+ tea.amount +`
        <button type="button" class="plus btn btn-success" plusTeaID="`+ tea.id +`">+</button>
        <button type="button" class="remove-from-cart btn btn-warning btn-circle" teaID="`+ tea.id +`"><i class="fa fa-times"></i>
        </li>`)
    });
};


function removeCartItem(id) {
    for (var i in shoppingList) {
        if (shoppingList[i].id == id) {
            shoppingList.splice(i, 1)
            break;
        }
    }
    saveCart();
    renderCartItems();
}


function listShoppingCartItems() {

    const formatter = new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK'
      })

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../json/teaStore.json', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {


            var teaName = "undefined";

            $("#checkoutItems").append(`<br> <li class=" list-group-item">
            <div class="row">
            <div class="col-3"><h5>Item</h5></div>
            <div class="col-3"><h5>Amount</h5></div>
            <div class="col-3"><h5>Subtotal</h5></div>
            </div>
            </li>`
            );
            var totalPrice = 0;


            $.each(shoppingList, function(index, value){
                var count = 0;
                var teaID = value.id;
                console.log(teaID);
                var pricePerTea = 0;
        
                teaList.forEach(tea => {
                    if(tea.id == teaID){
                        teaName = tea.name;
                        pricePerTea = tea.price * value.amount;
                        totalPrice += tea.price * value.amount;
                    }
                });
        
                $("#checkoutItems").append(` <li class=" list-group-item">
                    <div class="row">
                    <div class="col-3"><p>` + teaName + `</p></div>
                    <div class="col-3"><p>` + value.amount + ` hg </p></div>
                    <div class="col-3"><p>` + formatter.format(pricePerTea) + `</p></div>
                    </div>
                    </li>`
                    );

                    count ++;
            })

            $("#checkoutItems").append(` <li class=" list-group-item">
            <div class="row">
            <div class="col-3"><p> </p></div>
            <div class="col-3"><p><b>Total: </b></p></div>
            <div class="col-3"><p>` + formatter.format(totalPrice) + `</p></div>
            </div>
            </li>`
            );
    

            
        }
    }





}

function listOrderConfirmation() {

    const formatter = new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK'
      })

      loadOrder();
      console.log(orderList);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../json/teaStore.json', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var teaName = "undefined";

            $("#orderConfirmationItems").append(`<br> <li class=" list-group-item">
            <div class="row">
            <div class="col-2"></div>
            <div class="col-3"><h5>Item</h5></div>
            <div class="col-3"><h5>Amount</h5></div>
            <div class="col-3"><h5>Subtotal</h5></div>
            </div>
            </li>`
            );
            var totalPrice = 0;


            $.each(orderList, function(index, value){
                var count = 0;
                var teaID = value.id;
                console.log(teaID);
                var pricePerTea = 0;
                var teaImage;
        
                teaList.forEach(tea => {
                    if(tea.id == teaID){
                        teaName = tea.name;
                        teaImage = tea.image;
                        pricePerTea = tea.price * value.amount;
                        totalPrice += tea.price * value.amount;
                    }
                });
        
                $("#orderConfirmationItems").append(` <li class=" list-group-item">
                    <div class="row">
                    <div class="col-2"><img src="` + teaImage + `" id="teaImage" class="img-fluid"></div>
                    <div class="col-3"><p>` + teaName + `</p></div>
                    <div class="col-3"><p>` + value.amount + ` hg </p></div>
                    <div class="col-3"><p>` + formatter.format(pricePerTea) + `</p></div>
                    </div>
                    </li>`
                    );

                    count ++;
            })

            $("#orderConfirmationItems").append(` <li class=" list-group-item">
            <div class="row">
            <div class="col-2"><p> </p></div>
            <div class="col-3"><p> </p></div>
            <div class="col-3"><p><b>Total: </b></p></div>
            <div class="col-3"><p>` + formatter.format(totalPrice) + `</p></div>
            </div>
            </li>`
            );
    
            
            
        }
    }


}

function saveOrder() {
    localStorage.setItem("orderList", JSON.stringify(shoppingList));
}

function loadOrder() {
    if (localStorage.getItem("orderList") !== null) {
        orderList = JSON.parse(localStorage.getItem("orderList"));
    }
}

function loadTeaList() {
    if (localStorage.getItem("teaList") !== null) {
        teaList = JSON.parse(localStorage.getItem("teaList"));
    }
}

function goToCheckout() {
    location.href="checkout.html"
}

function goToHome() {
    location.href="index.html"
}

function goToOrderConfirmation() {
    console.log(orderList);
    emptyCart();
    loadOrder();
    location.href="orderconfirmation.html"
}
