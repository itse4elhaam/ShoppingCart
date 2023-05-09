import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type CartItem = {
	id: number;
	quantity: number;
};

type ShoppingCarContext = {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	cartQuantity: number;
	cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCarContext);

export function useShoppingCard() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCardProvider({ children }: ShoppingCartProviderProps) {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
		"shopping cart",
		[]
	);
	const [isOpen, setIsOpen] = useState(false);

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	function getItemQuantity(id: number) {
		// more like a for each loop which iterates over each and names it "item" then checks if its id === to the current id
		// (?) indicates a check for whether its present, if yes quantity is returned otherwise 0
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	}

	function increaseCartQuantity(id: number) {
		setCartItems((currItems) => {
			// if it doesn't exist, add one
			if (currItems.find((item) => item.id === id) == null) {
				console.log(id);
				return [...currItems, { id, quantity: 1 }];
			}
			// if it exists increment
			else {
				// Use map() to update the array items and return the updated array
				return currItems.map((item) => {
					if (item.id === id) {
						console.log("Adding");
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function decreaseCartQuantity(id: number) {
		setCartItems((currItems) => {
			// if it doesn't exist, add one
			if (currItems.find((item) => item.id === id)?.quantity === 1) {
				return currItems.filter((item) => item.id !== id);
			}
			// if it exists increment
			else {
				// Use map() to update the array items and return the updated array
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function removeFromCart(id: number) {
		return setCartItems((currItems) => {
			return currItems.filter((item) => item.id !== id);
		});
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				openCart,
				closeCart,
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				cartQuantity,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
}
