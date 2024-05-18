const container = document.getElementById("container");

// creating layout of google sheets

// function to convert index into alphabet
function indexToalphabet(index) {
  let alphabet = String.fromCharCode(65 + index);
  return alphabet;
}

// adding right header
// let count = 0;
const rowHeader = document.createElement("div");
for (let row = 0; row <= 40; row++) {
  // count++;
  const header = document.createElement("div");
  if (row != 0) {
    header.textContent = row;
  } else {
    header.id = "white-header";
  }
  header.className = "cell header-cell";
  rowHeader.append(header);
}
container.append(rowHeader);

// showing selected cell no.
let cellName = document.getElementById("cellName");
cellName.innerText="Selected Cell";

// adding rows and columns along with top header

for (let row = 0; row <= 20; row++) {
  const rowElement = document.createElement("div");
  const colHeader = document.createElement("div");
  let alphabet = indexToalphabet(row);
  colHeader.textContent = alphabet;
  colHeader.className = "cell header-cell";
  rowElement.append(colHeader);

  // rowElement.style.display = "contents";
  for (let col = 0; col <= 40; col++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.contentEditable = true;

    // add click event listener to each cell
    cell.addEventListener("click", (event) => handleCellClick(event, cell));
    // showing cellNAme
    cell.addEventListener("click", () => {
      cellName.innerHTML = `${alphabet}${col + 1}`;
    });
    rowElement.append(cell);
  }
  container.append(rowElement);
}

// selecting cells
let selectedCells = new Set();

// ctrl key/met key

function handleCellClick(event, cell) {

  if (!event.ctrlKey && !event.metaKey) {
    selectedCells.forEach((cell) => cell.classList.remove("cell-selected"));
    selectedCells.clear();
  }

  // check if cell is clicked once or twice
  if (!selectedCells.has(cell)) {
    cell.classList.add("cell-selected");
    selectedCells.add(cell);
  } else {
    cell.classList.remove("cell-selected");
    selectedCells.delete(cell);
  }
  // localStorage.setItem(cell);
}

// adding functionalities to buttons - bold,italic,strikethrough

const bold = document.getElementById("bold");
const italic = document.getElementById("italic");
const strikethrough = document.getElementById("strikethrough");
const colorPicker = document.getElementById("color-picker");

bold.addEventListener("click", () => {
  selectedCells.forEach((c) => {
    if (c.style.fontWeight != "bold") {
      c.style.fontWeight = "bold";
    } else {
      c.style.fontWeight = "normal";
    }
  });
});

italic.addEventListener("click", () => {
  selectedCells.forEach((c) => {
    if (c.style.fontStyle != "italic") {
      c.style.fontStyle = "italic";
    } else {
      c.style.fontStyle = "normal";
    }
  });
});

strikethrough.addEventListener("click", () => {
  selectedCells.forEach(
    (cell) =>
      (cell.style.textDecoration =
        cell.style.textDecoration === "line-through" ? "none" : "line-through")
  );
});

colorPicker.addEventListener("change", () => {
  selectedCells.forEach((c) => {
    if (c.style.color != colorPicker.value) {
      c.style.color = colorPicker.value;
    } else {
      c.style.color = "black";
    }
  });
});

// format as currency, percentage, normal
let isPercent = false;
let isCurrency = false;

let currency = document.getElementById("currency");
let percentage = document.getElementById("percentage");
let normal = document.getElementById("normalText");

currency.addEventListener("click", () => {
  selectedCells.forEach((cell) => {
    let input = cell.innerText;
    let newInput = "";
    if (!isPercent && !isCurrency) {
      console.log("i am if");
      let newInput = "$" + input + ".00";
      cell.innerHTML = newInput;
    } else if (isPercent && !isCurrency) {
      newInput = "$";
      console.log("i am else");
      for (let i = 1; i < input.length; i++) {
        newInput += input[i];
      }
      cell.innerHTML = newInput;
    } else if (isCurrency) {
      return;
    }
    isCurrency = true;
    isPercent = false;
  });
});

percentage.addEventListener("click", () => {
  selectedCells.forEach((cell) => {
    let input = cell.innerText;
    let newInput = "";
    if (!isCurrency && !isPercent) {
      console.log("i am if");
      let newInput = "%" + input + ".00";
      cell.innerHTML = newInput;
    } else if (isCurrency && !isPercent) {
      newInput = "%";
      console.log("i am else");
      for (let i = 1; i < input.length; i++) {
        newInput += input[i];
      }
      cell.innerHTML = newInput;
    } else if (isPercent) {
      return;
    }
    isCurrency = false;
    isPercent = true;
  });
});

