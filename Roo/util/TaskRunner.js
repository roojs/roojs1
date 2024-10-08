/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
/**
 * @class Roo.util.TaskRunner
 * Manage background tasks - not sure why this is better that setInterval?
 * @static
 *
 */
 
Roo.util.TaskRunner = function(interval){
    interval = interval || 10;
    var tasks = [], removeQueue = [];
    var id = 0;
    var running = false;

    var stopThread = function(){
        running = false;
        clearInterval(id);
        id = 0;
    };

    var startThread = function(){
        if(!running){
            running = true;
            id = setInterval(runTasks, interval);
        }
    };

    var removeTask = function(task){
        removeQueue.push(task);
        if(task.onStop){
            task.onStop();
        }
    };

    var runTasks = function(){
        if(removeQueue.length > 0){
            for(var i = 0, len = removeQueue.length; i < len; i++){
                tasks.remove(removeQueue[i]);
            }
            removeQueue = [];
            if(tasks.length < 1){
                stopThread();
                return;
            }
        }
        var now = new Date().getTime();
        for(var i = 0, len = tasks.length; i < len; ++i){
            var t = tasks[i];
            var itime = now - t.taskRunTime;
            if(t.interval <= itime){
                var rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
                t.taskRunTime = now;
                if(rt === false || t.taskRunCount === t.repeat){
                    removeTask(t);
                    return;
                }
            }
            if(t.duration && t.duration <= (now - t.taskStartTime)){
                removeTask(t);
            }
        }
    };

    /**
     * Queues a new task.
     * @param {Object} task
     *
     * Task property : interval = how frequent to run.
     * Task object should implement
     * function run()
     * Task object may implement
     * function onStop()
     */
    this.start = function(task){
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };
    /**
     * Stop  new task.
     * @param {Object} task
     */
    this.stop = function(task){
        removeTask(task);
        return task;
    };
    /**
     * Stop all Tasks
     */
    this.stopAll = function(){
        stopThread();
        for(var i = 0, len = tasks.length; i < len; i++){
            if(tasks[i].onStop){
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};

Roo.TaskMgr = new Roo.util.TaskRunner();