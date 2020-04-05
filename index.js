window.onload = ()=>{
    var countDate = new Date('Apr 6, 2017 14:00:00').getTime();
    var local = document.getElementById('localCity');
    var tmp = document.getElementById('tmp');

    // 获取地区
    function getLocal(){
        if(localStorage.getItem('localCity') === undefined || localStorage.getItem('localCity') === ''){
            local.textContent = '石家庄市';
        }else{
            local.textContent = localStorage.getItem('localCity')
        }
    }

    // 事件监听
    local.addEventListener('keypress',setLocal);
    local.addEventListener('blur',setLocal);

    // 设置地区
    function setLocal(e){
        if(e.type === "keypress"){
            if(e.keyCode == 13){
                localStorage.setItem('localCity',e.target.innerText);
                local.blur();
                weather();
                console.log(1);
            }
        }else{
            localStorage.setItem('localCity',e.target.innerText);
            weather();
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
            `https://free-api.heweather.net/s6/weather/now?location=${local.textContent}&key=740192290ada4adfb809c13578a015ba`
        ).then(res=>res.json())
        .then((data)=>{
            tmp.textContent = data.HeWeather6[0].now.tmp+"℃";
        });
    }
    getLocal();
    weather();
}