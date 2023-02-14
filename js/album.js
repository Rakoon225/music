//*Фундаментальные переменные
let container_albums = document.querySelector(`.album`);
let container_tracks = document.querySelector(`.tracks`);

//*Информация на какой альбом нажали
let search = new URLSearchParams(window.location.search);
let num = search.get(`id`);
let album = album_cards[num];



//!Функции
//*Вывод информации об альбоме
function renderAlbumInf() {
	container_albums.innerHTML = `
	<div class="card mb-5 col">
		<div class="card flex-row row">
			<img src="assets/${album.ind}.png" alt="альбом" class="card-image img-fluid col col-xxl-6 col-xl-8 col-lg-4 col-sm-5">
			<div class="card-body col-xxl-6 col-xl-4 col-lg-4 col-sm-6">
				<p class="card-text card-title">${album.title}</p>
				<p class="card-text card-desc">${album.desc}</p>
				<p class="card-text card-time">${album.time}</p>
			</div>
		</div>
	</div>
`
}

//*Вывод треков
function renderTracksInf() {
	for (let i = 0; i < album.tracks.length; i++) {
		container_tracks.innerHTML += `
			<li class="track list-group-item audioContainer d-flex align-items-center">
			<div class="btn-audio">
				<img src="assets/play-btn.png" alt="иконка музыки" class="me-3 buttonImage" width="35px">
			</div>
				<div class="track-container">
					<div class="tracks-body">
						<div class="tracks-title">${album.tracks[i].title}</div>
						<div class="text-secondary tracks-author">${album.tracks[i].author}</div>
					</div>
					<div class="progress-container d-flex align-items-center gap-1">
						<div class="progress">
							<div class="progress-bar" role="progressbar" style="width: 0%"></div>
						</div>
						<div class="ms-auto tracks-time">${album.tracks[i].time}</div>
					</div>
					<audio class="audio" src="${album.tracks[i].src}"></audio>
				</div>
			</li>
			`
	}

}

//*Логика треков
function setupAudio() {
	let trackNodes = document.querySelectorAll(`.track`);
	let buttonAudio = document.querySelectorAll(`.btn-audio`);
	for (let i = 0; i < buttonAudio.length; i++) {
		let btn = buttonAudio[i];
		let node = trackNodes[i];
		let audio = node.querySelector(`.audio`);
		let img = node.querySelector(`.buttonImage`);
		let timeNode = node.querySelector(`.tracks-time`);
		let progressBar = node.querySelector(`.progress-bar`);

		let images = document.querySelectorAll(`.buttonImage`);
		let audios = document.querySelectorAll(`.audio`);

		btn.addEventListener(`click`, function (evt) {
			if (album.tracks[i].bool) {
				album.tracks[i].bool = false;
				audio.pause();
				img.src = `assets/play-btn.png`;
			} else {
				playing();
			}
		});
		//Когда трек играет
		function playing() {
			album.tracks[i].bool = true;
			function updateProgress() {
				let time = getTime(audio.currentTime)
				if (audio.currentTime != time) {
					timeNode.innerHTML = time;
					progressBar.style.width = audio.currentTime * 100 / audio.duration + `%`;
				}
				if (album.tracks[i].bool) {
					requestAnimationFrame(updateProgress);
				}
			}
			updateProgress();

			let imgNow = img;
			let audioNow = audio;
			for (let i = 0; i < images.length; i++) {
				if (imgNow == images[i]) {
					imgNow.src = `assets/playing-btn.png`;
				} else {
					images[i].src = `assets/play-btn.png`;
				}
			}
			for (let i = 0; i < audios.length; i++) {
				if (audioNow == audios[i]) {
					audioNow.play();
					album.tracks[i].bool = true;
				} else {
					audios[i].pause();
					album.tracks[i].bool = false;
				}
			}
		}
	}

	let progressContainer = document.querySelectorAll(`.progress`);
	for (let i = 0; i < progressContainer.length; i++) {
		let track = progressContainer[i].closest(`.track`);
		let audio = track.querySelector(`.audio`);
		progressContainer[i].addEventListener(`click`, function (evt) {
			if (album.tracks[i].bool) {
				const width = this.clientWidth;
				const clickX = evt.offsetX;
				const duration = audio.duration;
				audio.currentTime = (clickX / width) * duration;
			}
		});
	}

	function getTime(time) {
		let currentSeconds = Math.floor(time);
		let minuts = Math.floor(currentSeconds / 60);
		let seconds = Math.floor(currentSeconds % 60);

		if (minuts < 10) {
			minuts = `0` + minuts;
		}
		if (seconds < 10) {
			seconds = `0` + seconds;
		}

		return `${minuts}:${seconds}`
	}
}

//отрисовка и логика
if (album) {
	renderAlbumInf();       //^Вывод информации об альбоме
	renderTracksInf();      //^Вывод треков
	setupAudio();           //^Логика треков
} else {
	console.log(`error`); //^если альбом не найден
}














