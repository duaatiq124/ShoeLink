const products = [
    {
        id: 1,
        title: 'Pearls Green Slippers',
        thumbnail: 'images/cat8.jpg-Photoroom.png-Photoroom.png',
        category: 'new arrival',
        price: 2000
    },
    {
        id: 2,
        title: 'Black Leather Strap Slippers',
        thumbnail: 'images/cat4.jpg.jpg',
        category: 'featured products',
        price: 2000
    },
    {
        id: 3,
        title: 'White Upper Gold Bottom',
        thumbnail: 'images/cat7.jpg-Photoroom.png-Photoroom.png',
        category: 'new arrival',
        price: 3000
    },
    {
        id: 4,
        title: 'Gold Bow Fancy Slippers',
        thumbnail: 'images/cat3.jpg.jpg',
        category: 'featured products',
        price: 2500
    },
    {
        id: 5,
        title: 'Solid Black Leather',
        thumbnail: 'images/cat9.jpg-Photoroom.png-Photoroom.png',
        category: 'new arrival',
        price: 3000
    },
    {
        id: 6,
        title: 'Gold Leather Slippers',
        thumbnail: 'images/cat6.jpg.jpg',
        category: 'featured products',
        price: 1500
    },
    {
        id: 7,
        title: 'Mustard Formal Slippers',
        thumbnail: 'images/img1.jpg.png',
        category: 'new arrival',
        price: 2000
    },
    {
        id: 8,
        title: 'Crystal Chain Fancy Slippers',
        thumbnail: 'images/cat5.jpg.jpg',
        category: 'featured products',
        price: 2000
    },
    {
        id: 9,
        title: 'Summer Multi Wear Sandals',
        thumbnail: 'images/cat14.jpg.png',
        category: 'new arrival',
        price: 3000
    },
    {
        id: 10,
        title: 'Easy-to-wear Relaxable Foan Summer Slippers',
        thumbnail: 'images/cat12.jpg.png',
        category: 'new arrival',
        price: 2000
    },
    {
        id: 11,
        title: 'Grey Butterfly Sandals',
        thumbnail: 'images/cat13.jpg.png',
        category: 'new arrival',
        price: 2000
    },
    {
        id: 12,
        title: 'Summer Orange Wear',
        thumbnail: 'images/cat15.jpg.png',
        category: 'new arrival',
        price: 2000
    },
]

const renderProducts = (elem, cate) => {
    const productsWrapper = $(elem)
    const wrapperHtml = products.map((prd) => {
        if (cate) {
            if (cate == prd.category) {
                return `<div id="product${prd.id}" class="col-4">
                <img src="${prd.thumbnail}" alt="${prd.title}">
                <h4><a href="productdetails.html?id=${prd.id}">${prd.title}<a/></h4>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                </div>
                <p>Rs.${prd.price}pkr</p>
            </div>`
            }
        } else {
            return `<div id="product${prd.id}" class="col-4">
            <img src="${prd.thumbnail}" alt="${prd.title}">
            <h4><a href="productdetails.html?id=${prd.id}">${prd.title}<a/></h4>
            <div class="rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
            </div>
            <p>Rs.${prd.price}pkr</p>
        </div>`
        }
        // return `
        //     <div class="prd-card">
        //         <div class="div3 box products" data-category="abaya" data-id="0">
        //             <div class="actions">
        //                 <div class="like-checkbox">
        //                     <input onchange="handleWishlist(${prd.id},this)" type="checkbox" name="like" id="" ${itemsInWishlist.includes(prd.id) ? 'checked' : ''}>
        //                     <label for="">
        //                         <i class="unlike bi bi-suit-heart"></i>
        //                         <i class="like bi bi-heart-fill"></i>
        //                     </label>
        //                 </div>
        //                 <button onclick="handleCart(${prd.id})" class="cart-btn"><i class="bi bi-cart3"></i></button>
        //             </div>
        //             <img src="${prd.thumbnail}" alt="">
        //             <a href="productdetail.html?id=${prd.id}" class="namee">${prd.title}</a>
        //             <p class="fabric">${prd.category}</p>
        //             <p class="price">Rs.${prd.price.toFixed(2)}</p>
        //         </div>
        //     </div>
        // `
    })
    $(productsWrapper).html(wrapperHtml)
}
const handleCart = (e) => {
    e.preventDefault()
    debugger
    const formDataArray = $(e.target).serializeArray();
    const formDataObject = {};
    $.each(formDataArray, function (index, field) {
        formDataObject[field.name] = field.value;
    });
    let itemsInCart = sessionStorage.getItem('cart-items') ? JSON.parse(sessionStorage.getItem('cart-items')) : []
    let alreadyExists = false
    itemsInCart.forEach((item) => {
        if (formDataObject.id === item.id) {
            alreadyExists = true
        }
    })
    if (alreadyExists) {
        alert('Product Already in Cart')
        return
    }
    itemsInCart.push(formDataObject)
    sessionStorage.setItem('cart-items', JSON.stringify(itemsInCart))
    location.href = 'cart.html'
}

