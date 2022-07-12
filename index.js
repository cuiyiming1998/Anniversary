window.onload = ()=>{
    var countDate = new Date('Apr 6, 2017 18:00:00').getTime();
    var local = document.getElementById('localCity');
    var tmp = document.getElementById('tmp');
    var focus = document.getElementById('focusItem');

    // 获取地区
    function getLocal(){
        if(localStorage.getItem('localCity') == undefined || localStorage.getItem('localCity') == null || localStorage.getItem('localCity') == ''){
            local.value = '北京市';
        }else{
            local.value = localStorage.getItem('localCity')
        }
    }
    // 获取待办事项
    function getFocus(){
        if(localStorage.getItem('focus') == undefined || localStorage.getItem('focus') == null || localStorage.getItem('focus') == ''){
            focus.value = 'Focus?';
        }else{
            focus.value = localStorage.getItem('focus');
        }
    }

    // 事件监听
    local.addEventListener('keypress',setLocal);
    local.addEventListener('blur',setLocal);
    focus.addEventListener('keypress',setFocus);
    focus.addEventListener('blur',setFocus);

    // 设置地区
    function setLocal(e){
        if(e.type === "keypress"){
            if(e.keyCode == 13 || e.which == 13){
                if(local.value == ''){
                    local.value = '北京市';
                }
                localStorage.setItem('localCity',e.target.value);
                local.blur();
                weather();
            }
        }else{
            localStorage.setItem('localCity',e.target.value);
            weather();
        }
    }

    // 设置待办事项
    function setFocus(e){
        if(e.type === "keypress"){
            if(e.keyCode == 13 || e.which == 13){
                if(focus.value == ''){
                    focus.value = 'Focus?';
                }
                localStorage.setItem('focus',e.target.value);
                local.blur();
            }
        }else{
            localStorage.setItem('focus',e.target.value);
        }
    }

    // 计算倒计时
    function anni(){
        var now = new Date().getTime(),
        gap = now - countDate;
        // 定义时间
        var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
        //获取时间
        var days = Math.floor(gap / (day)),
        hours = Math.floor((gap % (day)) / (hour)),
        minutes = Math.floor((gap % (hour)) / (minute)),
        seconds = Math.floor((gap % (minute)) / (second));
        
        document.getElementById('day').innerText = days;
        document.getElementById('hour').innerText = hours;
        document.getElementById('minute').innerText = minutes;
        document.getElementById('second').innerText = seconds;
    }
    // 每一秒计算一次
    setInterval(function(){
        anni();
    },1000);
    
    function weather(){
        fetch(
            `https://free-api.heweather.net/s6/weather/now?location=${local.value}&key=740192290ada4adfb809c13578a015ba`
        ).then(res=>res.json())
        .then((data)=>{
            tmp.textContent = data.HeWeather6[0].now.tmp+"℃";
        });
    }
    getFocus();
    getLocal();
    weather();
}
