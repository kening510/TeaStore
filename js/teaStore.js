$(document).ready(function () {
    setOnClickListeners();
    loadJSON();
})

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
                                <input class="teaAmountInput" type="text" id="input`+ tea.id + `" size="1" value="1" name="number">
                                <button type="button" onclick ="minus(`+ tea.id + `)" class="btn btn-success">-</button>
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
    $('#listProducts').on('click', '.addToCart', function () {
        var teID = $(this).attr('teaID')
        var specificVal = $("#input"+teID).val()
        alert("ID: " + teID + " amount: " + specificVal);
    });
}
