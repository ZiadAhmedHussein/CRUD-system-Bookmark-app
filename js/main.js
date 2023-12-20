

var bookmarkName = document.getElementById("bookmark-name");
var bookmarkUrl = document.getElementById("bookmark-url");
var resultRows = document.getElementById("result-rows");
var validationPopup = document.getElementById("validation-popup");

var resultArr = [];

if (localStorage.getItem("data") != null) {
  resultArr = JSON.parse(localStorage.getItem("data"));
  displaySites(resultArr);
}


function createBookmark() {
  if ( validationSiteName () && validationSiteUrl () ) {
    var bookmark = {
      "name": bookmarkName.value,
      "url": `http://${bookmarkUrl.value}`,
    };
    resultArr.push(bookmark);
    localStorage.setItem("data", JSON.stringify(resultArr) );
    displaySites(resultArr);

    clearInputs ();
  } else {
    appearValidationPopup();

  }
      // console.log(resultArr);
}

function displaySites(arr) {
  var dataBox = "";
  for (var i = 0; i < arr.length; i++) {
    dataBox += `
      <tr>
        <td class="py-3">${i+1}</td>
        <td class="py-3">${arr[i].name}</td>
        <td class="py-3">
          <a href="${arr[i].url}" target="_blank" >
            <button class="btn btn-sm btn-outline-primary">
              <i class="fa-solid fa-eye"></i>
              <span>Visit</span>
            </button>
          </a>
        </td>
        <td class="py-3">
          <a href="">
            <button class="btn btn-sm btn-outline-danger" onclick="deleteSite(${i})">
              <i class="fa-solid fa-trash-can"></i>
              <span>Delete</span>
            </button>
          </a>
        </td>
      </tr>
    `
  }
  resultRows.innerHTML = dataBox;
};

function deleteSite(deletedIndex) {
  resultArr.splice(deletedIndex, 1);
  displaySites(resultArr);
  localStorage.setItem("data", JSON.stringify(resultArr));
};


function clearInputs () {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
};

function validationSiteName () {
  var regex = /^[A-Z][a-z]{2,9}$/;

  if (regex.test(bookmarkName.value)) {
    return true;
  } else {
    return false;
  }
}

function validationSiteUrl () {
  var regex = /^(www\.)[a-z]{2,}(\.com)$/;

  if (regex.test(bookmarkUrl.value)) {
    return true;
  } else {
    return false;
  }
}

function appearValidationPopup () {
  validationPopup.classList.toggle("d-none");
  validationPopup.classList.toggle("d-flex");
}
