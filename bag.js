const CONVENIENCE_FEES=99;
let bagItemObjects;
onload();


function onload(){
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}
function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
  
    bagItemObjects.forEach(bagItem => {
      totalMRP += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
    });
  
    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;
    bagSummaryElement.innerHTML=`<div class="bag-details-container">
    <div class="price-header">
        <p>PRICE DETAILS (${totalItem} Items)</p>
    </div>
    <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">Rs${totalMRP}</span>
    </div>
    <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
    </div>

    <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">Rs${finalPayment}</span>
    </div>
    <button class="btn-place-order">
        <div class="css-xjhrni">PLACE ORDER</div>
    </button>
</div>`
}
function loadBagItemObjects(){
    // console.log(bagItems);
    bagItemObjects= bagItems.map(itemId=>{
    for(let i=0; i<items.length;i++){
        if(itemId==items[i].id){
            return items[i];
        }
    }
   });
   console.log(bagItemObjects)
}

function displayBagItems(){
    let containerElement=document.querySelector(".bag-items-container");
    let innerHTML= '';
    bagItemObjects.forEach(bagItem => {
        innerHTML+=generatItemHtml(bagItem)
    });
    containerElement.innerHTML=innerHTML;
};
function removeFromBag(itemId){
    bagItems=bagItems.filter(bagItemId => bagItemId !== itemId);
    localStorage.setItem('bagItem',JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}
function generatItemHtml(item){
  return `<div class="bag-item-container">
    <div class="item-left-part">
        <img class="item-image" src="${item.image}" alt="">
    </div>
    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">✖️</div>
    <div class="item-right-part">
        <p class="company">${item.company}</p>
        <p class="item-name">${item.item_name}</p>
        <div class="price-container">
            <span class="current-price">RS ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">${item.discount_percentage}%</span>
        </div>
        
        <div class="return-period">
            <span style="font-weight: 500;" class="return-period-days">${item.return_period}</span> return available
        </div>
        <div class="delivery-details">
            Delivery by
            <span style="color: aqua;font-weight:400;" class="delivery-details-days">${item.delivery_date}</span>
        </div>




    </div>
</div>`
}