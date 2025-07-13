// Study Reviewer Application JavaScript

// Application state
let currentUser = null;
let currentView = 'login';
let currentLessonId = null;
let lessonProgress = JSON.parse(localStorage.getItem('lessonProgress')) || {};

// Default password
const DEFAULT_PASSWORD = 'study2024';

// Lesson data
const lessonsData = {
    'lesson-1': {
        title: 'Humanities and Contemporary Art',
        content: [
            { type: 'heading', content: 'HUMANITIES' },
            { type: 'definition', content: 'Study of human experience through philosophy, history, literature, art, music, and language as their mode of expression.' },
            { type: 'heading', content: 'Two Main Types of Study' },
            { type: 'text', content: 'SCIENCES - Study of the external world' },
            { type: 'text', content: 'HUMANITIES - Expression of the internal world of a person' },
            { type: 'heading', content: 'CONTEMPORARY ART' },
            { type: 'definition', content: 'Art that springs out of the present-day events. Produced by 21st century artists.' },
            { type: 'heading', content: 'Contemporary vs Modern Art' },
            { type: 'text', content: 'CONTEMPORARY ART - Time period in which they have existed. Contempo (with the times) - Art of the present time' },
            { type: 'text', content: 'MODERN ART - Emerged in the late 1800\'s, grew for more or less a century, developed as styles and techniques' },
            { type: 'heading', content: 'INTEGRATIVE ART' },
            { type: 'definition', content: 'Crossbreeding in the contemporary scene has resulted in hybrid art. Interactive and multi-disciplinary in nature. Consists of ideas and practices from different branches of learning.' },
            { type: 'heading', content: 'Three Great Artists (Cultural Center of the Philippines)' },
            { type: 'list', content: 'Notable Filipino Artists', items: [
                'LISA MACUJA - International singer and musical actress',
                'Rare Elizalde - Prima ballerina',
                'Cecil Licad - International classical pianist',
                'Lea Salonga - Performance artist known for "Legends and the classics"'
            ]},
            { type: 'heading', content: 'The Subject of Art' },
            { type: 'definition', content: 'Every work of art has a subject - the very core of its conception.' },
            { type: 'text', content: 'SUBJECT/TOPIC - Person, animal, thing, or issue that represents the work.' },
            { type: 'text', content: 'THEME/SUBSTANCE - Recurring idea or element. Ideas, thoughts, and feelings of artist.' },
            { type: 'heading', content: 'Visual Design Categories' },
            { type: 'text', content: 'RECOGNIZABLE SUBJECT - Realistic, representational, or objective art' },
            { type: 'text', content: 'NOT RECOGNIZABLE - Non-representational or non-objective art' },
            { type: 'heading', content: 'Different Ways of Depicting a Subject' },
            { type: 'list', content: 'Artistic Approaches', items: [
                'REALISM (Araceli Dans) - Subject is done the way it actually looks',
                'DISTORTION (Norma Belleza) - Artists use their imagination and alter the subject to their desires',
                'ABSTRACTION (Pablo Picasso & Vicente Manansala) - Artist breaks apart a subject and rearranges in a different manner',
                'NON-OBJECTIVISM (Roberto Chabet) - No subject at all, pure elements (line, shape, color, etc.)'
            ]},
            { type: 'heading', content: 'Philippine Contemporary Art Themes' },
            { type: 'list', content: 'Common Themes', items: [
                'Social, Economic, Political Issues',
                'Ethnic and Indigenous Concerns',
                'Current Events'
            ]},
            { type: 'list', content: 'Common Subjects', items: [
                'Philippine Folklore and Mythology',
                'Philosophical Thoughts',
                'Life and Landscapes',
                'Genre Scenes and Portraits',
                'Philippine Fiesta and Landmarks'
            ]},
            { type: 'heading', content: 'Elements of Art' },
            { type: 'definition', content: 'Different art forms in regions may vary on subject, theme, style, medium, and technique, but share common characteristics.' },
            { type: 'list', content: 'Common Characteristics', items: [
                'Share the same tradition and influence',
                'Used to skillfully suggest feelings and emotions',
                'Share certain elements and principles of organization or design'
            ]},
            { type: 'heading', content: 'Basic Elements of Art' },
            { type: 'list', content: 'Core Elements', items: [
                'SPACE - Emptiness that can be positive (enclosed in shape) or negative (space outside the shape)',
                'LINE - Extension point, drawn on a surface. Has direction (vertical, horizontal, diagonal) and character (jagged, curved, series of dots or broken lines)',
                'SHAPES - A figure separate from its surrounding area. Can be geometric (angular) or organic (curvy). 2D',
                'FORM - Enclosed line. 3D',
                'COLOR - Sensation created by visible wavelengths of light. Pigments create mood from dull to bright',
                'VALUE - Degree of lightness and darkness',
                'TEXTURE - Surface of artwork. Can be actual/tactile (felt by touch) or simulated/illusory (can be seen, not felt)'
            ]},
            { type: 'heading', content: 'Principles of Design' },
            { type: 'definition', content: 'Structure and plan of an artwork. Helps artists organize elements to express their ideas and emotions clearly.' },
            { type: 'list', content: 'Design Principles', items: [
                'HARMONY - Wholeness of the design. Arrangement and agreement between parts of the composition',
                'VARIETY - Assortment or diversity of work of art. Variations prevent monotony and uniformity',
                'RHYTHM - Regular, repeated pattern in art that creates movement or flow',
                'PROPORTION - Relationship of all elements with each other. Well-proportioned shapes are pleasing to the eye',
                'BALANCE - Even distribution of weight. Formal/symmetrical (identical sides) or informal/asymmetrical (different but equal visual weight)',
                'MOVEMENT - Fundamental principle in choreography and theater arts. A way to convey feelings and emotions',
                'EMPHASIS - Gives importance or dominance to a unit or area',
                'SUBORDINATION - Gives less importance to a unit or area'
            ]},
            { type: 'heading', content: 'Form, Context, and Content' },
            { type: 'text', content: 'FORM - The surface feature of an artwork. Does not relate to the art\'s in-depth meaning.' },
            { type: 'list', content: 'Art Forms', items: [
                'Visual Art: 2D (drawing, paintings), 3D (sculpture, architecture)',
                'Music: Musical composition, opera, rhapsody',
                'Literature: Prose, drama, poetry',
                'Theater: Tragedy, drama, comedy, melodrama'
            ]},
            { type: 'text', content: 'CONTEXT - The varied situations in which works have been produced or interpreted' },
            { type: 'text', content: 'PRIMARY CONTEXT - Personal type concerning the artist\'s sentiments, beliefs, values, interests, attitudes, and emotions' },
            { type: 'text', content: 'SECONDARY CONTEXT - Place and period of creation; social, political, and economic environment; religious and philosophical convictions' },
            { type: 'text', content: 'CONTENT - Contains the subject matter that carries the message of the work. In music, refers to the principal and recognizable melody' }
        ]
    },
    'lesson-2': {
        title: 'Traditional Filipino Arts and Crafts',
        content: [
            { type: 'heading', content: 'T\'NALAK (South Cotabato)' },
            { type: 'definition', content: 'A weaving tradition using resist-dyed threads of the T\'boli people.' },
            { type: 'text', content: 'T\'BOLI - Weavers of the T\'nalak, also called "THE DREAMWEAVERS"' },
            { type: 'text', content: 'FU DALU - Spirit or goddess of the abacá plant in T\'boli Mythology' },
            { type: 'text', content: 'ABACA PLANT - A natural fiber that is crucial to their culture' },
            { type: 'heading', content: 'PAPIER-MÂCHÉ (Pakil, Laguna)' },
            { type: 'definition', content: 'A traditional Filipino craft famous for creating colorful and artistic masks and sculptures. Comes from French words meaning "chewed paper".' },
            { type: 'text', content: 'Art form of making objects from torn or cut paper mixed with glue and dried until it hardens.' },
            { type: 'heading', content: 'BULUL (Ifugao)' },
            { type: 'definition', content: 'A wooden rice god or guardian figure in Ifugao culture, believed to protect rice crops and ensure bountiful harvest.' },
            { type: 'heading', content: 'JUSI AND PIÑA (Lumban, Laguna)' },
            { type: 'definition', content: 'Traditional Filipino textiles that are handwoven and hand-embroidered. Lumban is known as the "Embroidery Capital of the Philippines".' },
            { type: 'heading', content: 'PIS SIYABIT (Sulu)' },
            { type: 'definition', content: 'A traditional woven head cloth made by the Tausug people.' },
            { type: 'text', content: 'Pis - a type of cloth, Siyabit - to hook/tie' },
            { type: 'heading', content: 'WOOD CARVINGS (Paete, Laguna)' },
            { type: 'definition', content: 'Paete is known as the "Carving Capital of the Philippines".' },
            { type: 'list', content: 'Preferred Woods', items: [
                'Batikuling',
                'Narra',
                'Molave',
                'Acacia',
                'Kamagong',
                'Santol'
            ]},
            { type: 'heading', content: 'SLIPPERS (Liliw, Laguna)' },
            { type: 'definition', content: 'Made in the "Slippers Capital of the Philippines".' },
            { type: 'heading', content: 'BAKYA (Gapan, Nueva Ecija)' },
            { type: 'definition', content: 'Traditional Filipino wooden clogs made from santol or lanete wood.' },
            { type: 'heading', content: 'BURNAY JARS' },
            { type: 'definition', content: 'Handmade using a potter\'s wheel and shaped by skilled artisans, showing the creativity, patience, and skill of Filipino potters.' },
            { type: 'heading', content: 'BANIG' },
            { type: 'definition', content: 'A traditional handwoven mat commonly used for sleeping, sitting, or lounging.' },
            { type: 'text', content: 'Basey - made from tikog grass' },
            { type: 'heading', content: 'INABEL/ABEL ILOKO' },
            { type: 'definition', content: 'A handwoven textile made by Ilocano weavers. "Abel" means "to weave".' }
        ]
    },
    'lesson-3': {
        title: 'Philippine Festivals and Fiestas',
        content: [
            { type: 'heading', content: 'ATI-ATIHAN FESTIVAL (Kalibo, Aklan)' },
            { type: 'list', content: 'Festival Details', items: [
                'Honors Sto. Niño',
                'Celebrated on 3rd Sunday of January',
                'Participants paint faces with black soot and wear bright, outlandish costumes',
                'Lasts two weeks with dance revelry in the final 3 days'
            ]},
            { type: 'heading', content: 'SINULOG (Cebu City)' },
            { type: 'list', content: 'Festival Details', items: [
                'Feast to honor Sto. Niño (patron of Cebu)',
                'Celebrated on 3rd Sunday of January',
                'Dance ritual to commemorate acceptance to Christianity',
                'Participants wear bright costumes and dance to drumbeats and gongs'
            ]},
            { type: 'heading', content: 'DINAGYANG (Iloilo City)' },
            { type: 'list', content: 'Festival Details', items: [
                'Religious and cultural festival',
                'Celebrated on 4th Sunday of January',
                'Recognized as best tourism event (2006-2008) by tourism officers'
            ]},
            { type: 'heading', content: 'PANAGBENGA (Baguio)' },
            { type: 'list', content: 'Festival Details', items: [
                'Flower festival in tribute to the city\'s recovery from the 1990 earthquake',
                'Features flower-decorated floats and street dances with flower-themed costumes'
            ]},
            { type: 'text', content: 'BENDIAN - Ibaloi dance of celebration from the Cordillera region' },
            { type: 'heading', content: 'KAAMULAN (Bukidnon)' },
            { type: 'definition', content: 'AMUL - a Bukidnon term for gathering for any purpose.' },
            { type: 'list', content: 'Festival Details', items: [
                'Held in Malaybalay City',
                'Second half of February to March 10',
                'Founding anniversary of Bukidnon as province in 1917',
                'Celebrates culture and tradition of seven ethnic tribal groups: Bukidnon, Higaonon, Talaandig, Manobo, Matigsalug, Tigwahanon, Umayamnon'
            ]},
            { type: 'heading', content: 'MORIONES (Marinduque)' },
            { type: 'list', content: 'Festival Details', items: [
                'Held annually during holy week',
                'Features men and women in costumes and masks resembling Roman soldiers',
                '"Morion" means mask or visor, part of Roman armor covering the face',
                'The costumes are a local interpretation of biblical Roman soldiers'
            ]},
            { type: 'heading', content: 'MALEDO/CUTUD LENTEN RITES (San Fernando, Pampanga)' },
            { type: 'list', content: 'Festival Details', items: [
                'Held every Good Friday',
                'Takes place in San Pedro Cutud, about 3 km from San Fernando city proper',
                'Participants (mostly men, some women) are nailed to crosses using sterilized 2-inch stainless steel nails'
            ]},
            { type: 'heading', content: 'TURUMBA (Pakil, Laguna)' },
            { type: 'list', content: 'Festival Details', items: [
                'Celebrated 7 times between April and May',
                'Honors the Seven Sorrows of the Blessed Virgin Mary',
                'First celebration is on the Friday before Palm Sunday',
                'Final celebration falls on Pentecost Sunday'
            ]},
            { type: 'heading', content: 'FLORES DE MAYO & SANTACRUZAN (Philippines)' },
            { type: 'list', content: 'Festival Details', items: [
                'Held throughout May',
                'Santacruzan, queen of Maytime festivals',
                'A procession that commemorates Saint Helena (mother of Constantine the great) finding the cross'
            ]},
            { type: 'heading', content: 'PAHIYAS FESTIVAL (Lucban, Quezon)' },
            { type: 'list', content: 'Festival Details', items: [
                'May 15',
                'Held in honor of St. Isidore, patron saint of farmers',
                'Houses are decorated with fruits and vegetables, agricultural products, and handicrafts',
                'Kiping - colorful, leaf-shaped rice wafers (edible when grilled or fried)',
                'Decorations showcase the town\'s harvest and creativity',
                'Houses are judged, and the best one wins a prize'
            ]},
            { type: 'heading', content: 'MASSKARA FESTIVAL (Bacolod City)' },
            { type: 'list', content: 'Festival Details', items: [
                '3rd weekend nearest to October 19',
                'A week-long celebration known for its vibrant and joyful atmosphere',
                'Features a street dance competition with dancers wearing colorful smiling masks',
                'Dancers perform to lively Latin-inspired music with energy and precision',
                '"MassKara" comes from "Mass" (many) + "Kara" (Spanish for face) = "mass of faces"',
                'Symbolizes joy and resilience, making Bacolod known as the City of Smiles'
            ]},
            { type: 'heading', content: 'LANZONES FESTIVAL' },
            { type: 'list', content: 'Festival Details', items: [
                'Annually held during October',
                'One of the more colorful events in Philippines',
                'A week-long festival',
                'Celebrated its 30th anniversary on 2009'
            ]},
            { type: 'heading', content: 'HIGANTES FESTIVAL (Angono)' },
            { type: 'list', content: 'Festival Details', items: [
                'Celebrated in honor of Saint Clement',
                'November 23',
                'A tourism-promoting event attracting both local and international visitors',
                'Features giant paper-mache figures called Higantes',
                'Each measure 4-5 feet wide and 10-12 feet tall',
                'Originated during the Spanish colonial period when Angono was a hacienda',
                'Inspired by Mexican paper-mache art introduced by Spanish priests'
            ]},
            { type: 'heading', content: 'GIANT LANTERN FESTIVAL (San Fernando)' },
            { type: 'list', content: 'Festival Details', items: [
                'Held annually in December, on the Saturday before Christmas Eve',
                'Features a competition of giant, colorful lanterns',
                'Due to its popularity, the city\'s given a nickname as the "Christmas Capital of the Philippines"'
            ]}
        ]
    },
    'lesson-4': {
        title: 'Integrated Art Applications',
        content: [
            { type: 'heading', content: 'INTEGRATED ART APPLIED TO PHILIPPINE CONTEMPORARY ART' },
            { type: 'list', content: 'Distinct Forms', items: [
                'Architecture',
                'Visual Arts',
                'Music',
                'Literary Art',
                'Dance',
                'Dramatic Art',
                'Cinema',
                'Broadcast Art',
                'New Media'
            ]},
            { type: 'heading', content: 'CHOREOGRAPHY' },
            { type: 'definition', content: 'Arrangement for dance movements. Usually accompanied by music. (productions or street dancing).' },
            { type: 'heading', content: 'MUSICAL INSTRUMENTS' },
            { type: 'definition', content: 'Tool or device that produces sound. (kulintang, gangsa, kutyapi)' },
            { type: 'text', content: 'LUCRECIA KASILAG - orientalia suite for piano and chamber and Philippine percussion instrument and improvisation no. 3 and 4 for moslem gamelan and tipaklong.' },
            { type: 'heading', content: 'LITERARY AND MUSICAL COMPOSITIONS' },
            { type: 'text', content: 'LITERARY WORKS - meant to be read, sung, or delivered in play' },
            { type: 'text', content: 'MUSICAL COMPOSITION - notated (represented by musical symbols)' },
            { type: 'heading', content: 'VISUAL DESIGN' },
            { type: 'definition', content: 'composition or lay out of lines, shape and color to form patterns on paper, textile or any piece of that matter.' },
            { type: 'heading', content: 'THEATRICAL PERFORMANCE' },
            { type: 'definition', content: 'the staging and execution of production like drama, opera, festivals.' },
            { type: 'text', content: 'CONTEMPORARY THEATRICAL PERFORMANCE - experimental, innovative, controversial, and interdisciplinary. Puppetry, cinema and sculpture.' },
            { type: 'heading', content: 'CINEMA' },
            { type: 'definition', content: 'most popular of the art forms. 1900\'s in manila' }
        ]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    updateProgress();
    
    // Check if user is already logged in
    const savedAuth = localStorage.getItem('studyAppAuth');
    if (savedAuth === 'true') {
        showMainApp();
    } else {
        showLoginScreen();
    }
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Navigation buttons
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    const backToDashboard = document.getElementById('backToDashboard');
    if (backToDashboard) {
        backToDashboard.addEventListener('click', () => showView('dashboard'));
    }
    
    const backToSubject = document.getElementById('backToSubject');
    if (backToSubject) {
        backToSubject.addEventListener('click', () => showView('subjectView'));
    }
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', showSearchModal);
    }
    
    const closeSearchModal = document.getElementById('closeSearchModal');
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', hideSearchModal);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Lesson navigation
    const markCompleteBtn = document.getElementById('markCompleteBtn');
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', markLessonComplete);
    }
    
    const prevLessonBtn = document.getElementById('prevLessonBtn');
    if (prevLessonBtn) {
        prevLessonBtn.addEventListener('click', goToPreviousLesson);
    }
    
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', goToNextLesson);
    }
    
    // Close modal when clicking outside
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideSearchModal();
            }
        });
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginText = document.getElementById('loginText');
    const loginLoader = document.getElementById('loginLoader');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    loginText.classList.add('hidden');
    loginLoader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    // Simulate loading delay
    setTimeout(() => {
        if (password === DEFAULT_PASSWORD) {
            localStorage.setItem('studyAppAuth', 'true');
            showMainApp();
        } else {
            errorMessage.textContent = 'Invalid password. Please try again.';
            errorMessage.classList.remove('hidden');
        }
        
        // Reset loading state
        submitBtn.disabled = false;
        loginText.classList.remove('hidden');
        loginLoader.classList.add('hidden');
    }, 1000);
}

