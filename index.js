const goods = [
  {
    title: "Shirt",
    price: "150$",
    img:
      "https://images.pexels.com/photos/1188748/pexels-photo-1188748.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    title: "Socks",
    price: "50$",
    img:
      "https://images.unsplash.com/photo-1616531758364-731625b1f273?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    title: "Jacket",
    price: "350$",
    img:
      "https://images.pexels.com/photos/3770674/pexels-photo-3770674.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  },
  {
    title: "Shoes",
    price: "250$",
    img:
      "https://images.pexels.com/photos/4277507/pexels-photo-4277507.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  },
  {},
  {},
  {},
  {},
];

const reformData = (items) => {
  return items.map(({ product_name, ...rest }) => {
    return {
      ...rest,
      title: product_name,
    };
  });
};

const URl =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const GOODS_POSTFIX = "/catalogData.json ";
const GET_BASKET = "/getBasket.json";
const ADD_BASKET = "/addToBasket.json";
const DELETE_FROM_BASKET = "/deleteFromBasket.json";

const service = function (url, postfix, method = "GET") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${url}${postfix}`, {
        method,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data);
        });
    }, 2000);
  });
};

class Basket {
  setGoods() {
    return service(URl, GET_BASKET).then((data) => {
      this.goods = reformData(data.contents);
    });
  }
  deleteGoodsToBasket(id) {
    return service(
      URl,
      `${DELETE_FROM_BASKET}/${id}`,
      "DELETE"
    ).then((data) => {});
  }
  setVision() {}
  render() {}
}
class BasketItem {
  setCount() {}
  deleteItem() {}
  render() {}
}

onload = () => {
  const app = new Vue({
    el: "#app",
    data: {
      goods: [],
      filteredGoods: [],
      search: "",
      basketVision: false,
    },
    mounted() {
      service(URl, GOODS_POSTFIX).then((data) => {
        const result = reformData(data);
        this.goods = result;
        this.filteredGoods = result;
      });
    },
    methods: {
      filter() {
        this.filteredGoods = this.goods.filter(({ title }) => {
          return new RegExp(this.search, "i").test(title);
        });
      },
      showBasket() {
        this.basketVision = true;
      },
      closeBasket() {
        this.basketVision = false;
      },
    },
  });
};

// const basket = new Basket();
// basket.setGoods().then(() => {});