normal.addEventListener("click", () => {
  selectedCells.forEach((cell) => {
    let input = cell.innerText;
    let newInput = "";
    let i = 0;

    // Remove any leading $ or % symbol
    if (input[i] == "$" || input[i] == "%") {
      i++;
    }

    // Extract the numeric part of the string
    for (; i < input.length; i++) {
      if (input[i] == ".") {
        break;
      }
      newInput += input[i];
    }

    cell.innerText = newInput;
  });

  isCurrency = false;
  isPercent = false;
});

// font size

let decFontSize = document.getElementById("fontDec");
let incFontsize = document.getElementById("fontInc");

let fontSizeInpt = document.getElementById("FontSize");

let fontSize = fontSizeInpt.value;
container.style.fontSize = fontSize + "px";
console.log(fontSize);

// manually change size
fontSizeInpt.addEventListener("change", (e) => {
  let newInput = e.target.value;
  fontSize = newInput;
  container.style.fontSize = fontSize + "px";
});

// inc button
incFontsize.addEventListener("click", () => {
  // increasing size of selected cell
  if (selectedCells.size != 0) {
    selectedCells.forEach((cell) => {
      fontSize++;
      cell.style.fontSize = fontSize + "px";
      fontSizeInpt.value = fontSize;
    });
  }
  // increasing overall size of the sheet
  else {
    fontSize++;
    container.style.fontSize = fontSize + "px";
    fontSizeInpt.value = fontSize;
  }
});

// dec button
decFontSize.addEventListener("click", () => {
  // decreasing size of selected cell
  if (selectedCells.size != 0) {
    selectedCells.forEach((cell) => {
      fontSize--;
      cell.style.fontSize = fontSize + "px";
      fontSizeInpt.value = fontSize;
    });
  }
  // decreasing overall size of the sheet
  else {
    fontSize--;
    container.style.fontSize = fontSize + "px";
    fontSizeInpt.value = fontSize;
  }
});

// font style/family

// handling dropdown for options of font style
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// handling font style/family

let arial = document.getElementById("Arial");
let tnr = document.getElementById("tnr");
let courier = document.getElementById("Courier");
let cursive = document.getElementById("cursive");
let franklin = document.getElementById("Franklin");
let brush = document.getElementById("brush");

arial.addEventListener("click", () => {
  if (selectedCells.size == 0) {
    container.style.fontFamily = "Arial";
  } else {
    selectedCells.forEach((cell) => {
      cell.style.fontFamily = "Arial";
    });
  }
});

courier.addEventListener("click", () => {
  if (selectedCells.size == 0) {
    container.style.fontFamily = "Courier New";
  } else {
    selectedCells.forEach((cell) => {
      cell.style.fontFamily = "Courier New";
    });
  }
});

franklin.addEventListener("click", () => {
  if (selectedCells.size == 0) {
    container.style.fontFamily = "Franklin Gothic Medium";
  } else {
    selectedCells.forEach((cell) => {
      cell.style.fontFamily = "Franklin Gothic Medium";
    });
  }
});

tnr.addEventListener("click", () => {
  if (selectedCells.size == 0) {
    container.style.fontFamily = "Times New Roman";
  } else {
    selectedCells.forEach((cell) => {
      cell.style.fontFamily = "Times New Roman";
    });
  }
});

cursive.addEventListener("click", () => {
  if (selectedCells.size == 0) {
    container.style.fontFamily = "cursive";
  } else {
    selectedCells.forEach((cell) => {
      cell.style.fontFamily = "cursive";
    });
  }
});

brush.addEventListener("click", () => {
  if (selectedCells.size == 0) {
    container.style.fontFamily = "Brush Script MT";
  } else {
    selectedCells.forEach((cell) => {
      cell.style.fontFamily = "Brush Script MT";
    });
  }
});

// align text

let alignRight = document.getElementById("align-right");
let alignLeft = document.getElementById("align-left");
let alignCenter = document.getElementById("align-center");

alignRight.addEventListener("click", () => {
  selectedCells.forEach((cell) => {
    cell.style.textAlign = "right";
  });
});

alignLeft.addEventListener("click", () => {
    selectedCells.forEach((cell) => {
      cell.style.textAlign = "left";
    });
  });

alignCenter.addEventListener("click", () => {
    selectedCells.forEach((cell) => {
      cell.style.textAlign = "center";
    });
  });



// border
let addBorder = document.getElementById("addBorder");
let noBorder = document.getElementById("noBorder");

addBorder.addEventListener("click",()=>{
    selectedCells.forEach(cell=>{
        cell.style.border = "1px solid black";
    })
})

noBorder.addEventListener("click",()=>{
    selectedCells.forEach(cell=>{
        cell.style.border = "1px solid #C4C7C5";
    })
})