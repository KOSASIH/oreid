import React, { useCallback, useEffect, useState } from "react";
import { AtomichubAssets } from "./AtomicHubTypes";
import { Button } from "../Button";
import { isAssetOnSale } from "./helpers/isAssetOnSale";

interface Props {
	asset: AtomichubAssets;
}

export const SellOrCancelButtom: React.FC<Props> = ({ asset }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [onSale, setOnSale] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		isAssetOnSale(asset.asset_id)
			.then((isOnSale) => setOnSale(isOnSale))
			.finally(() => setIsLoading(false));
	}, [asset]);

	const createAssetSale = useCallback(async () => {
		// TODO: Create transaction to sell my NFT
		console.log("Offer my NFT for sale");
	}, [asset]);
	const cancelAssetSale = useCallback(async () => {
		// TODO: Create transaction to cancel my NFT offer
		console.log("Cancel sales offer");
	}, [asset]);

	if (!asset.is_transferable) return null;

	const onClick = () => {
		setIsLoading(true);

		if (onSale) {
			cancelAssetSale()
				.then(() => {
					// Do something
				})
				.catch(console.error)
				.finally(() => setIsLoading(false));
			return;
		}

		createAssetSale()
			.then(() => {
				// Do something
			})
			.catch(console.error)
			.finally(() => setIsLoading(false));
	};

	if (isLoading) return <>Loading...</>;
	return (
		<Button icon="/img/wax-chain-logo.wam" onClick={onClick}>
			{onSale ? "Cancel Sale Offer" : "Offer for Sale"}
		</Button>
	);
};
