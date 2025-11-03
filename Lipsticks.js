

    document.addEventListener('DOMContentLoaded', () => {
        // Fav icons
        const favoriteButtons = document.querySelectorAll('.favorite-button');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Toggle 'active' class to change the state of the button
                button.classList.toggle('active');
            });
        });

    // Cool tone slider
    const slidesCool = document.querySelectorAll('.cool-product');
    let currentSlideCool = 0;

    function showSlideCool() {
        slidesCool.forEach((slide) => {
            slide.style.display = 'none'; // Hide all products initially
        });

        // Display exactly 3 products in order, seamlessly looping
        for (let i = 0; i < 3; i++) {
            const indexToShow = (currentSlideCool + i) % slidesCool.length;
            slidesCool[indexToShow].style.display = 'flex'; // Show the product
        }
    }

    function changeSlideCool(direction) {
        // Move the index in a circular way
        currentSlideCool = (currentSlideCool + direction + slidesCool.length) % slidesCool.length;
        showSlideCool();
    }

    showSlideCool(); // Initialize by showing the first 3 products

    // Event listeners for cool tone arrow buttons
    document.querySelector('.cool-slider .prev').addEventListener('click', () => changeSlideCool(-1));
    document.querySelector('.cool-slider .next').addEventListener('click', () => changeSlideCool(1));

    // Warm tone slider
    const slidesWarm = document.querySelectorAll('.warm-product');
    let currentSlideWarm = 0;

    function showSlideWarm() {
        slidesWarm.forEach((slide) => {
            slide.style.display = 'none'; // Hide all products initially
        });

        // Display exactly 3 products in order, seamlessly looping
        for (let i = 0; i < 3; i++) {
            const indexToShow = (currentSlideWarm + i) % slidesWarm.length;
            slidesWarm[indexToShow].style.display = 'flex'; // Show the product
        }
    }

    function changeSlideWarm(direction) {
        // Move the index in a circular way
        currentSlideWarm = (currentSlideWarm + direction + slidesWarm.length) % slidesWarm.length;
        showSlideWarm();
    }

    showSlideWarm(); // Initialize by showing the first 3 products

    // Event listeners for warm tone arrow buttons
    document.querySelector('.warm-slider .prev').addEventListener('click', () => changeSlideWarm(-1));
    document.querySelector('.warm-slider .next').addEventListener('click', () => changeSlideWarm(1));

    // Neutral tone slider
    const slidesNeutral = document.querySelectorAll('.neutral-product');
    let currentSlideNeutral = 0;

    function showSlideNeutral() {
        slidesNeutral.forEach((slide) => {
            slide.style.display = 'none'; // Hide all products initially
        });

        // Display exactly 3 products in order, seamlessly looping
        for (let i = 0; i < 3; i++) {
            const indexToShow = (currentSlideNeutral + i) % slidesNeutral.length;
            slidesNeutral[indexToShow].style.display = 'flex'; // Show the product
        }
    }

    function changeSlideNeutral(direction) {
        // Move the index in a circular way
        currentSlideNeutral = (currentSlideNeutral + direction + slidesNeutral.length) % slidesNeutral.length;
        showSlideNeutral();
    }

    showSlideNeutral(); // Initialize by showing the first 3 products

    // Event listeners for neutral tone arrow buttons
    document.querySelector('.neutral-slider .prev').addEventListener('click', () => changeSlideNeutral(-1));
    document.querySelector('.neutral-slider .next').addEventListener('click', () => changeSlideNeutral(1));
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize wishlist from localStorage or create an empty array if it doesn't exist
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Function to update the wishlist in localStorage
    function updateWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Function to check if a product is in the wishlist
    function isInWishlist(productName) {
        return wishlist.some(item => item.name === productName);
    }

    // Select all favorite buttons and add event listeners to handle favorites
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    favoriteButtons.forEach(button => {
        const productInfo = button.closest('.product');
        const productName = productInfo.querySelector('p b').textContent;

        // Check if the product is already in the wishlist and apply the 'active' class if true
        if (isInWishlist(productName)) {
            button.classList.add('active');
        }

        button.addEventListener('click', function () {
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
                button.classList.remove('active'); // Remove the 'active' class
            } else {
                // Add to wishlist
                wishlist.push(product);
                button.classList.add('active'); // Add the 'active' class
            }

            // Update the wishlist in localStorage
            updateWishlist();
        });
    });

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

