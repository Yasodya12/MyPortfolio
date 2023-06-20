
var tot=0;
$("#btnAddToCart").prop("disabled", true);

document.getElementById("btnOrder").addEventListener("click", function(){
    document.getElementById("customer").style.display="none";
    // document.getElementById("item").style.display="none";
    document.getElementById("item").style.display="none";
    document.getElementById("placeORder").style.display="block";

});

function getSelectedCustID() {

    var selectCustomerID = document.getElementById("custIds");
    var selectedCustId = selectCustomerID.value;
    cutomerList.forEach(function(customer) {
        if (customer.id==selectedCustId){
            $('#custNameRst').val(customer.name);
        }
    });
}
var selectedItemId;
function getSelectedItemID() {

    var selectItemID = document.getElementById("itemIds");
    selectedItemId = selectItemID.value;
    itemList.forEach(function(item) {
        if (item.id==selectedItemId){
            $('#custItemRst').val(item.name);


            $('#txtPriceRst').val(item.price);

            $('#txtQytRst').val(item.qty);

        }
    });
}
$("#btnAddToCart").click(function (event){
    table = document.getElementById("tblPlaceOrderBody");
    var selectItemID = document.getElementById("itemIds");

    let pr = $('#txtPriceRst').val();
    var itemExists = false;
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cellValue = row.cells[0].innerHTML; // Get the value from the first cell (item ID)
        var  qty=$('#txtQtyOd').val();
        // Check if item ID already exists
        if (cellValue === selectItemID.value) {
            // Update the existing row

            row.cells[2].innerHTML = qty; // Update quantity

            row.cells[4].innerHTML = pr * qty; // Update total price
            clearTextFeildOrder();
            tot=tot+(pr * qty);
            $('#txtTot').val(tot);
            $('#txtSubTot').val(tot);
            // Set the flag to indicate item exists
            itemExists = true;
            break; // Exit the loop
        }
    }




    if (!itemExists){
        var  qty=$('#txtQtyOd').val();
        var itemforTable;

        itemList.forEach(function(item) {
            if (item.id==selectedItemId){
                // item.qty=item.qty-qty;
                itemforTable=item;
            }
        });



        var row = table.insertRow(table.rows.length);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML=itemforTable.id;
        cell2.innerHTML=itemforTable.name;
        cell3.innerHTML=qty;
        cell4.innerHTML=itemforTable.price;
        cell5.innerHTML=itemforTable.price*qty;
        tot=tot+itemforTable.price*qty;
        $('#txtTot').val(tot);
        $('#txtSubTot').val(tot);

        buttonEdit = document.createElement("button");
        buttonEdit.classList.add("btnEdit");
        buttonEdit.textContent="Edit";
        buttonDelete = document.createElement("button");
        buttonDelete.textContent="Delete";
        buttonDelete.classList.add("btnDelete");
        buttonDelete.id="btnTableDelete"

        clearTextFeildOrder();
        cell6.insertAdjacentElement("beforeend", buttonEdit);
        cell6.insertAdjacentElement("beforeend", buttonDelete);
    }



});

$('#txtDiscount').keydown(function (event){

    if(event.key=="Enter"){
        var dis=$('#txtDiscount').val();
        console.log(dis);
        $('#txtSubTot').val(tot-dis);
    }

});

//Validation    Validation  Validation  Validation

function clearTextFeildOrder(){
    // let selectElement = document.getElementById("itemIds");
    //
    //
    // let defaultOption = selectElement.options[0]; // Assuming the default option is the first option
    //
    // defaultOption.text = "Item ID";
    // defaultOption.disabled = true;
    // defaultOption.selected = true;

// Add the default option to the select element
//     selectElement.appendChild(defaultOption);

    $('#txtQtyOd').val("");
    $('#custItemRst').val("");
    $('#txtQytRst').val("");
    $('#txtPriceRst').val("");

    $('#custNameRst').val("");
    $('#txtOrderID').val("");


}
$(document).ready(function() {

    $("#txtQtyOd").on("keydown", function(event) {
        var qtyStock=$('#txtQytRst').val();
       var qtyWant= $("#txtQtyOd").val();
        if(qtyStock<qtyWant ){
            $("#btnAddToCart").prop("disabled", true);
            $("#txtQtyOd").css("border-color", "red");
        }else {

            $("#btnAddToCart").prop("disabled", false);
            $("#txtQtyOd").css("border-color", "green");
        }
    });
});
$('#clearButton').click(function (event){
    clearTextFeildOrder();
});
$('#btnCancel').click(function (event){
    $("#tblPlaceOrderBody").empty();
});

$(document).on("click", ".btnEdit", function() {
    let closest = $(this).closest("tr");
    let text = closest.find("td:eq(0)").text();



    itemList.forEach(function(item) {
        if (item.id==text){
            $('#custItemRst').val(item.name);


            $('#txtPriceRst').val(item.price);

            $('#txtQytRst').val(item.qty);

        }
    });
});

$(document).on("click", ".btnDelete", function() {
     $(this).closest("tr").remove();
});

$(document).on("click", ".btnPurchase", function() {
    // itemList.forEach(function(item) {
    //     if (item.id==selectedItemId){
    //         item.qty=item.qty-qty;
    //         itemforTable=item;
    //     }
    // });
});