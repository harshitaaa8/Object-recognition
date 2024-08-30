let net;
let result;
//let modelLoaded = false;

const imgEl = document.getElementById('img');
const resultEl = document.getElementById('result');
const imageInput = document.getElementById('imageInput');
const progressBar = document.getElementById('progressBar');

imageInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        imgEl.src = URL.createObjectURL(file);
    }
});

async function loadModel() {
    try {
        net = await mobilenet.load();
        //modelLoaded = true;
    } catch (e) {
        console.error('Failed to load the model:', e);
    }
}

async function displayImagePrediction() {
    try {
        resultEl.innerHTML = '';
        progressBar.style.width = '0%';
        progressBar.innerHTML = '0%';
        resultEl.innerHTML = 'Classifying...';

        result = await net.classify(imgEl, 3); // Classify the image, showing top 3 predictions.
        progressBar.style.width = '100%';
        progressBar.innerHTML = '100%';
        resultEl.innerHTML = '';

        const predictionsContainer = document.createElement('div');
        predictionsContainer.classList.add('predictions-container');

        result.forEach((item, index) => {
            const predictionCard = document.createElement('div');
            predictionCard.classList.add('prediction-card');

            const predictionText = document.createElement('p');
            predictionText.innerHTML = `<strong>Prediction ${index + 1}:</strong> ${item.className}`;
            predictionCard.appendChild(predictionText);

            const probabilityText = document.createElement('p');
            probabilityText.innerHTML = `<strong>Probability:</strong> ${(item.probability * 100).toFixed(2)}%`;
            predictionCard.appendChild(probabilityText);

            predictionsContainer.appendChild(predictionCard);
        });

        resultEl.appendChild(predictionsContainer);
    } catch (e) {
        console.error(e);
        resultEl.innerHTML = 'An error occurred. Please try again.';
    }
}



async function classifyImage() {
    if (imgEl.src) {
        await displayImagePrediction();
    } else {
        resultEl.innerHTML = 'Please select an image first.';
    }
}

function resetImage() {
    imgEl.src = ''; // Clear img
    progressBar.style.width = '0%'; // Reset progress bar
    progressBar.innerHTML = '0%';
    resultE1.innerHTML = ''; // Clear predictions
}

// Call function to load model
loadModel();