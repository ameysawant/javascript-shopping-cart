const dvProducts = document.querySelector(".dvProducts");

//FETCH API
class Products {
  async getProducts() {
    try {
      let response = await fetch(
        `https://api.json-generator.com/templates/NJojKfMBgNOj/data?access_token=5e34zn7yhf9i7cfu89lda4qasoelrlo37ooywpw3`
      );
      let data = await response.json();
      //get a product array
      let products = data.products;
      products.map((item) => {
        const { id, name, image, price } = item;
        return { id, name, image, price };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//display products
class UI {
  displayProducts(products) {
    let showProducts = "";
    products.forEach((product) => {
      showProducts =
        showProducts +
        `<div class="product">
      <img
        src="${product.image}"
        alt=""
        class="img-fluid"
      />
      <h4>${product.name}</h4>
      <p>Rs. ${product.price}</p>
      <button type="button" class="addToCartBtn" id="${product.id}">add to cart</button>
    </div>`;
    });
    dvProducts.innerHTML = showProducts;
  }
  getBagButtons() {
    const addBtn = [...document.querySelectorAll(".addToCartBtn")];
    addBtn.forEach((item) => {
      console.log(item.id);
    });
  }
}

//localstorage
class Storage {
  setProducts(products) {
    localStorage.setItem("produts", JSON.stringify(products));
  }
}

//when dom loads
document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();
  const storage = new Storage();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      storage.setProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
});
