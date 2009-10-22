if (typeof print === 'undefined') {
  print = alert;
}

var DSLRunner = {
  run: function(methods) {
    this.ingredients = [];
    this.methods     = methods;

    this.executeAndRemove('first');

    for (var key in this.methods) {
      if (key !== 'last' && key.match(/^bake/)) {
        this.executeAndRemove(key);
      }
    }

    this.executeAndRemove('last');
  },

  addIngredient: function(ingredient) {
    this.ingredients.push(ingredient);
  },

  executeAndRemove: function(methodName) {
    var output = this.methods[methodName]();
    delete(this.methods[methodName]);
    return output;
  }
};

DSLRunner.run({
  first: function() {
    print("I happen first");
  },

  bakeCake: function() {
    print("Commencing cake baking");
  },

  bakeBread: function() {
    print("Baking bread");
  }
});
