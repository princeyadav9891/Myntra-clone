let bagItems;
onload();
function onload(){
    let bagItemStr=localStorage.getItem("bagItem");
    // we have use the enumeration type syntax 
    bagItems= bagItemStr ? JSON.parse(bagItemStr) : [];
    // console.log(bagItems);
    displayItemsOnHomePage();
    displayBagIcon()
}

// for adding the item in bag
function addToBag(itemId){
    bagItems.push(itemId);
    //after clicking on bag icon the page will load to another page 
    // which will lead to empty the bag for that reason we used the local 
    // storage so that when we comes to index page the bag will show its item 
    localStorage.setItem('bagItem',JSON.stringify(bagItems));
    displayBagIcon();
    
}
// for displaying the item count in bag icon
function displayBagIcon(){
  let bagitemcount=document.querySelector(".bag-item-count");
//   console.log(bagitemcount);
if (bagItems.length>0){
    bagitemcount.style.visibility="visible";
    bagitemcount.innerText= bagItems.length;
}
else{
    bagitemcount.style.visibility="hidden";
}
 
//   console.log("hii")
}

// let item={
//     item_image: 'images/img/1.jpg',
//     rating:{
//         stars: 4.5,
//         noOfReviews:1400,
//     },
//     company_name: 'Carlton London',
//     item_name: 'Rhodium-Plated CZ Floral Studs',
//     price:{
//         current_price:"Rs 606",
//         original_price:'Rs 1045',
//         discount:'(42% OFF)',
//     }
// 

function displayItemsOnHomePage(){
    let itemsContainerElement = document.querySelector('.items-container');
    let innerHTML ='';//inner html just a variable name
    // if item did not find then it will return  
    if(!itemsContainerElement){
        return;
    }
 items.map(item=>{
     innerHTML+= `
    <div class="item-container">
    <img class="item-image" src="${item.image}" alt="">
    <div class="rating">
        ${item.rating.stars}⭐|${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">${item.original_price}</span>
        <span class="discount">${item.discount_percentage}%</span>
    </div>   
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
    </div>`
});
itemsContainerElement.innerHTML = innerHTML;
}
// ${item.id} through item.id we are targeting the object values 