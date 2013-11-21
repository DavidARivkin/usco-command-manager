Polymer('history-editor', {

  get undos() { return this.commandManager.undos; },
  get redos() { return this.commandManager.redos; },

  created:function()
  {
    this.commandManager = new CommandManager();
  },
  //api
  addCommand:function(command)
  {
    this.commandManager.addCommand(command);
    this.fire('commands-added', {ops: [command]});
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
    var commands = this.commandManager.undoMultiple(howMany);
    if(commands.length > 0) { this.fire('commands-undone', {ops: commands}); }
  },
  redoMultiple:function(howMany)
  {
    var commands = this.commandManager.redoMultiple(howMany);
    if(commands.length > 0) { this.fire('commands-redone', {ops: commands}); }
  },
  //event handlers
  historyUndo:function(event, detail, sender)
  {
    var model = sender.templateInstance_.model;
    var selectedCommand = model.command;
    var commandIndex = selectedCommand.index;
    var howMany = (this.commandManager.undos.length-1)-commandIndex+1;

    this.undoMultiple(howMany);

    event.preventDefault();
    event.stopPropagation();
  },
  historyRedo:function(event, detail, sender)
  {
    var model = event.target.templateInstance.model;
    var selectedCommand = model.command;
    var howMany = this.commandManager.redos.indexOf(selectedCommand)+1;

    this.redoMultiple(howMany);

    event.preventDefault();
    event.stopPropagation();
  }
});

