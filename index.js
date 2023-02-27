//-----------------------------------------Options-----------------------------------------
var optionsform1 = document.querySelectorAll(".options-form-1");

optionsform1.forEach(i => i.addEventListener('click', function () {
    this.classList.toggle("options-selected");
    this.children[1].checked = this.children[1].checked === true ? false : true;
}));


var optionsform2 = document.querySelectorAll(".options-form-2");

//--------------------------------------Multistep Swipe--------------------------------------

var i = 0;
var N = 0;
let meanSelected = false, medianSelected = false, modeSelected = false;
var Raw = [];
var rawInputs;
var frequencyX = [];
var frequencyY = [];
var frequencyXInputs, frequencyYInputs;
let typeOfData;
var next1 = document.querySelector("#next1");
var prev1 = document.querySelector("#previous1");
var cardcontainer = document.querySelector(".card-container");
var submit = document.querySelector("#submit");
var formFlag;
var Mean = document.querySelector("#Mean");
var Median = document.querySelector("#Median");
var Mode = document.querySelector("#Mode");

next1.addEventListener('click', function () {
    formFlag = 0
    optionsform1.forEach(i => {
        if (i.children[1].checked === true) { formFlag++ }
    });
    if (formFlag == 0) {
        alert("Select Any Output");
    }

    else {
        i = i + 480;
        cardcontainer.scrollTo(i, 0);
        optionsform1.forEach(i => {
            if (i.children[1].checked === true) {
                if (i.children[1].name == "Mean") {
                    meanSelected = true;
                }

                else if (i.children[1].name == "Median") {
                    medianSelected = true;
                }

                else if (i.children[1].name == "Mode") {
                    modeSelected = true;
                }
            }
        })
    }
})

prev1.addEventListener('click', function () {
    i = i - 480;
    cardcontainer.scrollTo(i, 0);
})

submit.addEventListener('click', function () {
    formFlag = 0
    optionsform2.forEach(i => {
        if (i.previousElementSibling.checked === true) {
            formFlag++;
            typeOfData = i.previousElementSibling.id;
        }
    });

    if (formFlag == 0 || formFlag == 2) {
        alert("Select Any One Option !!!!");
    }

    else {
        cardcontainer.style.opacity = '0';
        setTimeout(() => {
            cardcontainer.classList.add("display-none");
            document.querySelector(".solution").classList.remove("display-none");
            setTimeout(() => {
                document.querySelector(".solution").style.opacity = '1';
            }, 100);
        }, 600);
    }
})
//----------------------------------Number of Data Validation----------------------------------

N = document.querySelector("#N");
let nSubmitBtn = document.querySelector(".N-Submit");
nSubmitBtn.addEventListener('click', function () {
    if (N.value === "" || N.value <= 0) {
        alert("Enter Valid Value Of N !!!!")
        N.value = "";
        N.focus();
    }

    else {
        N.disabled = true;
        nSubmitBtn.children[0].classList.add("fly");
        nSubmitBtn.disabled = true;
        if (typeOfData == "Raw") {
            createRawElements();
        }

        else if (typeOfData == "Frequency") {
            createFrequencyElements();
        }
    }
})



// -------------------------------Element Creation For Raw Data-------------------------------

var rawDataContainer = document.querySelector(".Raw-Data");
function createRawElements() {
    var rawInputContainer = document.querySelector(".Raw-Data-Inputs");
    for (var i = 1; i <= N.value; i++) {
        let inputbox = document.createElement("input");
        inputbox.type = "number";
        inputbox.classList.add("RAW");
        inputbox.setAttribute('enterkeyhint', 'go');
        rawInputContainer.appendChild(inputbox)
    }
    rawDataContainer.classList.remove("display-none");
    setTimeout(() => {
        rawDataContainer.style.opacity = '1';
    }, 100);

    rawInputs = document.querySelectorAll(".RAW");
}

// -----------------Extracting Data From RAW Inputs and Pushing Them Into Array-----------------

let rawSubmitBtn = document.querySelector(".Raw-Submit");

rawSubmitBtn.addEventListener('click', function () {
    formFlag = 0;
    rawInputs.forEach(i => {
        if (i.value === "" || i.value == 0) {
            formFlag++;
        }
    });

    if (formFlag > 0) {
        alert('Enter Proper Data In Field 0 Or Blank Is Not Allowed');
    }

    else if (formFlag == 0) {
        rawInputs.forEach(i => {
            Raw.push(parseInt(i.value));
            i.disabled = true;
        })
        rawSubmitBtn.disabled = true;

        document.querySelector(".Ans").classList.remove("display-none");
        setTimeout(() => {
            document.querySelector(".Ans").style.opacity = "1";
        }, 100);


        if (meanSelected == true) {
            Mean.innerHTML = meanRaw(Raw);
            document.querySelectorAll(".Ans-container")[0].classList.remove("display-none");
        }

        if (medianSelected == true) {
            Median.innerHTML = medianRaw(Raw);
            document.querySelectorAll(".Ans-container")[1].classList.remove("display-none");
        }

        if (modeSelected == true) {
            Mode.innerHTML = modeRaw(Raw);
            document.querySelectorAll(".Ans-container")[2].classList.remove("display-none");
        }
    }
})

//----------------------------Element Creation For Frequency Data----------------------------

var frequencyDataContainer = document.querySelector(".Frequency-Data");
let xRow, yRow, xInput, yInput;

