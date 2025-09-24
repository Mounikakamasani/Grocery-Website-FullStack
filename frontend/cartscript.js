function loadCart() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const cartContainer = document.getElementById('cartItems');
            const totalContainer = document.getElementById('cartTotal');
            let total = 0;

            cartContainer.innerHTML = ''; 

            if (cartItems.length === 0) {
                cartContainer.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }

            cartItems.forEach(item => {
                cartContainer.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" style="width:100px; height:100px;">
                        <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    </div>
                `;
                total += item.price * item.quantity;
            });

            totalContainer.textContent = total.toFixed(2);
        }

        function clearCart() {
            localStorage.removeItem('cartItems');
            loadCart();
        }

        function showAddressForm() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (cartItems.length === 0) {
                alert('Your cart is empty. Please add items to your cart before placing an order.');
                return;
            }
            document.getElementById('addressFormContainer').style.display = 'block';
        }

        function hideAddressForm() {
            document.getElementById('addressFormContainer').style.display = 'none';
        }

        // ✅ Order submission
        document.getElementById('addressForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const zipcode = document.getElementById('zipcode').value;
            const cartItems = JSON.parse(localStorage.getItem('cartItems'))?.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })) || [];
            const totalAmount = parseFloat(document.getElementById('cartTotal').textContent);

            if (name && address && city && zipcode && cartItems.length > 0) {
                const orderData = {
                    customer: { name, address, city, zipcode },
                    cartItems,
                    totalAmount
                };

                try {
                    const response = await fetch("http://localhost:5000/api/orders/place-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(orderData)
                    });

                    const result = await response.json();
                    alert(result.message);

                    if (response.ok) {
                        localStorage.removeItem('cartItems');
                        loadCart();
                        hideAddressForm();
                    }
                } catch (error) {
                    alert("Error placing order. Please try again.");
                }
            } else {
                alert("Please fill in all required fields.");
            }
        });

       
        window.onload = loadCart;