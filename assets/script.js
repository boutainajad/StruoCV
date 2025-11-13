let currentStep = 1;
const totalSteps = 8;

let cvData = {
    personalInfo: {},
    experiences: [],
    formations: [],
    competences: {
        techniques: [],
        transverses: []
    },
    langues: [],
    certifications: [],
    loisirs: []
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
    const addexper = document.querySelector(".addexper");
    addexper.addEventListener("click", (e) => {
        e.preventDefault();
        
        const titre = document.querySelector('.input-titre').value.trim();
        const entreprise = document.querySelector('.input-entreprise').value.trim();
        const datedebut = document.querySelector('.inpute-datedebut').value.trim();
        const datefin = document.querySelector('.input-datefin').value.trim();
        const description = document.querySelector('.input-description').value.trim();
        const displayexper = document.getElementById('displayexper');

        if (!titre || !entreprise || !datedebut || !datefin || !description) {
            alert('Veuillez remplir tous les champs!');
            return;
        }

        const experienceObj = {
            id: Date.now(),
            titre: titre,
            entreprise: entreprise,
            datedebut: datedebut,
            datefin: datefin,
            description: description,
        };
        
        cvData.experiences.push(experienceObj);
        alert('Expérience ajoutée avec succès!');
    
        displayexper.innerHTML = cvData.experiences.map((item) => {
            return `
        <div class = "flex justify-around  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
            <div>
                <p class="font-semibold text-gray-800">Titre: ${item.titre}</p>
                <p class="text-gray-600">Entreprise: ${item.entreprise}</p>
                <p class="text-gray-600">Début: ${item.datedebut}</p>
                <p class="text-gray-600">Fin: ${item.datefin}</p>
                <p class="text-gray-600">Description: ${item.description}</p>
             </div>
            <div class="pt-10">
            <button class =" addexper px-6 py-2 bg-[#B77466] text-white rounded-lg hover:bg-[#A66356] font-medium">suprimer</button>
             </div>
         </div>
            `;
        }).join('');

        document.querySelector('.input-titre').value = '';
        document.querySelector('.input-entreprise').value = '';
        document.querySelector('.inpute-datedebut').value = '';
        document.querySelector('.input-datefin').value = '';
        document.querySelector('.input-description').value = '';
    
    displayexper.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const parentDiv = e.target.closest("div.flex");
        const titre = parentDiv.querySelector(".font-semibold").textContent.replace("Titre: ", "").trim();
            console.log("uhiyg");
        const confirmation = confirm(`Voulez-vous vraiment supprimer l'expérience "${titre}" ?`);
        if (confirmation) {
            cvData.experiences = cvData.experiences.filter(item => item.titre !== titre);
            parentDiv.remove();
        }
    }
});


    });  
}
experience();