function handleLogout() {
    localStorage.removeItem('studyAppAuth');
    showLoginScreen();
}

function showLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    if (loginScreen) loginScreen.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
    
    currentView = 'login';
}

function showMainApp() {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    if (loginScreen) loginScreen.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');
    
    showView('dashboard');
}

function showView(view) {
    // Hide all views
    const dashboard = document.getElementById('dashboard');
    const subjectView = document.getElementById('subjectView');
    const lessonView = document.getElementById('lessonView');
    
    if (dashboard) dashboard.classList.add('hidden');
    if (subjectView) subjectView.classList.add('hidden');
    if (lessonView) lessonView.classList.add('hidden');
    
    // Show selected view
    const selectedView = document.getElementById(view);
    if (selectedView) {
        selectedView.classList.remove('hidden');
    }
    
    currentView = view;
    
    // Update progress when showing dashboard or subject view
    if (view === 'dashboard' || view === 'subjectView') {
        updateProgress();
    }
}

function openSubject(subjectId) {
    showView('subjectView');
    updateLessonCards();
}

function openLesson(lessonId) {
    currentLessonId = lessonId;
    showView('lessonView');
    loadLessonContent(lessonId);
    updateLessonProgress();
    
    // Mark lesson as accessed
    if (!lessonProgress[lessonId]) {
        lessonProgress[lessonId] = {
            accessed: true,
            completed: false,
            timeSpent: 0
        };
    } else {
        lessonProgress[lessonId].accessed = true;
    }
    
    saveLessonProgress();
    updateProgress();
}

