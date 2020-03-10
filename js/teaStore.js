$(document).ready(function () {
    setOnClickListeners();
    loadJSON();
    loadCart();
    createCartItem()
})



var teaList = [];
var shoppingList = [];
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
                            <div class="col-4">
                                <button type="button" onclick ="plus(`+ tea.id + `)" class="btn btn-success">+</button>
                                <input class="teaAmountInput" type="text" id="input`+ tea.id + `" size="1" value="1" min="1" name="number" readonly>
                                <button type="button" onclick ="minus(`+ tea.id + `)" class="btn btn-success">-</button>
                            </div>
                            <div class="col-4">
                                <button type="button" onclick ="createCartItem()" class="addToCart btn btn-success btn-sm" teaID="`+ tea.id + `">add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>`)
            });
        }
    }
}







//     $('#cart-items').append(`
//         <img class="img-responsive" src="http://placehold.it/120x80" alt="prewiew" width="120" height="80">
//         </div>
//     <div class="col-10 col-sm-10 text-md-right col-md-6">
//     <h4 class="product-name"><strong>Product Name</strong></h4>
//     <h4>
//         <small>200:-/hg</small>
//     </h4>
// </div>
// <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row cen">
//     <div class="col-5 col-sm-5 col-md-6">
//         <p><strong>25<span class="text-muted">x</span></strong></p>
//     </div>
//     <div class="col-4 col-sm-4 col-md-4">
//         <div class="quantity">
//             <input type="button" value="+" class="plus">
//             <input type="number" step="1" max="99" min="1" value="1" title="Qty"
//                 class="qty">
//             <!--size 4?-->
//             <input type="button" value="-" class="minus">
//         </div>
//     </div>`)


function plus(id) {
    let value = document.getElementById("input" + id).value;
    document.getElementById("input" + id).value = +value + 1;
}


function minus(id) {
    let value = document.getElementById("input" + id).value;
    if (value > 0) {
        document.getElementById("input" + id).value = +value - 1;
    }
}

function setOnClickListeners() {
    $('#listProducts').on('click', '.addToCart', function (event) {
        var teID = $(this).attr('teaID')
        var specificVal = $("#input" + teID).val();
        addToCart(teID, parseInt(specificVal));
        event.stopPropagation();
    });
}

function addToCart(id, amount) {
    if (!existsInArray(shoppingList, id)) {
        let teaProduct = { id, amount };
        shoppingList.push(teaProduct);
        
    } else {
        addToAmount(id, amount)
    }
    console.log(shoppingList);
    saveCart(shoppingList);
}

function saveCart() {
    localStorage.setItem("toBuyList", JSON.stringify(shoppingList));
}

function saveCart() {
    localStorage.setItem("toBuyList", JSON.stringify(shoppingList));
}

function loadCart() {
    if (localStorage.getItem("toBuyList") !== null) {
        shoppingList = JSON.parse(localStorage.getItem("toBuyList"));
    }
}

function updateAndClearCart(){


}

function emptyCart() {
    shoppingList = [];
    saveCart();
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

function createCartItem() {
    $("#cart-list").empty()
    loadCart();
    shoppingList.forEach(tea => {
        console.log(tea);
        $("#cart-list").append(`<li class="list-group-item">` + "TeaID: " + tea.id + " Amount: " + tea.amount + `</li>`)
    });
    
}


