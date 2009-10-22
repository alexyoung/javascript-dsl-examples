if (typeof print === 'undefined') {
  print = alert;
}

var DSLRunner = {
  ingredients: [],

  prepareFunctionBody: function(fn) {
    return '(' + fn.toString().replace(/\s+$/, '') + ')()';
  },

  withDSL: function(callback) {
    var body = this.prepareFunctionBody(callback),
        f    = new Function('bake', 'addIngredient', body),
        args = [this.bake, this.addIngredient];
    return function() { f.apply(this, args); };
  },

  run: function(definition) {
    this.withDSL(definition)();
    print("Your specified ingredients included: " + this.ingredients.join(', '));
  },

  bake: function(callback) {
    callback.call(this);
  },

  addIngredient: function(ingredient) {
    DSLRunner.ingredients.push(ingredient);
  },

  last: function(callback) {
    callback.call(this);
  }
};

DSLRunner.run(function() {
  bake(function() {
    addIngredient('flour');
    addIngredient('yeast');
    addIngredient('water');

    print("Baking bread");
  });

  bake(function() {
    print("Baking a cake");
  });
});


