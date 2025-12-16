import {
  createContext,
  useContext,
  useState,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

type CartItem = { id: string; quantity: number };
type LastItemAdded = { id: string; name: string; pictureUrl: string };

type CartContextType = {
  cartItems: CartItem[];
  lastItemAdded: LastItemAdded | undefined;
  isAdded: boolean;
  cartCount: number;
  addItem: (product: { id: string; name: string; image: string }) => void;
  deleteItem(id: string): void;
};

type CartAction =
  | { type: "SET_INITIAL_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPSERT_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "SET_INITIAL_CART":
      return action.payload;
    case "ADD_ITEM":
      return [...state, action.payload];
    case "UPSERT_ITEM": {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity + item.quantity }
            : item
        );
      }

      return [action.payload, ...state];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.payload);
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  initialItems?: CartItem[];
}

export const CartProvider = ({ initialItems, children }: CartProviderProps) => {
  const [cartItems, dispatch] = useReducer(cartReducer, initialItems || []);
  const [lastItemAdded, setLastItemAdded] = useState<LastItemAdded | undefined>(
    undefined
  );
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const cartCount = cartItems.length;

  /**
   * Run useffect on first render to get cart length and cart item
   */
  useEffect(() => {
    const getCartCount = async () => {
      const res = await fetch("/api/cart/raw");
      if (!res.ok) {
        dispatch({ type: "SET_INITIAL_CART", payload: [] });
        return;
      }

      const data = await res.json();
      dispatch({
        type: "SET_INITIAL_CART",
        payload: data,
      });
    };

    getCartCount();
  }, []);

  /**
   * Run useeffect to update cart item count
   */

  useEffect(() => {
    setIsAdded(true);

    const timeout = setTimeout(() => {
      setIsAdded(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cartItems]);

  const addItem = async (product: {
    id: string;
    name: string;
    image: string;
  }) => {
    try {
      const numeridId = JSON.stringify(product.id).includes("gid")
        ? product.id.split("/").pop()
        : product.id;

      const res = await fetch("/api/cart/", {
        method: "POST",
        body: JSON.stringify({ id: numeridId, quantity: 1 }),
      });

      const updatedItem = await res.json();

      dispatch({
        type: "UPSERT_ITEM",
        payload: { ...updatedItem },
      });

      setLastItemAdded({
        name: product.name,
        id: product.id,
        pictureUrl: product.image,
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const numeridId = JSON.stringify(id).includes("gid")
        ? (id.split("/").pop() as string)
        : id;

      const res = await fetch(`/api/cart/${numeridId}`, {
        method: "DELETE",
      });

      dispatch({
        type: "REMOVE_ITEM",
        payload: numeridId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (newQuantity: number, productId: string) => {
    const numeridId = JSON.stringify(productId).includes("gid")
      ? (productId.split("/").pop() as string)
      : productId;

    const res = await fetch(`/api/cart/${numeridId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Problem updating item quantity");
      return;
    }

    console.log("Quantity Updated");
  };

  return (
    <CartContext.Provider
      value={{
        lastItemAdded,
        cartItems,
        addItem,
        deleteItem,
        isAdded,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside provider");

  return ctx;
};

export default CartProvider;