function loadLessonContent(lessonId) {
    const lesson = lessonsData[lessonId];
    if (!lesson) return;
    
    // Update lesson header
    const lessonTitle = document.getElementById('lessonTitle');
    const lessonNumber = document.getElementById('lessonNumber');
    
    if (lessonTitle) lessonTitle.textContent = lesson.title;
    if (lessonNumber) {
        const number = parseInt(lessonId.split('-')[1]);
        lessonNumber.textContent = `Lesson ${number} of 4`;
    }
    
    // Update lesson content
    const contentArea = document.getElementById('lessonContentArea');
    if (contentArea) {
        contentArea.innerHTML = renderLessonContent(lesson.content);
    }
    
    // Update sidebar
    const lessonSections = document.getElementById('lessonSections');
    if (lessonSections) {
        lessonSections.textContent = lesson.content.length;
    }
    
    // Update navigation buttons
    const number = parseInt(lessonId.split('-')[1]);
    updateLessonNavigation(number);
    
    // Update complete button
    const isCompleted = lessonProgress[lessonId]?.completed || false;
    const completeBtn = document.getElementById('markCompleteBtn');
    if (completeBtn) {
        if (isCompleted) {
            completeBtn.classList.add('hidden');
        } else {
            completeBtn.classList.remove('hidden');
        }
    }
    
    // Update status
    const statusText = document.getElementById('lessonStatusText');
    if (statusText) {
        statusText.textContent = isCompleted ? 'Completed' : 'In Progress';
        if (isCompleted) {
            statusText.classList.add('completed');
        } else {
            statusText.classList.remove('completed');
        }
    }
}

