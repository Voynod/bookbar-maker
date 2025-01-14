document.getElementById("addBook").addEventListener("click", function () {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pageCount = parseInt(document.getElementById("pageCount").value.trim());
  const isBFormat = document.getElementById("bFormat").checked;
  const colorScheme = document.getElementById("colorScheme").value;

  if (!title || !author || isNaN(pageCount) || pageCount <= 0) {
    alert("Please provide valid book details!");
    return;
  }

  const shelfContainer = document.getElementById("shelfContainer");

  const scaleFactor = 1;
  const height = isBFormat ? (19.8 * scaleFactor) + "rem" : (17.8 * scaleFactor) + "rem";
  const thickness = `${(pageCount * 0.00688 * scaleFactor).toFixed(2)}rem`;

  let bookColor;
  if (colorScheme === "random") {
    bookColor = `rgb(${Math.floor(Math.random() * 50) + 180}, ${Math.floor(Math.random() * 50) + 205}, ${Math.floor(Math.random() * 50) + 205})`;
  } else {
    bookColor = colorScheme === "teal" ? "#4db8b8" : colorScheme === "blue" ? "#5a8fcc" : "#8fbf8f";
  }

  const bookSpine = document.createElement("div");
  bookSpine.classList.add("bookSpine");
  bookSpine.style.height = height;
  bookSpine.style.width = thickness;
  bookSpine.style.backgroundColor = bookColor;
  bookSpine.setAttribute("draggable", true);

  bookSpine.addEventListener("dragstart", function (event) {
    bookSpine.classList.add("dragging");
  });

  bookSpine.addEventListener("dragend", function () {
    bookSpine.classList.remove("dragging");
  });

  const textSpan = document.createElement("span");
  const combinedText = `<b>${author}</b> ${title}`;
  textSpan.innerHTML = combinedText;

  const totalLength = (title + " " + author).length;

  let fontSize = "0.7rem";
  let displaySingleLine = false;

  if (totalLength <= 25) {
    fontSize = "0.98rem";
    displaySingleLine = true;
  }

  textSpan.style.fontSize = fontSize;

  if (displaySingleLine) {
    textSpan.style.whiteSpace = "nowrap";
  } else {
    textSpan.style.whiteSpace = "normal";
  }

  bookSpine.appendChild(textSpan);
  shelfContainer.appendChild(bookSpine);

  // Clear inputs
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pageCount").value = "";
});

// Shelf customization
document.getElementById("shelfBackgroundColor").addEventListener("input", function () {
  const shelfContainer = document.getElementById("shelfContainer");
  shelfContainer.style.backgroundColor = this.value;
});

document.getElementById("spacing").addEventListener("input", function () {
  const shelfContainer = document.getElementById("shelfContainer");
  shelfContainer.style.gap = `${this.value}px`;
});

// Export Shelf as Image
document.getElementById("exportShelf").addEventListener("click", function () {
  html2canvas(document.getElementById("shelfContainer")).then(function (canvas) {
    const link = document.createElement("a");
    link.download = "book_shelf.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