function addFormation() {
    const addfor = document.querySelector(".addfor");
    addfor.addEventListener("click", (e) => {
        e.preventDefault();
        
        const diplome = document.querySelector('.input-diplome').value.trim();
        const ecole = document.querySelector('.input-ecole').value.trim();
        const anneeDebut = document.querySelector('.input-debut').value.trim();
        const anneeFin = document.querySelector('.input-fin').value.trim();
        const displayForemation = document.getElementById("disformation");

        if (!diplome || !ecole || !anneeDebut || !anneeFin) {
            alert('Veuillez remplir tous les champs!');
            return;
        }

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
            <div class = "flex justify-around  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
            <div>
                <p class="font-semibold text-gray-800">Diplôme: ${item.diplome}</p>
                <p class="text-gray-600">École: ${item.ecole}</p>
                <p class="text-gray-600">Début: ${item.anneeDebut}</p>
                <p class="text-gray-600">Fin: ${item.anneeFin}</p>
                </div>
                <div class="pt-10">
            <button class =" addexper px-6 py-2 bg-[#B77466] text-white rounded-lg hover:bg-[#A66356] font-medium">suprimer</button>
             </div>
                
            </div>
            `;
        }).join('');

        document.querySelector('.input-diplome').value = '';
        document.querySelector('.input-ecole').value = '';
        document.querySelector('.input-debut').value = '';
        document.querySelector('.input-fin').value = '';
    });
}
addFormation();

function addCompetenceTech() {
    const addtech = document.querySelector(".addtech");
    addtech.addEventListener("click", (e) => {
        e.preventDefault();
        
        const competence = document.querySelector('.input-tech').value.trim();
        const distech = document.getElementById("distech");

        if (!competence) {
            alert('Veuillez entrer une compétence!');
            return;
        }

        const compObj = {
            id: Date.now(),
            competence: competence
        };
        
        cvData.competences.techniques.push(compObj);
        alert('Compétence technique ajoutée avec succès!');

        distech.innerHTML = cvData.competences.techniques.map((item) => {
            return `
            <div class = "flex justify-around  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                <div>
                ${item.competence}
            </div>
            <div >
            <button class =" addexper px-6 py-2 bg-[#B77466] text-white rounded-lg hover:bg-[#A66356] font-medium">suprimer</button>
             </div>
            </div>
            `;
        }).join('');

        document.querySelector('.input-tech').value = '';
    });
}
addCompetenceTech();

function addCompetenceTransverse() {
    const addtransverse = document.querySelector(".addtransverse");
    addtransverse.addEventListener("click", (e) => {
        e.preventDefault();
        
        const competence = document.querySelector('.input-transverse').value.trim();
        const distransverse = document.getElementById("distransverse");

        if (!competence) {
            alert('Veuillez entrer une compétence!');
            return;
        }

        const compObj = {
            id: Date.now(),
            competence: competence
        };
        
        cvData.competences.transverses.push(compObj);
        alert('Compétence transverse ajoutée avec succès!');

        distransverse.innerHTML = cvData.competences.transverses.map((item) => {
           return `
            <div class = "flex justify-around  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                <div>
                ${item.competence}
            </div>
            <div>
            <button class =" addexper px-6 py-2 bg-[#B77466] text-white rounded-lg hover:bg-[#A66356] font-medium">suprimer</button>
             </div>
            </div>
            `;
        }).join('');

        document.querySelector('.input-transverse').value = '';
    });
}
addCompetenceTransverse();

function addLangue() {
    const addlangue = document.querySelector(".addlangue");
    addlangue.addEventListener("click", (e) => {
        e.preventDefault();
        
        const langue = document.querySelector('.input-langue').value.trim();
        const niveau = document.querySelector('.input-niveau').value.trim();
        const displangue = document.getElementById("displangue");

        if (!langue || !niveau) {
            alert('Veuillez remplir tous les champs!');
            return;
        }

        const langueObj = {
            id: Date.now(),
            langue: langue,
            niveau: niveau
        };
        
        cvData.langues.push(langueObj);
        alert('Langue ajoutée avec succès!');

        displangue.innerHTML = cvData.langues.map((item) => {
            return `
            <div class = "flex justify-around  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
            <div>

                <p class="font-semibold text-gray-800">Langue: ${item.langue}</p>
                <p class="text-gray-600">Niveau: ${item.niveau}</p>
            </div>
            <div class="pt-5">
            <button class =" addexper px-6 py-2 bg-[#B77466] text-white rounded-lg hover:bg-[#A66356] font-medium">suprimer</button>
             </div>
            </div>
            `;
        }).join('');

        document.querySelector('.input-langue').value = '';
        document.querySelector('.input-niveau').value = '';
    });
}
addLangue();

function addCertification() {
    const addcertif = document.querySelector(".addcertif");
    addcertif.addEventListener("click", (e) => {
        e.preventDefault();
        
        const certification = document.querySelector('.input-certification').value.trim();
        const organisme = document.querySelector('.input-organisme').value.trim();
        const annee = document.querySelector('.input-annee-certif').value.trim();
        const discertif = document.getElementById("discertif");

        if (!certification || !organisme || !annee) {
            alert('Veuillez remplir tous les champs!');
            return;
        }

        const certifObj = {
            id: Date.now(),
            certification: certification,
            organisme: organisme,
            annee: annee
        };
        
        cvData.certifications.push(certifObj);
        alert('Certification ajoutée avec succès!');

        discertif.innerHTML = cvData.certifications.map((item) => {
            return `
            <div class = "flex justify-around  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
             <div>
                <p class="font-semibold text-gray-800">Certification: ${item.certification}</p>
                <p class="text-gray-600">Organisme: ${item.organisme}</p>
                <p class="text-gray-600">Année: ${item.annee}</p>
               
             </div>
             <div class="pt-5">

            <button class =" addexper px-6 py-2 bg-[#B77466] text-white rounded-lg hover:bg-[#A66356] font-medium">suprimer</button>
             </div>
            </div>
            `;
        }).join('');

        document.querySelector('.input-certification').value = '';
        document.querySelector('.input-organisme').value = '';
        document.querySelector('.input-annee-certif').value = '';
    });
}
addCertification();

function addLoisir() {
    const addloisir = document.querySelector(".addloisir");
    addloisir.addEventListener("click", (e) => {
        e.preventDefault();
        
        const loisir = document.querySelector('.input-loisir').value.trim();
        const disloisir = document.getElementById("disloisir");

        if (!loisir) {
            alert('Veuillez entrer un loisir!');
            return;
        }

        const loisirObj = {
            id: Date.now(),
            loisir: loisir
        };
        
        cvData.loisirs.push(loisirObj);
        alert('Loisir ajouté avec succès!');

        disloisir.innerHTML = cvData.loisirs.map((item) => {
            return `
            <div class = "block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-100">
            <div class =  "flex content-center">
             ${item.loisir}
             </div>
         <div class="pt-10">

            <button class =" addexper px-6 py-2 bg-[#B77466] text-white rounded-lg hover:bg-[#A66356] font-medium">suprimer</button>
             </div>
            </div>
            `;
        }).join('');

        document.querySelector('.input-loisir').value = '';
    });
}
addLoisir();

function addInfoPersonale() {
    const form = document.querySelector('#step-1');
    cvData.personalInfo.firstName = form.querySelector('input[placeholder="Votre prénom"]')?.value.trim();
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

    console.log('Données du CV:', cvData);

    if (currentStep < totalSteps) {
        currentStep++;
        updateStepper();
    } else {
        alert('CV créé avec succès!');
        console.log('Données finales du CV:', cvData);
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
            cvData.personalInfo.photo = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

updateStepper();