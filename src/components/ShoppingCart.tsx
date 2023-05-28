import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCard } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
	isOpen: boolean;
};

// this canvas thingy is responsible for that slide in and slide out effect 
// this has these mini funcs that help us set title and all of that stuff
export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
	const { closeCart, cartItems } = useShoppingCard(); // we get cart items from the context
	return (
		<Offcanvas show={isOpen} onHide={closeCart} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>

			<Offcanvas.Body>
				<Stack gap={3}>

					{cartItems.map((item) => (
						<CartItem key={item.id} {...item} />
					))}
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
}
