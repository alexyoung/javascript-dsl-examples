if (typeof print === 'undefined') {
  print = alert;
}

var DSLRunner = {
  methodQueue: [],

  run: function(definition) {
    definition.call(this, this.bake, this.first, this.last);

    if (typeof this.firstMethod !== 'undefined') {
      this.firstMethod();
    }

    for (var i = 0; i < this.methodQueue.length; i++) {
      this.methodQueue[i]();
    }

    if (typeof this.lastMethod !== 'undefined') {
      this.lastMethod();
    }
  },

  bake: function(callback) {
    DSLRunner.methodQueue.push(callback);
  },

  first: function(callback) {
    DSLRunner.firstMethod = callback;
  },

  last: function(callback) {
    DSLRunner.lastMethod = callback;
  }
};

DSLRunner.run(function(bake, first, last) {
  first(function() {
    print("I happen first");
  });

  bake(function() {
    print("Baking bread");
  });

  bake(function() {
    print("Baking a cake");
  });
});

