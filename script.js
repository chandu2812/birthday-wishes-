const quotes = [
  "May your birthday be filled with joy and wonderful surprises!",
  "Wishing you a day that's as special as you are!",
  "Hope your year ahead is full of happiness and success!",
  "You're not getting older, you're just becoming a classic!"
];

function showRandomQuote() {
  const quote = document.getElementById('quote');
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  quote.style.display = 'block';
  quote.classList.remove('fade-in'); // restart animation
  void quote.offsetWidth; // trigger reflow
  quote.classList.add('fade-in');
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function showImage(event) {
  const file = event.target.files[0];
  const imgElement = document.getElementById('uploadedImage');
  const btn = document.getElementById('surpriseBtn');

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        imgElement.src = canvas.toDataURL("image/jpeg", 0.7); // compressed image
        imgElement.style.display = 'block';
        imgElement.classList.add('photo-fade');

        btn.style.display = 'inline-block'; // show the surprise button
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function showSurprise() {
  showRandomQuote();
  document.getElementById('popup').style.display = 'block';
}

function updateName() {
  const name = document.getElementById('nameInput').value.trim();
  const greeting = document.getElementById('greeting');
  if (name.length > 0) {
    greeting.textContent = `🎉 Happy Birthday, ${name}! 🎉`;
  } else {
    greeting.textContent = `🎂 Happy Birthday, Friend! 🎂`;
  }
}
