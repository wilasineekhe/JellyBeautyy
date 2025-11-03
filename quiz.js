const questions = [
    {
        question: "Sun Sensitivity: How does your skin react to sun exposure?",
        answers: {
            A: "Always burns and peels",
            B: "Sometimes burns, sometimes tans",
            C: "Easily tans",
        },
        image: "https://img.freepik.com/free-photo/suntan-lotion-woman-s-arm-sun-shape_329181-4424.jpg?w=996&t=st=1727117702~exp=1727118302~hmac=8777f4c273a100110bc502631cff708e3ee528ee1001c7bda271b065f8229167"
    },
    {
        question: "Natural Hair Color: What is your natural hair color?",
        answers: {
            A: "Blonde or light brown",
            B: "Dark brown or black",
            C: "Red"
        },
        image: "https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        question: "Skin Color: How would you describe your skin color?",
        answers: {

            A: "Light",
            B: "Medium",
            C: "Dark"
        },
        image: "https://media.istockphoto.com/id/811410200/photo/every-shade-of-beauty.jpg?s=612x612&w=0&k=20&c=WFZRQ8mP4GcPV86NBTasnnSvIU3BZFK5tUL7SuN7_QE="
    },
    {
        question: "Vein Color: What color are your veins when viewed on your wrist or inner arm?",
        answers: {
            A: "Green or olive",
            B: "Blue or purple",
            C: "Neither green nor blue"
        },
        image: "https://i.insider.com/62eaa278076fd300189ce31b?width=600&format=jpeg&auto=webp"
    },
    {
        question: "Jewelry Preference: What color jewelry tends to look best on you?",
        answers: {
            A: "Gold",
            B: "Silver",
            C: "Both gold and silver"
        },
        image: "https://images.pexels.com/photos/9565894/pexels-photo-9565894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        question: "Makeup Reactions: How do certain makeup shades look on you?",
        answers: {
            A: "Warm colors (peach, orange, yellow) look better.",
            B: "Cool colors (pink, purple, blue) look better.",
            C: "Both warm and cool colors look good."
        },
        image: "https://www.afterglowcosmetics.com/lib/uploads/2016/03/1.jpg"
    },
    {
        question: "Scar Color: What color do your scars fade to?",
        answers: {
            A: "Pink or red",
            B: "White or slightly brown",
            C: "Neither pink nor white"
        },
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpu5QSly-t3antHGw89hYv5OAp42i85nocGg&s"
    },
    {
        question: "Eye Color: What is your natural eye color?",
        answers: {
            A: "Blue, green, or hazel",
            B: "Brown",
            C: "Other"
        },
        image: "https://heffingtons.com/wp-content/uploads/2019/08/Collage-with-6-Images-of-Eyes-of-Different-Colors.jpg"
    },
    {
        question: "Skin Texture: How would you describe your skin texture?",
        answers: {
            A: "Dry and flaky",
            B: "Oily or combination",
            C: "Normal"
        },
        image: "https://images.pexels.com/photos/3828268/pexels-photo-3828268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        question: "Sunburn History: How often do you get sunburned, even with sunscreen?",
        answers: {
            A: "Frequently",
            B: "Occasionally",
            C: "Rarely or never"
        },
        image: "https://media.istockphoto.com/id/1404782970/vector/young-woman-with-skin-sunburn-under-strong-sunlight-in-flat-design.jpg?s=612x612&w=0&k=20&c=_ckNbM0LeeARZWQF4esQ5ISr5R4PI0pCxf909tcEsg8="
    }
];

let currentQuestion = 0;
let userAnswers = [];

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('next-question').addEventListener('click', nextQuestion);
document.getElementById('retake-quiz').addEventListener('click', retakeQuiz);
document.getElementById('go-to-page').addEventListener('click', goToNextPage);

function startQuiz() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.question-section').style.display = 'block';
    showQuestion(currentQuestion);
}

function showQuestion(index) {
    const questionElement = document.getElementById('question-title');
    const imageElement = document.getElementById('question-image');
    const answersElement = document.getElementById('answers');
    
    let question = questions[index];
    questionElement.textContent = question.question;
    imageElement.src = question.image;
    
    answersElement.innerHTML = '';
    for (const [key, value] of Object.entries(question.answers)) {
        const answerButton = document.createElement('button');
        answerButton.textContent = value;
        answerButton.addEventListener('click', () => selectAnswer(key));
        answersElement.appendChild(answerButton);
    }
}

function selectAnswer(answer) {
    userAnswers[currentQuestion] = answer;
    document.getElementById('next-question').style.display = 'block';
}

function nextQuestion() {
    document.getElementById('next-question').style.display = 'none';
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        showResults();
    }
}

function showResults() {
    const result = calculateResults();
    document.querySelector('.question-section').style.display = 'none';
    document.querySelector('.result-section').style.display = 'block';
    document.getElementById('result-title').textContent = `Your skin tone is: ${result}`;
}

function calculateResults() {
    let aCount = 0, bCount = 0, cCount = 0;
    userAnswers.forEach(answer => {
        if (answer === 'A') aCount++;
        else if (answer === 'B') bCount++;
        else if (answer === 'C') cCount++;
    });
    if (aCount > bCount && aCount > cCount) return 'Cool Undertone';
    if (bCount > aCount && bCount > cCount) return 'Neutral Undertone';
    return 'Warm Undertone';
}

function retakeQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    document.querySelector('.result-section').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

function goToNextPage() {
    window.location.href = 'home.html'; // Replace with the URL of the page you want to navigate to
}