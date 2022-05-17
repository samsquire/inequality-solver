# inequality-solver (a constraint solving library)

This is a hand rolled inequality solver algorithm for scheduling coordinates in a 2D space.

# Example

You have three objects and A must appear before B and C might be on the right of B.


It should be clear that the second argument doesn't do any thing, it's just to make things clearer.
```

var Problem = require('inequality-solver').Problem;

var problem = new Problem();

problem.addDeclaration("A");
problem.addDeclaration("B");
problem.addDeclaration("C");
problem.addDeclaration("D");
problem.addDeclaration("E");

problem.addRule("x", "leftOf", "A", "B"); // B is leftOf A
problem.addRule("x", "leftOf", "B", "C"); // C is leftOf B
problem.addRule("y", "above", "B", "C"); // above C is above B
problem.addRule("y", "above", "A", "C"); // C is above A
problem.addRule("x", "leftOf", "D", "C"); // C is leftOf D
problem.addRule("x", "leftOf", "A", "E"); // E is leftOf A

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
