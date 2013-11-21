//manager
CommandManager = function ( )
{
  this.undos=[];//for undo redo
  this.redos=[];
}

CommandManager.prototype.addCommand=function(command)
{
  this.undos.push(command);
  this.redos = [];
  command.index = this.undos.length - 1;
}

CommandManager.prototype.undo=function(command)
{
  if(command !== undefined)
  {
    this.undos.pop();
  }else
  {
    var command = this.undos.pop();
  }
  //var command = command || this.undos.pop();
  if(command === undefined) return;
  command.undo();
  this.redos.unshift(command);

  return command;
}

CommandManager.prototype.undoMultiple=function(howMany)
{
  var commands = [];
  for(var i=0;i<howMany;i++)
  {
    var command = this.undo();
    if(command != undefined){ commands.push( command ) ; }
  }
  return commands;
}

CommandManager.prototype.redo=function(command)
{
  var command = command || this.redos.shift();
  if(command === undefined) return;
  command.redo();
  this.undos.push(command);
  return command;
}

CommandManager.prototype.redoMultiple=function(howMany)
{
  var commands = [];
  for(var i=0;i<howMany;i++)
  {
    var command = this.redo();
    if(command != undefined){ commands.push( command ) ; }
  }
  return commands;
}

