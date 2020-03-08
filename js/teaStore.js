$(document).ready(function () {
    loadJSON();
})

function loadJSON() {
    console.log("Loading JSON");

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../json/teaStore.json', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this);   // there is no resonpseJSON

            let data = this.responseText;
            //console.log(json);


            let json = JSON.parse(data);
            console.log(json);


            json.teas.forEach(tea => {
                $("#tea-list").append('<li class ="list-group-item" id="' + tea.id + '"> ' + tea.name + '</li>')
            });


        }
    }
}
