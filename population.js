function Population(p, m, num) {

    this.population = [];
    this.matingPool = [];
    this.nbGenerations = 0;
    this.finished = false;
    this.target = p;
    this.mutationRate = m;
    this.best = "";

    for (var i = 0; i < num; i++) {
        this.population.push(new DNA(this.target.length));
    }

    this.calcFitness = function() {
        for (var i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(target);        }
    }

    this.calcFitness();

    this.naturalSelection = function() {

        this.matingPool = [];
        var maxFitness = 0;

        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }

        for (var i = 0; i < this.population.length; i++) {
            var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            var n = Math.floor(fitness*100);
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    }

    this.generate = function() {
        for (var i = 0; i < this.population.length; i++) {
            var a = Math.floor(Math.random() * this.matingPool.length);
            var b = Math.floor(Math.random() * this.matingPool.length);
            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];
            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.nbGenerations++;
    }

    this.evaluate = function() {
        var max = 0.0;
        var imax = 0;

        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > max) {
                imax = i;
                max = this.population[i].fitness;
            }
        }

        this.best = this.population[imax].getPhrase();
        if (max == 1.0) {
            this.finished = true;
        }
    }

    this.getBestPhrase = function() {
        return this.best;
    }

    this.isFinished = function() {
        return this.finished;
    }

    this.getNbGenerations = function() {
        return this.nbGenerations;
    }

    this.getRandomPhrases = function() {
        var phrases = "";

        for (var i = 0; i < 10; i++) {
            alea = Math.floor(Math.random()*this.population.length);
            phrases += this.population[alea].getPhrase() + "<br />";
        }

        return phrases;
    }


}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
