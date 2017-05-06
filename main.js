var target;
var mutationRate;
var popSize;
var population;
var intervalId;

document.getElementById('button').addEventListener('click', setup);

function setup() {
    target = document.getElementById('text').value;
    mutationRate = 0.01;
    popSize = 1000;
    population = new Population(target, mutationRate, popSize);

    var allPhrases = document.getElementById('all-phrases');
    allPhrases.innerHTML = '';
    for (var i = 0; i < Math.floor(4/(target.length/20)); i++) {
        allPhrases.innerHTML += "<p class='phrases'></p>";
    }

    intervalId = setInterval(draw, 10);
}

function draw() {
    population.calcFitness();
    population.naturalSelection();
    population.evaluate();
    population.generate();

    if (population.isFinished()) {
        console.log("truc");
        clearInterval(intervalId);
    }

    updateInfo();
}

function updateInfo() {
    var bestPhrase = document.getElementById('best-phrase');
    var phrases = document.getElementsByClassName('phrases');
    var generation = document.getElementById('generation');
    var monkey = document.getElementById('monkey');
    bestPhrase.innerHTML = population.getBestPhrase();
    for (var i = 0; i < phrases.length; i++) {
        phrases[i].innerHTML = population.getRandomPhrases();
    }
    generation.innerHTML = "Generation " + population.getNbGenerations();
    if ((Math.floor(population.getNbGenerations()/10))%2 == 0) {
        monkey.innerHTML = "<img src='monkey1.png' />";
    }
    else {
        monkey.innerHTML = "<img src='monkey2.png' />";
    }
}