function renderLessonContent(content) {
    let html = '';
    
    content.forEach((item, index) => {
        switch (item.type) {
            case 'heading':
                if (index === 0) {
                    html += `<h1>${item.content}</h1>`;
                } else {
                    html += `<h2>${item.content}</h2>`;
                }
                break;
            case 'definition':
                html += `<div class="definition-box"><p>${item.content}</p></div>`;
                break;
            case 'list':
                html += `<h3>${item.content}</h3>`;
                if (item.items) {
                    html += '<ul>';
                    item.items.forEach(listItem => {
                        html += `<li>${listItem}</li>`;
                    });
                    html += '</ul>';
                }
                break;
            case 'text':
            default:
                html += `<p>${item.content}</p>`;
                break;
        }
    });
    
    return html;
}

function updateLessonNavigation(currentLessonNumber) {
    const prevBtn = document.getElementById('prevLessonBtn');
    const nextBtn = document.getElementById('nextLessonBtn');
    
    // Previous lesson button
    if (prevBtn) {
        if (currentLessonNumber > 1) {
            prevBtn.classList.remove('hidden');
            prevBtn.onclick = () => openLesson(`lesson-${currentLessonNumber - 1}`);
        } else {
            prevBtn.classList.add('hidden');
        }
    }
    
    // Next lesson button
    if (nextBtn) {
        if (currentLessonNumber < 4) {
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => openLesson(`lesson-${currentLessonNumber + 1}`);
        } else {
            nextBtn.classList.add('hidden');
        }
    }
}

