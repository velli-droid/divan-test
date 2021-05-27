// range slider

const rangeFilterWidth = document.querySelector('.range-filter_width');
const rangeSliderWidth = rangeFilterWidth.querySelector('.range-slider_width');


const rangeFilterLength = document.querySelector('.range-filter_length');
const rangeSliderLength = rangeFilterLength.querySelector('.range-slider_length');

const rangeFilterHeight = document.querySelector('.range-filter_height');
const rangeSliderHeight = rangeFilterHeight.querySelector('.range-slider_height');

function bindInputs(el, slider) {
    const inputMin = el.querySelector('.range-filter__input_min');
    const inputMax = el.querySelector('.range-filter__input_max');

    const inputs = [inputMin, inputMax];

    slider.noUiSlider.on('update', function(values, handle) {
        inputs[handle].value = Math.round(values[handle])
    });

    const setRangeSlider = function(i, value) {
        let arr = [null, null];
        arr[i] = value;
        slider.noUiSlider.set(arr);
    }

    inputs.forEach((item, index) => {
        item.addEventListener('change', function(e) {
            setRangeSlider(index, e.currentTarget.value);
        })
    })
}

if(rangeSliderWidth) {
    noUiSlider.create(rangeSliderWidth, {
        start: [80, 440],
        connect: true,
        range: {
            'min': 80,
            'max': 440
        }
    });

    bindInputs(rangeFilterWidth, rangeSliderWidth)
}

if(rangeSliderLength) {
    noUiSlider.create(rangeSliderLength, {
        start: [225, 550],
        connect: true,
        range: {
            'min': 225,
            'max': 550
        }
    });

    bindInputs(rangeFilterLength, rangeSliderLength)
}

if(rangeSliderHeight) {
    noUiSlider.create(rangeSliderHeight, {
        start: [0, 156],
        connect: true,
        range: {
            'min': 0,
            'max': 156
        }
    });

    bindInputs(rangeFilterHeight, rangeSliderHeight)
}


// accordion

function accordion(str) {
    const accordionEl = document.querySelector(str);
    if(!accordionEl) return;

    const accordionItems = [...accordionEl.querySelectorAll('.accordion-item')];
    accordionItems.forEach(item => {
        const accordionItemHeader = item.querySelector('.accordion-item__header');
        accordionItemHeader.onclick = function() {
            accordionItemHeader.classList.toggle('active');
        }
    });
}

accordion('.accordion_filters');

// popups

const body = document.querySelector('body');

function setFade(el) {
    el.classList.add('fade');
}

function setActive(el) {
    el.classList.add('active');
}

function removeFade(el) {
    el.classList.remove('fade');
}

function removeActive(el) {
    el.classList.remove('active');
}

function hidePopup(popup) {
    removeActive(popup);
    setTimeout(removeFade, 200, popup);
    body.classList.remove('no-scroll');
}

function showPopup(popup) {
    body.classList.add('no-scroll');
    setFade(popup);
    setTimeout(setActive, 0, popup);
    const popupClose = popup.querySelector('.side-popup__close');
    popupClose.onclick = function() {
        hidePopup(popup);
    }
    window.addEventListener('click', function(e) {
        if(e.target === popup) {
            hidePopup(popup);
        }
    });
}

const filtersLinks = document.querySelectorAll('.filters-list__link');
const filtersPopup = document.querySelector('.side-popup_filters');

filtersLinks.forEach(el => {
    el.onclick = function(e) {
        e.preventDefault();
        showPopup(filtersPopup)
    }
})

