Polymer('history-editor', {

  get undos() { return this.commandManager.undos; },
  get redos() { return this.commandManager.redos; },

  created:function()
  {
    this.commandManager = new CommandManager();
  },
  //api
  addOperation:function(operation)
  {
    this.commandManager.addOperation(operation);
    this.fire('operations-added', {ops: [operation]});
  },
  undo:function()
  {
    this.undoMultiple(1);
  },
  redo:function()
  {
    this.redoMultiple(1);
  },
  undoMultiple:function(howMany)
  {
    var operations = this.commandManager.undoMultiple(howMany);
    if(operations.length > 0) { this.fire('operations-undone', {ops: operations}); }
  },
  redoMultiple:function(howMany)
  {
    var operations = this.commandManager.redoMultiple(howMany);
    if(operations.length > 0) { this.fire('operations-redone', {ops: operations}); }
  },
  //event handlers
  historyUndo:function(event, detail, sender)
  {
    var model = sender.templateInstance_.model;
    var selectedOperation = model.operation;
    var operationIndex = selectedOperation.index;
    var howMany = (this.commandManager.undos.length-1)-operationIndex+1;

    this.undoMultiple(howMany);

    event.preventDefault();
    event.stopPropagation();
  },
  historyRedo:function(event, detail, sender)
  {
    var model = event.target.templateInstance.model;
    var selectedOperation = model.operation;
    var howMany = this.commandManager.redos.indexOf(selectedOperation)+1;

    this.redoMultiple(howMany);

    event.preventDefault();
    event.stopPropagation();
  }
});

