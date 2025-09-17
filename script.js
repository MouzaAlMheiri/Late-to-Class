
document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('nav a');
	navLinks.forEach(function(link) {
		link.addEventListener('mouseover', function() {
			link.style.background = '#fff';
			link.style.color = '#402b21';
			link.style.boxShadow = '0 4px 16px rgba(64,43,33,0.18)';
		});
		link.addEventListener('mouseout', function() {
			link.style.background = '#402b21';
			link.style.color = '#fff';
			link.style.boxShadow = '0 2px 8px rgba(64,43,33,0.10)';
		});
	});


	function updateClock() {
		const now = new Date();
		const uaeOffset = 4 * 60;
		const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
		const uaeTime = new Date(utc + (uaeOffset * 60000));
		const hours = String(uaeTime.getHours()).padStart(2, '0');
		const minutes = String(uaeTime.getMinutes()).padStart(2, '0');
		const seconds = String(uaeTime.getSeconds()).padStart(2, '0');
		const clockElem = document.getElementById('uae-clock');
		if (clockElem) {
			clockElem.textContent = `${hours}:${minutes}:${seconds} UAE`;
		}
	}
	setInterval(updateClock, 1000);
	updateClock();

	
	const images = document.querySelectorAll('.swipe-img');
	let current = 0;
	function showImage(idx) {
		images.forEach((img, i) => {
			img.style.display = i === idx ? 'block' : 'none';
		});
	}
	const prevBtn = document.getElementById('prev-btn');
	const nextBtn = document.getElementById('next-btn');
	if (prevBtn && nextBtn && images.length) {
		prevBtn.onclick = function() {
			current = (current - 1 + images.length) % images.length;
			showImage(current);
		};
		nextBtn.onclick = function() {
			current = (current + 1) % images.length;
			showImage(current);
		};
		
		let startX = null;
		const gallery = document.getElementById('swipe-gallery');
		if (gallery) {
			gallery.addEventListener('touchstart', function(e) {
				startX = e.touches[0].clientX;
			});
			gallery.addEventListener('touchend', function(e) {
				if (startX === null) return;
				let endX = e.changedTouches[0].clientX;
				if (endX - startX > 50) {
					current = (current - 1 + images.length) % images.length;
					showImage(current);
				} else if (startX - endX > 50) {
					current = (current + 1) % images.length;
					showImage(current);
				}
				startX = null;
			});
		}
		showImage(current);
	}
});
