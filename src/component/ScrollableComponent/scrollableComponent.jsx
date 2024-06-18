import React from "react";
import classes from "./ScrollableComponent.module.css";

const ScrollableComponent = ({ children, style }) => {
	return (
		<div className={classes.scrollable_container} style={style}>
			{children}
		</div>
	);
};

export default ScrollableComponent;
