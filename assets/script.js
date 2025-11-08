let currentStep = 1;
const totalSteps = 3;

const stepItems = document.querySelectorAll('.step-item');
const stepCircles = document.querySelectorAll('.step-circle');
const progressLine = document.getElementById('progress-line');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const photoUpload = document.getElementById('photo-upload');
const formSteps = document.querySelectorAll('.form-step');

function updateStepper() {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 80;
    progressLine.style.width = `${progressPercentage}%`;

    stepCircles.forEach((circle, index) => {
        const stepNumber = index + 1;

        if (stepNumber === currentStep) {
            circle.classList.remove('bg-[#FFE1AF]', 'text-gray-600');
            circle.classList.add('bg-[#957C62]', 'text-white');
        } else {
            circle.classList.remove('bg-[#957C62]', 'text-white');
            circle.classList.add('bg-[#FFE1AF]', 'text-gray-600');
        }
    });

    formSteps.forEach((form, index) => {
        if (index + 1 === currentStep) {
            form.classList.remove('hidden');
        } else {
            form.classList.add('hidden');
        }
    });

    prevBtn.disabled = currentStep === 1;

    if (currentStep === totalSteps) {
        nextBtn.textContent = 'Terminer';
    } else {
        nextBtn.textContent = 'Suivant';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepper();
    } else {
        alert('CV créé avec succès!');
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateStepper();
    }
});

photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const label = document.querySelector('label[for="photo-upload"]');
            label.innerHTML = `<img src="${event.target.result}" alt="Preview" class="w-full h-full object-cover rounded-lg">`;
        };
        reader.readAsDataURL(file);
    }
});

updateStepper();
