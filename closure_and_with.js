if (typeof print === 'undefined') {
  print = alert;
}

var DSLRunner = {
  ingredients: [],

  prepareFunctionBody: function(fn) {
    return '(' + fn.toString().replace(/\s+$/, '') + ')()';
  },

  withThis: function(callback) {
    var body = this.prepareFunctionBody(callback),
        that = this;
    return function() { return eval('with(that) { ' + body + ' } '); };
  },

  run: function(definition) {
    this.withThis(definition)();
    print("Your specified ingredients included: " + this.ingredients.join(', '));
  },

  bake: function(callback) {
    callback.call(this);
  },

  addIngredient: function(ingredient) {
    this.ingredients.push(ingredient);
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


