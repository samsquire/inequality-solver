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
problem.addDeclaration("D");
problem.addDeclaration("E");

problem.addRule("x", "leftOf", "A", "B"); // A comes before B
problem.addRule("x", "leftOf", "B", "C"); // C comes after B
problem.addRule("y", "above", "B", "C"); // B is above C
problem.addRule("y", "above", "A", "C"); // A is above C
problem.addRule("x", "leftOf", "D", "C"); // D before C
problem.addRule("x", "leftOf", "A", "E"); // A before E

```

Output

```
Solved with 2 runs
[ Declaration { name: 'A', x: 1, y: 1 },
  Declaration { name: 'B', x: 3, y: 3 },
  Declaration { name: 'C', x: 4, y: 4 },
  Declaration { name: 'D', x: 0, y: 2 },
  Declaration { name: 'E', x: 2, y: 0 } ]
```
# inequality-solver
