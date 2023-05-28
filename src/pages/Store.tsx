import storeItems from "../data/items.json";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/storeItem";


// Row is a bootstrap component that creates a row, same goes with col
// We're getting storeItem from the data source and iterating over it to display the col
export function Store() {
	return (
		<>
			<h1 className="text-center my-5 fw-bold" style={{fontSize:"clamp(2rem, 3vw, 4rem)"}}>Store</h1>
			<Row lg={3} md={2} xs={1} className="g-3">
				{storeItems.map((item) => (
					<Col key={item.id} style={{ cursor:"pointer"}}>
						<StoreItem {...item} />
					</Col>
				))}
			</Row>
		</>
	);
}
