# inequality-solver (a constraint solving library)

This is a hand rolled inequality solver algorithm for scheduling coordinates in a 2D space.

# Example

You have three objects and A must appear before B and C might be on the right of B.

```

var Problem = require('inequality-solver').Problem;

var problem = new Problem();

problem.addDeclaration("A");
problem.addDeclaration("B");
problem.addDeclaration("C");

problem.addRule("x", "leftOf", "A", "B"); // A comes before B
problem.addRule("x", "rightOf", "B", "C"); // C comes after B
problem.addRule("y", "above", "B", "C"); // B is above C

console.log(problem.solve());

```

Output

```
Solved with 2 runs
[ Declaration { name: 'A', x: 1, y: 0, size: '' },
  Declaration { name: 'B', x: 2, y: 0, size: '' },
  Declaration { name: 'C', x: 3, y: 0, size: '' } ]
```
# inequality-solver
