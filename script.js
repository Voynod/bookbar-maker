document.getElementById("addBook").addEventListener("click", function () {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pageCount = parseInt(document.getElementById("pageCount").value.trim());
    const isBFormat = document.getElementById("bFormat").checked;
  
    if (!title || !author || isNaN(pageCount) || pageCount <= 0) {
      alert("Please provide valid book details!");
      return;
    }
  
    // Shelf container
    const shelfContainer = document.getElementById("shelfContainer");
  
    // Calculate dimensions based on page count and format
    const scaleFactor = 1; // Adjust scale factor for more visible sizing
    const height = isBFormat ? (19.8 * scaleFactor) + "rem" : (17.8 * scaleFactor) + "rem"; // B-Format or default scaled height
    const thickness = `${(pageCount * 0.00688 * scaleFactor).toFixed(2)}rem`; // Thickness based on page count scaled
  
    // Generate a random shade of light teal for the book color
    const randomTealColor = `rgb(${Math.floor(Math.random() * 50) + 180}, ${Math.floor(Math.random() * 50) + 205}, ${Math.floor(Math.random() * 50) + 205})`;
  
    // Create book spine
    const bookSpine = document.createElement("div");
    bookSpine.classList.add("bookSpine");
    bookSpine.style.height = height;
    bookSpine.style.width = thickness;
    bookSpine.style.backgroundColor = randomTealColor; // Apply the random color to the book
  
    // Create text for the spine
    const textSpan = document.createElement("span");
  
    // Combine title and author as a single string with author bolded
    const combinedText = `<b>${author}</b> ${title}`;
    textSpan.innerHTML = combinedText;  // Use innerHTML so that the bold is correctly applied
  
    // Calculate the total length of title + author (including spaces)
    const totalLength = (title + " " + author).length;
  
    // Adjust font size based on total length
    let fontSize = "0.7rem";  // Default smaller font size (70% of the original font size)
    let displaySingleLine = false;
  
    // Check if the combined length is 25 or fewer characters
    if (totalLength <= 25) {
      fontSize = "0.98rem";  // Slightly larger font for shorter titles + authors
      displaySingleLine = true; // Use single-line for this case
    }
  
    // Set the font size
    textSpan.style.fontSize = fontSize;
  
    // If we want the title and author on a single line, adjust layout
    if (displaySingleLine) {
      textSpan.style.whiteSpace = "nowrap";  // Ensure it stays on one line
    } else {
      textSpan.style.whiteSpace = "normal"; // Allow wrapping
    }
  
    // Append text to book and book to shelf
    bookSpine.appendChild(textSpan);
    shelfContainer.appendChild(bookSpine);
  
    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pageCount").value = "";
  });
  