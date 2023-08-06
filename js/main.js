// aos
AOS.init({
    once: true,
    duration: 500,
    easing: "slide",
});

///////////////////////////////////
let navLink = document.querySelectorAll('.nav-link');
navLink.forEach(link => {
    link.addEventListener("click", (event) => {
        navLink.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    })
})
// toggle nav

let myNavbar = document.getElementById("navbarNav"),
    navbarCollapse = document.querySelector(".navbar-collapse");
navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
myNavbar.addEventListener("shown.bs.collapse", _ => myNavbar.style.background = '#091242');

myNavbar.addEventListener("hidden.bs.collapse", _ => myNavbar.style.background = 'rgba(9,18,66,0.25)');

function closeNavbar() {
    if (navbarCollapse.classList.contains("show")) {
        var startHeight = navbarCollapse.scrollHeight;
        var step = Math.ceil(startHeight / 10); // Change the number of steps for animation smoothness

        function animateCollapse() {
            startHeight -= step;
            if (startHeight <= 0) {
                navbarCollapse.style.height = "0"; // Set the height to 0 to initiate the collapse animation
                navbarCollapse.classList.remove("show"); // After the animation, remove the "show" class
                navbarCollapse.removeEventListener("animationFrame", animateCollapse);
            } else {
                navbarCollapse.style.height = startHeight + "px";
                requestAnimationFrame(animateCollapse);
            }
        }

        requestAnimationFrame(animateCollapse);
    }
    myNavbar.style.background = 'rgba(9,18,66,0.25)'
}

navbarLinks.forEach(function (link) {
    link.addEventListener("click", closeNavbar);
});

// Function to start the counter for each element
function animateNumber(obj, start, end, signal, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + signal;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// displayImageCount
function displayImageCount(XlargeNumberScreens, largeNumberScreens, mobileNumberScreens, imagContainer, imagesSelect) {
    const XlargeScreenImageCount = XlargeNumberScreens;
    const largeScreenImageCount = largeNumberScreens;
    const mobileScreenImageCount = mobileNumberScreens;
    const imagesContainer = document.getElementById(`${imagContainer}`);
    const images = imagesContainer.querySelectorAll(`${imagesSelect}`);


    let totalImagesToDisplay = null;
    if (window.innerWidth >= 1400) {
        totalImagesToDisplay = XlargeScreenImageCount;
    } else if (window.innerWidth >= 768) {
        totalImagesToDisplay = largeScreenImageCount;
    } else {
        totalImagesToDisplay = mobileScreenImageCount;
    }


// قم بإخفاء الصور التي لا تحتاج إلى عرضها
    for (let i = totalImagesToDisplay; i < images.length; i++) {
        images[i].style.display = 'none';
    }
}

displayImageCount(5, 4, 3, 'transportation', '.img-fluid');
// slider
// Initialize Glide.js
var glide = new Glide('.glide', {
    type: 'carousel',
    perView: 2,
    gap: 0,
    breakpoints: {
        991: {
            perView: 1,
        }
    }
})
glide.mount();

// validation

let form = document.querySelector('form'),
    inputValid = form.querySelectorAll("input[type=text]");

function addValidationToInputs(inputValid) {
    inputValid.forEach((e) => {
        e.addEventListener('blur', function () {
            if (e.value.length > 1) {
                e.classList.add('valid');
                e.parentElement.querySelector('.required').style.display = 'none';
            } else {
                e.parentElement.querySelector('.required').style.display = 'block';
                e.classList.remove('valid');
            }
        });
    });
}

addValidationToInputs(inputValid);

function $validation(inputValid) {
    let validationRadio = true,
        validationCheckbox = true,
        validationInput = true;
    inputValid.forEach((e) => {
        if (e.type === 'radio') {
            validationRadio = false
        } else if (e.type === 'checkbox') {
            validationCheckbox = false
        } else {
            validationInput = false;
        }
    });
    inputValid.forEach((e) => {
        switch (e.type) {
            case 'radio' :
                (e.checked) ? validationRadio = true : '';
                break;
            case 'checkbox' :
                (e.checked) ? validationCheckbox = true : '';
                break;
            default:
                validationInput = false
                if (e.value.length > 1) {
                    validationInput = true;
                }
        }
    });
    return validationRadio & validationCheckbox & validationInput;
}

function triggerBlurOnInputs(inputList) {
    inputList.forEach((input) => {
        input.dispatchEvent(new Event('blur'));
    });
}

form.onsubmit = function (e) {
    triggerBlurOnInputs(inputValid);
    addValidationToInputs(inputValid);
    if ($validation(inputValid)) {
        console.log('All Fields valid');
    } else {
        e.preventDefault();
    }
}

// // Function to perform the change when the target div is shown

window.addEventListener("scroll", reveal)
let flag = true;

function reveal() {
    let reveals = document.querySelectorAll('.reveal');
    reveals.forEach((reveal) => {
        let revealTop = reveal.getBoundingClientRect().top,
            windowHeight = window.innerHeight,
            revealpoint = 150;
        if (flag && revealTop < windowHeight - revealpoint) {
            document.querySelectorAll('.reveal').forEach(el => {
                animateNumber(el, 0, parseInt(el.dataset.number, 10), '+', 5000)
            })
            flag = false;
        }
    })
}