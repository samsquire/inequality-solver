var Problem = require('../index.js').Problem;
var problem = new Problem();

problem.addDeclaration("A");
problem.addDeclaration("B");
problem.addDeclaration("C");
problem.addDeclaration("D");
problem.addDeclaration("E");

problem.addRule("x", "leftOf", "A", "B"); // A comes before B
problem.addRule("x", "leftOf", "B", "C"); // C comes after B
problem.addRule("y", "above", "B", "C"); // B is above C
problem.addRule("y", "above", "A", "C"); // A is above C
problem.addRule("x", "leftOf", "D", "C"); // D before C
problem.addRule("x", "leftOf", "A", "E"); // A before E

console.log(problem.solve());
