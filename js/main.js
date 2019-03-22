// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);
function saveBookmark(e) {
  // Getting form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  //   Creating and object to store bookmarks in
  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  //   Local Storage Test (only strings)
  //   localStorage.setItem("test", "Hello World");
  //   console.log(localStorage.getItem("test"));
  //   localStorage.removeItem("test");

  // Initialize an array "bookmarks" if null
  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    // Add to an array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //   If there is something in the array
    //   Get bookmarsks from LocalStorage
    // JSON.parse turns a string into JSON
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to an array
    bookmarks.push(bookmark);
    // Reset back to LocalStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById("myForm").reset();

  // refetch bookmarks (display them)
  fetchBookmarks();

  //  To make sure it stays in the console log, it doesn't submit.
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
  //   Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //   Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  //   Reset the local storage after deletion
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Refetch the bookmarks (reload)
  fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks() {
  //   Get bookmarsks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //   Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  // Build output

  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    // well is a bootstrap class that gives us padding and gray color
    bookmarksResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      ' <a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      " <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      "</h3>" +
      "</div>";
  }
}
// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  // Making sure the URL is really an URL
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