function createFrequencyElements() {
    for (var i = 1; i <= N.value; i++) {
        xRow = document.createElement("div");
        xInput = document.createElement("input");
        xInput.type = "number";
        xInput.classList.add("FREQUENCYx");
        xInput.enterKeyHint = "go";
        xRow.appendChild(xInput);
        document.querySelector(".Frequency-Data-Inputs .dataX p").after(xRow);

        yRow = document.createElement("div");
        yInput = document.createElement("input");
        yInput.type = "number";
        yInput.classList.add("FREQUENCYy");
        yInput.enterKeyHint = "go";
        yRow.appendChild(yInput);
        document.querySelector(".Frequency-Data-Inputs .dataY p").after(yRow);
    }

    frequencyDataContainer.classList.remove("display-none");
    setTimeout(() => {
        frequencyDataContainer.style.opacity = "1";
    }, 100);

    frequencyXInputs = document.querySelectorAll(".FREQUENCYx");
    frequencyYInputs = document.querySelectorAll(".FREQUENCYy");
}

// -----------------Extracting Data From Frequency Inputs and Pushing Them Into Array-------

let frequencySubmitBtn = document.querySelector(".Frequency-Submit");
frequencySubmitBtn.addEventListener('click', function () {
    formFlag = 0;
    frequencyXInputs.forEach(i => {
        if (i.value == 0 || i.value == "") {
            formFlag++;
        }
    });

    frequencyYInputs.forEach(i => {
        if (i.value == 0 || i.value == "") {
            formFlag++;
        }
    });

    if (formFlag > 0) {
        alert('Enter Proper Data In Field 0 Or Blank Is Not Allowed');
    }

    else if (formFlag == 0) {
        frequencyXInputs.forEach(i => {
            frequencyX.push(parseInt(i.value));
            i.disabled = true;
        });

        frequencyYInputs.forEach(
            i => {
                frequencyY.push(parseInt(i.value));
                i.disabled = true;
            }
        );

        frequencySubmitBtn.disabled = true;

        document.querySelector(".Ans").style.opacity = "1";

        if (meanSelected == true) {
            Mean.innerHTML = meanFrequency(frequencyX, frequencyY);
            document.querySelectorAll(".Ans-container")[0].classList.remove("display-none");
        }

        if (medianSelected == true) {
            Median.innerHTML = medianFrequency(frequencyX, frequencyY);
            document.querySelectorAll(".Ans-container")[1].classList.remove("display-none");
        }

        if (modeSelected == true) {
            Mode.innerHTML = modeFrequency(frequencyX, frequencyY);
            document.querySelectorAll(".Ans-container")[2].classList.remove("display-none");
        }

    }
})

// ---------------------------------------Formula---------------------------------------


// ----------------------------------------Raw Data--------------------------------------

function meanRaw(a) {
    var sum = 0;
    for (var i = 0; i <= a.length - 1; i++) {
        sum += a[i];
    }
    meanans = sum / N.value;
    return meanans.toFixed(4);
}

function medianRaw(a) {
    a.sort(function (a, b) {
        return a - b;
    });
    if (a.length % 2 == 0) {
        var p = a.length / 2;
        var q = (a.length / 2) + 1;
        medianans = (a[p - 1] + a[q - 1]) / 2;
        return medianans;
    }

    else {
        i = (a.length + 1) / 2;
        medianans = a[i - 1];
        return medianans;
    }
}

function modeRaw(arr) {
    // Create an object to store the frequency of each value in the array
    const frequency = {};
    // Loop through the array and count the frequency of each value
    arr.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
    });
    // Find the maximum frequency
    let maxFreq = 0;
    for (const val in frequency) {
        if (frequency[val] > maxFreq) {
            maxFreq = frequency[val];
        }
    }
    // Find all values that have the maximum frequency
    const mode = [];
    for (const val in frequency) {
        if (maxFreq != 1) {
            if (frequency[val] === maxFreq) {
                mode.push(parseInt(val));
            }
        }
        else {
            mode[0] = "-";
        }
    }
    // If there is more than one mode, return an array of modes
    // Otherwise, return the single mode
    return mode.length > 1 ? mode : mode[0];
}

// --------------------------------------Frequenxy Data---------------------------------------

var sum_f = 0;
function meanFrequency(d, f) {
    var sum_df = 0;
    var sum_f = 0;
    for (i = 0; i <= d.length - 1; i++) {
        sum_df += d[i] * f[i];
    }
    for (i = 0; i <= d.length - 1; i++) {
        sum_f += f[i];
    }
    return (sum_df / sum_f).toFixed(4);
}

function medianFrequency(d, f) {

    var cf = [];
    for (i = 0; i <= d.length - 1; i++) {
        sum_f += f[i];
        cf.push(sum_f);
    }

    if (sum_f % 2 == 0) {
        var p = sum_f / 2;
        var q = (sum_f / 2) + 1;
        for (i = 0; i <= d.length - 1; i++) {
            if (cf[i] >= p) {
                m1 = d[i];
                break;
            }
        }
        for (i = 0; i <= d.length - 1; i++) {
            if (cf[i] >= q) {
                m2 = d[i];
                break;
            }
        }
        median = (m1 + m2) / 2;
        return median;

    }

    else {
        m = (sum_f + 1) / 2;
        for (i = 0; i <= d.length - 1; i++) {
            if (cf[i] >= m) {
                median = d[i];
                break;
            }
        }
        return median;
    }
}

function modeFrequency(a, b) {
    var max = b[0];
    var mode = [];
    for (i = 1; i <= (b.length) - 1; i++) {
        if (b[i] >= max) {
            if (b[i] == max)
                mode.push(a[i]);
            else if (b[i] > max) {
                max = b[i];
                mode.length = 0;
                mode.push(a[i]);
            }
        }
    }

    return mode;
}
