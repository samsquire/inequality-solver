var Problem = function() {
	this.variables = [];
	this.lookup = {};
	this.rules = [];
	this.ordering = {
		"x": [],
		"y": []
	}
	this.data = [];
	this.ruleIndex = {};
	this.properties = {};
}

var Declaration = function (name) {
	this.name = name;
	this.x = 0;
	this.y = 0;
}

Problem.prototype.addDeclaration = function (name) {
	if (name == undefined) { debugger ; }
	var createdDeclaration = new Declaration(name)
	this.variables.push(createdDeclaration);
	this.lookup[name] = createdDeclaration;


};

Problem.prototype.addRule = function (coordinate, rule, left, right) {
		var needInsertLeft = false;
		if (this.ordering[coordinate].indexOf(left) == -1) {
			needInsertLeft = true;
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(left) != -1) {
						needInsertLeft = false;
					}
				}
			}
		}
		var needInsertRight = false;
		if (this.ordering[coordinate].indexOf(right) == -1) {
			needInsertRight = true;
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(right) != -1) {
						needInsertRight = false;
					}
				}
			}
		}
		if (needInsertLeft == true && needInsertRight == false) {
			for (var i = 0 ; i < this.ordering[coordinate].length ; i++) {
				var current = this.ordering[coordinate][i];
				if (current === right) {
					// we need to insert left before right
					this.ordering[coordinate].splice(i, 0, [left]);
					break;
				}
			}
		}
		else if (needInsertLeft == false && needInsertRight == true) {
			for (var i = 0 ; i < this.ordering[coordinate].length ; i++) {
				var current = this.ordering[coordinate][i];
				if (current == left) {
					// we need to insert left before right
					this.ordering[coordinate].splice(i + 1, 0, [right]);
					break;
				}
			}
		} else if (needInsertLeft == true && needInsertRight == true) {
			this.ordering[coordinate].push([left]);
			this.ordering[coordinate].push([right]);
		} else if (needInsertLeft == false && needInsertRight == false) {
			// is left before right
			var rightPos = this.ordering[coordinate].indexOf(right);
			var foundRight = false;
			var isCollection = false;
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(right) != -1) {
						foundRight = true;
						rightPos = i;
						isCollection = true;
						break;
					}
				}
			}
			var leftPos = this.ordering[coordinate].indexOf(left);
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(left) != -1) {
						foundLeft = true;
						leftPos = i;
						isCollection = true;
						break;
					}
				}
			}


			if (! (leftPos < rightPos)) {
				var backup;



				if (isCollection) {
					backup = this.ordering[coordinate][leftPos];

				}
				// delete left
				this.ordering[coordinate].splice(leftPos, 1);
				var rightBackup;
				if (isCollection) {
					rightBackup = this.ordering[coordinate][rightPos];
					this.ordering[coordinate][rightPos] = backup;

				} else {
					rightBackup = this.ordering[coordinate][rightPos];
					this.ordering[coordinate][rightPos] = left;

				}


				this.ordering[coordinate].splice(rightPos + 1, 0, rightBackup);




			}
		}
		if (coordinate === "x") {
			if (rule === "leftOf" || rule === "rightOf") {

				var found = false;
				for (var i = 0 ; i < this.ordering["y"].length ; i++) {
					var ordering = this.ordering["y"][i];
					var innerMove = false;
					if (ordering == left) {

						this.ordering["y"][i] = [];
						// look for right in list
						for (var k = 0 ; k < this.ordering["y"].length; k++) {
							var inner = this.ordering["y"][k];
							if (Array.isArray(this.ordering["y"][i]) && Array.isArray(inner)) {


								for (var m = 0; m < inner.length ; m++) {
									if (inner[m] === right) {

										innerMove = true;
										for (var thing of inner) {

											this.ordering["y"][i].push(thing);
										}
                                    this.ordering["y"].splice(k, 1);
									}
								}

							}

						}
						if (!innerMove) {
							this.ordering["y"][i].push(right);
						}
						if (this.ordering["y"].indexOf(right) != -1) {
							this.ordering["y"].splice(this.ordering["y"].indexOf(right), 1);
						}


						found = true;
						break;
					} else if (ordering == right) {

						this.ordering["y"][i] = [];
						// look for right in list
						for (var k = 0 ; k < this.ordering["y"].length; k++) {
							var inner = this.ordering["y"][k];
							if (Array.isArray(this.ordering["y"][i]) && Array.isArray(inner)) {


								for (var m = 0; m < inner.length ; m++) {
									if (inner[m] === left) {

										innerMove = true;
										for (var thing of inner) {

											this.ordering["y"][i].push(thing);
										}
                                        this.ordering["y"].splice(k, 1);
									}
								}


							}

						}
						if (!innerMove) {
							this.ordering["y"][i].unshift(left);
						}
						if (this.ordering["y"].indexOf(left) != -1) {
							this.ordering["y"].splice(this.ordering["y"].indexOf(left), 1);
						}

						found = true;
						break;
					}

					if (Array.isArray(ordering)) {

						var size = ordering.length;

						for (var j = 0 ; j < size ; j++) {
							var item = ordering[j];
							if (item == left && ordering.indexOf(right) == -1) {
								found = true;
								ordering.push(right);
								break;
							} else if (item == right && ordering.indexOf(left) == -1) {
								found = true;
								ordering.push(left);
								break; }
						}

					}

				}


				if (!found) {



				}

			}
		}
		for (var i = 0 ; i < this.ordering[coordinate].length ; i++) {
			var current = this.ordering[coordinate][i];

			if (Array.isArray(current)) {

				for (var item of current) {
					this.lookup[item][coordinate] = i + 1;
				}
			} else {

				this.lookup[current][coordinate] = i + 1;
			}

		}


		// console.log("x", this.ordering["x"]);
		var ruleKey = coordinate + rule + left + right;
		if (!this.ruleIndex.hasOwnProperty(ruleKey)) {
			this.rules.push([coordinate, rule, left, right]);
			this.ruleIndex[ruleKey] = true;
		}

	}

Problem.prototype.solve = function () {
	/* Re-apply rules to catch errors */
	var lastOrderingX = this.ordering.x
	var lastOrderingY = this.ordering.y
	var times = 1;
	do {
		times++;
		for (var i = 0 ; i < this.rules.length; i++) {
			this.addRule.apply(this, this.rules[i]);
		}
		lastorderingX = this.ordering.x;
		lastOrderingY = this.ordering.y;
	} while (lastOrderingX != this.ordering.x || lastOrderingY != this.ordering.y)
	console.log("Solved with", times, "runs");
	return this.variables;
}

module.exports = {
	Problem: Problem
}
