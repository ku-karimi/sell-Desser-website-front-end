const buttonAdd = document.getElementsByClassName("addBtn");
const pEmpBasket = document.getElementsByClassName("empet-bascet");
const pAddBasket = document.getElementsByClassName("carboon");
const btnBuy = document.getElementById("buy");
const divList = document.getElementById("img-emp");
const tabletElem = document.createElement("table");
divList.append(tabletElem) ;
const divImgEmp = document.getElementById("img-none");
const countCard = document.getElementsByClassName("cart");
const buyBasket = [];

function addToList(event) {
    let element;

    // Ensure we are targeting the button element correctly
    if (event.target.tagName === "BUTTON") {
        element = event.target;
    } else if (event.target.parentElement.tagName === "BUTTON") {
        element = event.target.parentElement;
    } else {
        return; // Exit if neither is a button
    }

    const dessertName = element.getAttribute('name');
    const price = Number(element.getAttribute('price'));
    var foundDessert = buyBasket.find(item => item.Name === dessertName);

    if (foundDessert) {
        // Update existing dessert in the basket
        foundDessert.Count += 1;
        foundDessert.Price += price;
        element.children[1].innerHTML = foundDessert.Count;
        divListFunc();
    } else {
        // Add new dessert to the basket
        const newDessert = {
            Name: dessertName,
            Price: price,
            Count: 1,
        };
        buyBasket.push(newDessert);

        // Update the button appearance
        element.style.backgroundColor = "orangered";
        element.children[0].src = "./images/icon-increment-quantity.svg";
        element.children[0].style.marginTop = "5px";
        element.children[1].innerHTML = "1";
        // Update the display
        const length = buyBasket.length;
        btnBuy.style.display = "block";
        pAddBasket[0].style.display = "block";
        pAddBasket[0].style.marginTop = "30px";
        pEmpBasket[0].style.display = "none";
        divImgEmp.style.display = "none";
        countCard[0].innerHTML = `Your cart (${length})`;
        element.children[1].style.color = "snow" ;

        
        const decreaseElem = document.createElement("img");
        const decreaseDivElem = document.createElement("div");
        decreaseElem.src = "./images/icon-decrement-quantity.svg";
        decreaseDivElem.style.marginTop = "-2px";
        decreaseDivElem.addEventListener("click" , () => decreasFun(newDessert , element))
        decreaseDivElem.appendChild(decreaseElem)
        element.appendChild(decreaseDivElem);

        function decreasFun(foundDessert) {
            if (foundDessert.Count > 1) {
                foundDessert.Count -= 1;
                foundDessert.Price -= price;
                element.children[1].innerHTML = foundDessert.Count;
                divListFunc();
            }else{
                const index = buyBasket.indexOf(foundDessert);
                if (index > -1) {
                    let deletObj = buyBasket.splice(index, 1);
                    element.style.backgroundColor = "snow";
                    element.children[0].src = "./images/icon-add-to-cart.svg";
                    element.children[0].style.marginTop = "0px";
                    element.children[1].innerHTML = "add to cart";
                    element.children[2].remove();
                    element.children[1].style.color = "black" ;
                    const length = buyBasket.length;
                    countCard[0].innerHTML = `Your cart (${length})`;
                    divListFunc();
                }
            }
        }
        divListFunc();
    }
    
    function divListFunc() {
        
        divList.innerHTML = " " ;
    
    for(let x of buyBasket){
        const diveObj = document.createElement("tr");
        diveObj.style.display = "flex";
        diveObj.style.justifyContent = "space-between";
        diveObj.style.marginTop = "5px";
        diveObj.style.marginBottom = "5px";
        divList.style.display = "block" ;
        diveObj.style.borderBottom = "2px solid orangered" ;
    
        const objName = document.createElement("td");
        objName.innerHTML = x.Name ;
        diveObj.appendChild(objName);
        const objCount = document.createElement("td");
        objCount.innerHTML =  "Numbers : " + x.Count ;
        diveObj.appendChild(objCount);
        const objPrice = document.createElement("td");
        objPrice.innerHTML =  x.Price ;
        diveObj.appendChild(objPrice);

        divList.appendChild(diveObj);
    }
    
    }
    console.log(buyBasket);
}




// Attach event listeners to all add buttons
for (let x of buttonAdd) {
    x.addEventListener("click", addToList);
}