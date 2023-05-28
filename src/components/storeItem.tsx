import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCard } from "../context/shoppingCartContext";

type storeItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

// we're getting these properties for each store item and we're creating them and exporting
// on the other end we're doing it for each store item (fetched from the item.json)
export function StoreItem({ id, name, price, imgUrl }: storeItemProps) {
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
	} = useShoppingCard();
	const quantity = getItemQuantity(id);

	return (
		<Card>
			<Card.Img
				variant="top"
				src={imgUrl}
				height="200px"
				style={{ objectFit: "cover" }}
			/>

			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
					<span className="fs-2">{name}</span>
					<span className="ms-2 text-muted">
						{formatCurrency(price)}
					</span>
				</Card.Title>

				{/* if items are zero we render add or cart otherwise remove or add buttons alongside item count */}
				<div className="mt-auto">
					{quantity === 0 ? (
						<Button
							className="w-100"
							onClick={() => increaseCartQuantity(id)}
						>
							+ Add To Cart
						</Button>
					) : (
						<div
							className="d-flex align-items-center flex-column"
							style={{ gap: ".5rem" }}
						>
							<div
								className="d-flex align-items-center justify-content-center"
								style={{ gap: ".5rem" }}
							>
								<Button
									onClick={() => decreaseCartQuantity(id)}
								>
									-
								</Button>
								<div>
									<span className="fs-3">{quantity}</span> in
									cart
								</div>
								<Button
									onClick={() => increaseCartQuantity(id)}
								>
									+
								</Button>
							</div>
							<Button
								onClick={() => removeFromCart(id)}
								variant="danger"
								size="sm"
							>
								Remove
							</Button>
						</div>
					)}
				</div>
			</Card.Body>
		</Card>
	);
}
