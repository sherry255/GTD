"use strict";
require('./renderer.js');


$(document).ready(function() {
    showCurrentTime()
    addTODO()
    listenWeek()
    changeDayColor()
    operateTodo()
    reload()
})


// log 函数
function log() {
    console.log.apply(console, arguments);
}

// renderAtId 函数( 渲染 innerHTML )
function renderAtId(id, text) {
    document.getElementById(id).innerHTML = text;
}
// render at all class ( 渲染 innerHTML )
function renderAtAllClasses(className, text) {
    Array.from(document.getElementsByClassName(className)).forEach(function (e) {
        e.innerHTML = text;
    });
}

// 当前时间的基础函数
// 参考 http://web.jobbole.com/83319/
function CurrentTime() {
    var c = new Date()
    this.date = c.getDate()
    this.mouth = c.getMonth() + 1
    this.day = c.getDay() // 星期几
    this.year = c.getFullYear()
    this.hour = c.getHours()
    this.minutes = c.getMinutes()
    this.second = c.getSeconds()
    this.fulltime = c.toLocaleString()
}

// 监听星期几按钮
function listenWeek() {
    var a = document.querySelector('#week')
    a.addEventListener('click', function(event) {
        var target = event.target
        //log(target.name)
        return target.name
    })
}

// 将字符串转化为 DOM
function parseDom(arg) {
    var objE = document.createElement("div");    　　
    objE.innerHTML = arg;    　　
    return objE.childNodes;
}

// 初始化时同步所有 TODO
function syncTODO() {
    var e = $("#lists").html()
    localStorage.setItem("todos", e)

}

// 用于切换某个元素的 class
function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

// 重新打开应用时从 localStorage 恢复 DOM
function reload() {
    var b = parseDom(localStorage["todos"])
    $("#lists").empty()
    $("#lists").append(b)
}


// current_time
function showCurrentTime() {
    var c = new CurrentTime()
    var a = "current time: " + c.year + "/" + c.mouth + "/" +
        c.date + "   " + c.hour + ":" + c.minutes + ":" + c.second
    renderAtId("current-time", a)
    deadLine(a)
    setTimeout("showCurrentTime()", 1000)
    return a
}

// 改变 todo 的时间:
function deadLine(e) {
    //var ls = document.querySelectorAll("#t")
    //for (var i = 0; i < ls.length; i++) {
    //    ls[i].innerHTML = e
    //}
    renderAtAllClasses("t",e)
}

// add click function
function addTODO() {
    $("#add").on("click", function() {
        console.log("add an item")
        var item = $("#lists")
        var task = $(".task")
        var startTime = $(".start-time")
        var c = new CurrentTime()
        var z = $("#current-time")
        var m = showCurrentTime()
        console.log(z.val())
        // curent time:' + c.hour + ':' + c.minutes
        var newTODO = '<div><span class="t" id="t"></span>' + ',  :  ' 
                        + task.val() + 'start time: ' + startTime.val() 
                        + '<span id="c">' + z.val() 
                        + '</span><button class="is-complete">completed</button>'
                        +'<button class="delete">delete</button>'

        item.append(newTODO)
        $("#t").text = m
        startTime.val("")
        showCurrentTime()
        //saveTODO()
        syncTODO()
    })
}

// delete or toggle completed tasks
function operateTodo() {
    var lists = document.querySelector('#lists')
    lists.addEventListener('click', function(event) {
        var target = event.target
        if (target.classList.contains('is-complete')) {
            log('done')
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'completed')
            //saveTODO()
        } else if (target.classList.contains('delete')) {
            log('delete')
            var todoDiv = target.parentElement
            todoDiv.remove()
        }
        syncTODO()
    })

}

// 根据日期变化星期颜色
function changeDayColor() {
    var t = new CurrentTime()
    var day = t.day - 1
    var c = $('.week').children()
    function change(c, day) {
        return c.eq(day).css({
            'background-color': '#b3ffff'
        });
    }
    change(c, day)
}

// 本地保存功能
// var todos = JSON.parse(localStorage.getItem('todos'))
function saveTODO() {
    var l = document.querySelector('#lists').childNodes
    localStorage.setItem("todos", JSON.stringify(l))
}

// 清除所有todos
function clearAll() {
    localStorage.clear()
}

$('#delete-all-todos').on("click",function(){
    reload()
    clearAll()
})


// 运行
// electron --debug=5838 TODO
