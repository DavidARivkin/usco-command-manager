//manager
CommandManager = function ( )
{
  this.undos=[];//for undo redo
  this.redos=[];
}

CommandManager.prototype.addOperation=function(operation)
{
  this.undos.push(operation);
  this.redos = [];
  operation.index = this.undos.length - 1;
}

CommandManager.prototype.undo=function(operation)
{
  if(operation !== undefined)
  {
    this.undos.pop();
  }else
  {
    var operation = this.undos.pop();
  }
  //var operation = operation || this.undos.pop();
  if(operation === undefined) return;
  operation.undo();
  this.redos.unshift(operation);

  return operation;
}

CommandManager.prototype.undoMultiple=function(howMany)
{
  var operations = [];
  for(var i=0;i<howMany;i++)
  {
    var operation = this.undo();
    if(operation != undefined){ operations.push( operation ) ; }
  }
  return operations;
}

CommandManager.prototype.redo=function(operation)
{
  var operation = operation || this.redos.shift();
  if(operation === undefined) return;
  operation.redo();
  this.undos.push(operation);
  return operation;
}

CommandManager.prototype.redoMultiple=function(howMany)
{
  var operations = [];
  for(var i=0;i<howMany;i++)
  {
    var operation = this.redo();
    if(operation != undefined){ operations.push( operation ) ; }
  }
  return operations;
}