const renderCartItems = () => {
    const itemsInCart = sessionStorage.getItem('cart-items') ? JSON.parse(sessionStorage.getItem('cart-items')) : []
    const itemsWrapper = document.querySelector("#cart-items")
    let cartHtml = ''
    let totalItems = 0
    let subTotal = 0
    if (itemsInCart.length > 0) {
        itemsInCart.forEach((item) => {
            const cartItem = products.find(product => product.id == item.id)
            totalItems += Number(item.quantity)
            subTotal += Number(cartItem.price) * item.quantity
            cartHtml += `<tr>
            <td>
                <div class="cart-info">
                    <img src="${cartItem.thumbnail}" width="50%">
                    <div>
                        <p>${cartItem.title}</p>
                        <small>
                            Price: Rs.${cartItem.price}pkr
                        </small>
                        <br>
                        <a href="javascript:;removeCartItem()">Remove</a>                    
                    </div>
                </td>
                <td><input type="number" value="${item.quantity}" readonly></td>
                <td>Rs.${Number(cartItem.price) * item.quantity}pkr</td>
            </tr>`
        })
        let shippingCharges = 500;
        itemsWrapper.innerHTML = cartHtml
        $("#subtotal").html(`PKR ${subTotal.toFixed(2)}`)
        $("#shipping").html(`PKR ${shippingCharges.toFixed(2)}`)
        $("#total").html(`PKR ${(shippingCharges + subTotal).toFixed(2)}`)
    } else {
        $(".cart-page").html(`
        <h2>Nothing in Cart!</h2>
        <a href="product.html">See Our Collection</a>
        `)
    }
}
const removeCartItem = (id) => {
    let itemsInCart = sessionStorage.getItem('cart-items') ? JSON.parse(sessionStorage.getItem('cart-items')) : []
    const index = itemsInCart.findIndex(item => item.id === id)
    itemsInCart.splice(index, 1)
    if (confirm("Do you want to Remove this Item From Cart?")) {
        sessionStorage.setItem('cart-items', JSON.stringify(itemsInCart))
        renderCartItems()
    }
}
const renderPrice = () => {
    const itemsInCart = sessionStorage.getItem('cart-items') ? JSON.parse(sessionStorage.getItem('cart-items')) : []
    let subTotal = 0
    itemsInCart.forEach((item) => {
        const cartItem = products.find(product => product.id == item.id)
        subTotal += Number(cartItem.price) * item.quantity
    })
    let shippingCharges = subTotal > 0 ? 500 : 0;
    $("#subtotal-price").html(`PKR ${subTotal.toFixed(2)}`)
    $("#shipping-price").html(`PKR ${shippingCharges.toFixed(2)}`)
    $("#total-price").html(`PKR ${(shippingCharges + subTotal).toFixed(2)}`)
}