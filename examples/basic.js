var Problem = require('../index.js').Problem;
var problem = new Problem();

problem.addDeclaration("A");
problem.addDeclaration("B");
problem.addDeclaration("C");
problem.addDeclaration("D");
problem.addDeclaration("E");

problem.addRule("x", "leftOf", "A", "B"); // A comes before B
problem.addRule("x", "rightOf", "B", "C"); // C comes after B
problem.addRule("y", "above", "B", "C"); // B is above C
problem.addRule("y", "above", "A", "C"); // B is above C
problem.addRule("x", "rightOf", "D", "C"); // B is above C
problem.addRule("x", "rightOf", "A", "E"); // B is above C

console.log(problem.solve());
