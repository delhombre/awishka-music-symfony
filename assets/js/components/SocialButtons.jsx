/* eslint-disable react/prop-types */
import { DialogContent, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import React from "react";

const SocialButtons = ({ open, onClose }) => {
	const handleClick = (url) => {
		window.location.href = url;
		// console.log(url);
	};

	const encodedCurrentUrl = encodeURIComponent(window.location.href);

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				aria-labelledby="socialMedia-share-buttons"
			>
				<DialogTitle id="socialMedia-share-buttons">Partager sur:</DialogTitle>
				<DialogContent>
					<IconButton
						aria-label="share-to-facebook"
						onClick={() =>
							handleClick(
								`https://facebook.com/sharer/sharer.php?u=${encodedCurrentUrl}`
							)
						}
					>
						<FacebookIcon style={{ color: "#4c67a1" }} />
					</IconButton>
					<IconButton
						aria-label="share-to-whatsApp"
						onClick={() =>
							handleClick(`whatsapp://send?text=${encodedCurrentUrl}`)
						}
					>
						<WhatsAppIcon style={{ color: "#075e54" }} />
					</IconButton>
					<IconButton
						aria-label="share-to-twitter"
						onClick={() =>
							handleClick(
								`https://twitter.com/intent/tweet?text=${encodedCurrentUrl}&url=${encodedCurrentUrl}`
							)
						}
					>
						<TwitterIcon style={{ color: "#00acee" }} />
					</IconButton>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default SocialButtons;
