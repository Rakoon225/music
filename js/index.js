for (key in object_cards) {
	document
		.querySelector(`.cards-container`)
		.innerHTML += `
		<a href="album.html?id=${object_cards[key].ind}" class="text-decoration-none col col-sm-6 col-md-5 col-lg-4 col-xl-3 my-2">
		<div class="card">
			<img src="assets/${object_cards[key].ind}.png" alt="карточка" class="card-image-top">
			<div class="card-body">
				<p class="card-text">${object_cards[key].desc}</p>
			</div>
		</div>	
		`
}
