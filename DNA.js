function DNA(num) {

    this.genes = [];
    this.fitness = 0;
    for (var i = 0; i < num; i++) {
        this.genes[i] = newChar();
    }

    this.getPhrase = function() {
        return this.genes.join("");
    }

    this.calcFitness = function(target) {
        var score = 0;
        for (var i = 0; i < this.genes.length; i++) {
            if (this.genes[i] == target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score*1.0/target.length;
    }

    this.crossover = function(partner) {
        var child = new DNA(this.genes.length);
        var midPoint = Math.floor(Math.random()*this.genes.length);
        for (var i = 0; i < this.genes.length; i++) {
            (i < midPoint) ? (child.genes[i] = this.genes[i]) : (child.genes[i] = partner.genes[i]);
        }
        return child;
    }

    this.mutate = function(mutationRate) {
        for (var i = 0; i < this.genes.length; i++) {
            if (Math.random() < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }

}

function newChar() {
    var c = 32 + Math.floor(Math.random()*93);
    if (c == 40) c = 224;
    if (c == 41) c = 232;
    if (c == 60) c = 233;
    if (c == 61) c = 234;
    if (c == 62) c = 235;
    if (c == 91) c = 238;
    if (c == 92) c = 239;
    if (c == 94) c = 244;
    if (c == 96) c = 246;
    if (c == 123) c = 251;
    if (c == 124) c = 252;

    return String.fromCharCode(c);
}
