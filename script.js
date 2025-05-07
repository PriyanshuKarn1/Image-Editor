const fileInput = document.querySelector(".file-input");
filterbtns = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterValue = document.querySelector(".filter-info .value");
filterSlider = document.querySelector(".slider input");
rotateOptions = document.querySelectorAll(".rotate button");
previewImg = document.querySelector(".preview-img img");
resetFilterBtn = document.querySelector(".reset-filter");
choseImg = document.querySelector(".chose-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical}) `; // applying the rotation to the image
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`; // applying the filter to the image
};

const loadImage = () => {
  let file = fileInput.files[0]; // getting user-selected file
  if (!file) return; // if user doesn't select any file, return
  previewImg.src = URL.createObjectURL(file); // getting the file URL and setting it as the source of the image
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};
filterbtns.forEach((option) => {
  option.addEventListener("click", () => {
    // adding click event to each filter button
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = 200;
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`; // updating the filter value
    } else if (option.id === "saturation") {
      filterSlider.max = 200;
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`; // updating the filter value
    } else if (option.id === "inversion") {
      filterSlider.max = 100;
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`; // updating the filter value
    } else {
      filterSlider.max = 100;
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`; // updating the filter value
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`; // updating the filter value
  const selectedFilter = document.querySelector(".filter .active"); // getting the selected filter

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    // adding click event to all rotate/flip buttons
    if (btn.id === "left") {
      rotate -= 90; // decreasing the rotate value by 90
    } else if (btn.id === "right") {
      rotate += 90; // increasing the rotate value by 90
    } else if (btn.id === "horizontal") {
      // if flipHorizontal value is 1, make it -1, else make it 1
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      // if flipVertical value is 1, make it -1, else make it 1
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

const resetFilter = () => {
  // resetting all the filters
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterbtns[0].click();
  applyFilters();
};

fileInput.addEventListener("change", loadImage);
resetFilterBtn.addEventListener("click", resetFilter);
filterSlider.addEventListener("input", updateFilter);
choseImg.addEventListener("click", () => fileInput.click());
