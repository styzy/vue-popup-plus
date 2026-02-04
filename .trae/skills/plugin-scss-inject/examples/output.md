```scss
@include use-skin('classic') {
	.popup-message {
		.background {
			font-size: use-font-size('text-main');
			background-color: use-color('warning');
			gap: use-var('spacing-large');
		}
	}
}
@include use-skin('modern') {
	.popup-message {
		.background {
			color: use-color('primary');
			padding: use-var('spacing');
		}
	}
}
```
