let currentStep = 1;
const totalSteps = 5;

let cvData = {
    personalInfo: {},
    experiences: [],
    formations: [],
    competences: {}
};

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
function experience() {
    const addexper = document.querySelector(".addexper")
    addexper.addEventListener("click", (e) => {
        e.preventDefault()
        const titre = document.querySelector('.input-titre').value.trim();
        const entreprise = document.querySelector('.input-entreprise').value.trim();
        const datedebut = document.querySelector('.inpute-datedebut').value.trim();
        const datefin = document.querySelector('.input-datefin').value.trim();
        const description = document.querySelector('.input-description').value.trim();
        const displayexper = document.getElementById('displayexper');

        const experience = {
            id: Date.now(),
            titre: titre,
            entreprise: entreprise,
            datedebut: datedebut,
            datefin: datefin,
            description: description,
        }
        cvData.experiences.push(experience);
        alert('experience ajoutée avec succès!');
    
        displayexper.innerHTML = cvData.experiences.map((item) => {
            return `
            <div class=" block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  hover:bg-gray-100 dark:bg-gray-500 dark:border-gray-700 dark:hover:bg-gray-700">
            <p> titre: ${item.titre}</p>
            <p> entreprise: ${item.entreprise}</p>
            <p>debut : ${item.datedebut}</p>
            <p>fin : ${item.datefin}</p>
            <p>description : ${item.description}</p>
            </div>
            `
        }).join('')

    })
}
experience();
function addFormation() {


    const addfor = document.querySelector(".addfor")
    addfor.addEventListener("click", (e) => {
        e.preventDefault()
        const diplome = document.querySelector('.input-diplome').value.trim();
        const ecole = document.querySelector('.input-ecole').value.trim();
        const anneeDebut = document.querySelector('.input-debut').value.trim();
        const anneeFin = document.querySelector('.input-fin').value.trim();

        const displayForemation = document.getElementById("disformation")

        const formation = {
            id: Date.now(),
            diplome: diplome,
            ecole: ecole,
            anneeDebut: anneeDebut,
            anneeFin: anneeFin
        };
        cvData.formations.push(formation);

        alert('Formation ajoutée avec succès!');

        displayForemation.innerHTML = cvData.formations.map((item) => {

            return `
          <div class=" block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  hover:bg-gray-100 dark:bg-gray-500 dark:border-gray-700 dark:hover:bg-gray-700">
            <p>diplom : ${item.diplome}</p>
            <p>ecole : ${item.ecole}</p>
            <p>debut : ${item.anneeDebut}</p>
            <p>fin : ${item.anneeFin}</p>
          </div>
            `
        }).join('')
    })
}
addFormation()

function addInfoPersonale() {
    const form = document.querySelector('#step-1');
    cvData.personalInfo.firstName = form.querySelector('input[placeholder="Votre prénom"]')?.value.trim()
    cvData.personalInfo.lastName = form.querySelector('input[placeholder="Votre nom"]')?.value.trim();
    cvData.personalInfo.email = form.querySelector('input[type="email"]')?.value.trim();
    cvData.personalInfo.phone = form.querySelector('input[type="tel"]')?.value.trim();
    cvData.personalInfo.address = form.querySelector('input[placeholder="Votre adresse complète"]')?.value.trim();
    cvData.personalInfo.city = form.querySelector('input[placeholder="Casablanca"]')?.value.trim();
    cvData.personalInfo.postalCode = form.querySelector('input[placeholder="20000"]')?.value.trim();
}
function validateStep1() {
    const form = document.querySelector('#step-1');

    const firstName = form.querySelector('input[placeholder="Votre prénom"]')?.value.trim();
    const lastName = form.querySelector('input[placeholder="Votre nom"]')?.value.trim();
    const email = form.querySelector('input[type="email"]')?.value.trim();
    const phone = form.querySelector('input[type="tel"]')?.value.trim();
    const address = form.querySelector('input[placeholder="Votre adresse complète"]')?.value.trim();
    const city = form.querySelector('input[placeholder="Casablanca"]')?.value.trim();
    const postalCode = form.querySelector('input[placeholder="20000"]')?.value.trim();


    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert('Veuillez entrer un email valide.');
        return false;
    }

    if (phone.length < 8) {
        alert('Veuillez entrer un numéro de téléphone valide.');
        return false;
    }

    return true;
}
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentStep === 1) {
        if (!validateStep1()) {
            return;
        }
        addInfoPersonale();
    }


    console.log(cvData);

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

// photoUpload.addEventListener('change', (e) => {
//     const file = e.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const label = document.querySelector('label[for="photo-upload"]');
//             label.innerHTML = `<img src="${event.target.result}" alt="Preview" class="w-full h-full object-cover rounded-lg">`;
//         };
//         reader.readAsDataURL(file);
//     }
// });

updateStepper();