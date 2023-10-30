interface CartProps {
  items: string[];
  cartNumber: number;
}

const Cart: React.FC<CartProps> = ({ items, cartNumber }) => {
  return (
    <div className="cart-container flex">
      <h3 className="cart-title">Cart {cartNumber}</h3>
      {items.map((item, i) => {
        return (
          <div key={item}>
            {i + 1}. {item.charAt(0).toUpperCase() + item.slice(1)}
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