function markLessonComplete() {
    if (!currentLessonId) return;
    
    lessonProgress[currentLessonId] = {
        accessed: true,
        completed: true,
        timeSpent: lessonProgress[currentLessonId]?.timeSpent || 0
    };
    
    saveLessonProgress();
    updateProgress();
    loadLessonContent(currentLessonId); // Refresh the lesson view
}

function goToPreviousLesson() {
    const currentNumber = parseInt(currentLessonId.split('-')[1]);
    if (currentNumber > 1) {
        openLesson(`lesson-${currentNumber - 1}`);
    }
}

function goToNextLesson() {
    const currentNumber = parseInt(currentLessonId.split('-')[1]);
    if (currentNumber < 4) {
        openLesson(`lesson-${currentNumber + 1}`);
    }
}

function updateProgress() {
    const totalLessons = 4;
    const completedLessons = Object.values(lessonProgress).filter(p => p.completed).length;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    
    // Update overall progress
    const overallProgress = document.getElementById('overallProgress');
    const overallPercentage = document.getElementById('overallPercentage');
    const overallProgressBar = document.getElementById('overallProgressBar');
    
    if (overallProgress) overallProgress.textContent = `${completedLessons}/${totalLessons} lessons completed`;
    if (overallPercentage) overallPercentage.textContent = `${Math.round(progressPercentage)}%`;
    if (overallProgressBar) overallProgressBar.style.width = `${progressPercentage}%`;
    
    // Update subject progress
    const subjectProgress = document.getElementById('subjectProgress');
    const subjectProgressBar = document.getElementById('subjectProgressBar');
    
    if (subjectProgress) subjectProgress.textContent = `${completedLessons}/${totalLessons}`;
    if (subjectProgressBar) subjectProgressBar.style.width = `${progressPercentage}%`;
}

