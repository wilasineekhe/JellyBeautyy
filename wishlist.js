document.addEventListener('DOMContentLoaded', () => {
    // Initialize wishlist from localStorage or create an empty array if it doesn't exist
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Function to update the wishlist in localStorage
    function updateWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Function to display the wishlist on the wishlist page
    function displayWishlist() {
        const wishlistContainer = document.getElementById('wishlist-container');
        if (!wishlistContainer) return; // If not on the wishlist page, do nothing

        wishlistContainer.innerHTML = ''; // Clear existing content

        if (wishlist.length > 0) {
            wishlist.forEach(item => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <div class="product-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="product-info">
                        <h2 class="brand">${item.brand}</h2>
                        <p><b>${item.name}</b></p>
                        <p>Price: ${item.price}</p>
                    </div>
                `;
                wishlistContainer.appendChild(productDiv);
            });
        } else {
            wishlistContainer.innerHTML = '<p>No items in your wishlist.</p>';
        }
    }

    // Initialize the display of the wishlist (if on wishlist page)
    displayWishlist();

    // Select all favorite buttons and add event listeners to handle favorites
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productInfo = this.closest('.product');
            const productName = productInfo.querySelector('p b').textContent;
            const productBrand = productInfo.querySelector('.brand').textContent;
            const productPrice = productInfo.querySelector('p:nth-of-type(2)').textContent;
            const productImage = productInfo.querySelector('img').src;

            const product = {
                name: productName,
                brand: productBrand,
                price: productPrice,
                image: productImage
            };

            // Check if the product is already in the wishlist
            const index = wishlist.findIndex(item => item.name === productName);

            if (index > -1) {
                // Remove from wishlist
                wishlist.splice(index, 1);
            } else {
                // Add to wishlist
                wishlist.push(product);
            }

            // Toggle 'active' class to change the state of the button
            button.classList.toggle('active');

            // Update the wishlist in localStorage
            updateWishlist();
        });
    });

    // Clear the wishlist and update the page when the "Clear Wishlist" button is clicked
    const clearWishlistButton = document.getElementById('clear-wishlist');
    if (clearWishlistButton) {
        clearWishlistButton.addEventListener('click', function () {
            wishlist = []; // Empty the wishlist array
            localStorage.removeItem('wishlist'); // Remove it from localStorage
            displayWishlist(); // Update the display
            alert("Wishlist cleared! You can now add new items.");
        });
    }
});
