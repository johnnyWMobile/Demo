﻿var initialTasks = [
    {done: false, desc: "test"},
    {done: true, desc: "OK"},
    {done: false, desc: "Third"},
    {done: true, desc: "try"}
]

var Task = function(done, desc){
    var self = this;
    self.isEditing = ko.observable(false);
    self.done = ko.observable(done);
    self.desc = ko.observable(desc);
    self.newDesc = ko.observable(desc);
    self.toggleDone = function(){
        self.done(!self.done());
    };
    self.changeDesc = function(){
        self.isEditing(true);
    };
    self.onPressEnter = function(){
        self.desc(self.newDesc());
        self.isEditing(false);
    };
    self.onBlur = function(){
        self.newDesc(self.desc());
        self.isEditing(false);
    }
}

var ToDoListViewModel = function (initialTasksc) {
    var self = this;

    self.todoInput = ko.observable("");

    self.tasks = ko.observableArray(ko.utils.arrayMap(initialTasks, function(task) {
        return new Task(task.done, task.desc);
    }));

    self.toDoList = ko.computed(function(){
        return ko.utils.arrayFilter(self.tasks(), function(task) {
            return !task.done();
        });
    });

    self.doneList = ko.computed(function(){
        return ko.utils.arrayFilter(self.tasks(), function(task) {
            return task.done();
        });
    });
   
    self.addTask = function(){
        if(self.todoInput())
        {
            self.tasks.push(new Task(false, self.todoInput()));
            self.todoInput("");
        }
    };

    self.removeTask = function(task){
        self.tasks.remove(task);
    };
}

ko.applyBindings(new ToDoListViewModel(initialTasks));