function updateLessonCards() {
    for (let i = 1; i <= 4; i++) {
        const lessonId = `lesson-${i}`;
        const progress = lessonProgress[lessonId];
        const statusIcon = document.getElementById(`lesson${i}Status`);
        const badge = document.getElementById(`lesson${i}Badge`);
        
        if (statusIcon && badge) {
            if (progress?.completed) {
                statusIcon.className = 'fas fa-check-circle lesson-complete';
                badge.textContent = 'Review';
            } else if (progress?.accessed) {
                statusIcon.className = 'fas fa-clock lesson-progress';
                badge.textContent = 'Continue';
            } else {
                statusIcon.className = 'fas fa-circle lesson-incomplete';
                badge.textContent = 'Start';
            }
        }
    }
}

function updateLessonProgress() {
    updateLessonCards();
}

function saveLessonProgress() {
    localStorage.setItem('lessonProgress', JSON.stringify(lessonProgress));
}

function showSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    
    if (searchModal) searchModal.classList.remove('hidden');
    if (searchInput) searchInput.focus();
}

function hideSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchModal) searchModal.classList.add('hidden');
    if (searchInput) searchInput.value = '';
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <p>Start typing to search through all lessons...</p>
            </div>
        `;
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (!searchTerm) {
        resultsContainer.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <p>Start typing to search through all lessons...</p>
            </div>
        `;
        return;
    }
    
    const results = searchContent(searchTerm);
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="search-placeholder">
                <p>No results found for "${searchTerm}"</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try different keywords or check your spelling</p>
            </div>
        `;
        return;
    }
    
    let html = `<p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">Found ${results.length} result${results.length !== 1 ? 's' : ''}</p>`;
    
    results.forEach(result => {
        html += `
            <div class="search-result" onclick="navigateToSearchResult('${result.lessonId}')">
                <div class="search-result-header">
                    <div class="search-result-meta">
                        <i class="fas fa-book"></i>
                        <span class="search-result-subject">Contemporary Arts</span>
                        <span style="color: #999;">•</span>
                        <span class="search-result-lesson">${result.lessonTitle}</span>
                    </div>
                    <div class="search-result-type">${getContentTypeLabel(result.type)}</div>
                </div>
                <div class="search-result-content">${highlightSearchTerm(result.content, searchTerm)}</div>
                <div class="search-result-footer">
                    <div class="search-result-action">
                        <span>Go to lesson</span>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

function searchContent(searchTerm) {
    const results = [];
    
    Object.keys(lessonsData).forEach(lessonId => {
        const lesson = lessonsData[lessonId];
        lesson.content.forEach(contentItem => {
            // Search in content text
            if (contentItem.content.toLowerCase().includes(searchTerm)) {
                results.push({
                    lessonId: lessonId,
                    lessonTitle: lesson.title,
                    content: contentItem.content,
                    type: contentItem.type
                });
            }
            
            // Search in list items
            if (contentItem.items) {
                contentItem.items.forEach(item => {
                    if (item.toLowerCase().includes(searchTerm)) {
                        results.push({
                            lessonId: lessonId,
                            lessonTitle: lesson.title,
                            content: item,
                            type: 'list-item'
                        });
                    }
                });
            }
        });
    });
    
    return results.slice(0, 10); // Limit to 10 results
}

function getContentTypeLabel(type) {
    switch (type) {
        case 'heading': return 'Heading';
        case 'definition': return 'Definition';
        case 'list': return 'List';
        case 'list-item': return 'List Item';
        default: return 'Text';
    }
}

function highlightSearchTerm(text, term) {
    if (!term) return text;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function navigateToSearchResult(lessonId) {
    hideSearchModal();
    openLesson(lessonId);
}