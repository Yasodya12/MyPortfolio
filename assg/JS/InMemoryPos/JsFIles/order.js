
var tot=0;


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

    var  qty=$('#txtQtyOd').val();
    var itemforTable;

    itemList.forEach(function(item) {
        if (item.id==selectedItemId){
            item.qty=item.qty-qty;
            itemforTable=item;
        }
    });


    table = document.getElementById("tblPlaceOrderBody");
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
    buttonEdit = document.createElement("button");
    buttonEdit.classList.add("btnEdit");
    buttonEdit.textContent="Edit";
    buttonDelete = document.createElement("button");
    buttonDelete.textContent="Delete";
    buttonDelete.classList.add("btnDelete");
    buttonDelete.id="btnTableDelete"


    cell6.insertAdjacentElement("beforeend", buttonEdit);
    cell6.insertAdjacentElement("beforeend", buttonDelete);


});

$('#txtDiscount').keydown(function (event){
    console.log("OWbaadasdas")
    if(event.key=="Enter"){
        var dis=$('#txtDiscount').val();
        console.log(dis);
        $('#txtSubTot').val(tot-dis);
    }

});