//九宫格抽奖JS版本
var modLotteryV2=function(options){
    var defaults = {
        'domId':'',
        'domItem':'',
        'curClass':'selected'
    };
    $.extend(this, defaults, options || {});
    var me = this;
    me.init();
};
modLotteryV2.prototype={
    init:function(){
        var me = this;
    },
    play:function(rollstep){
        var me = this;
        var i=0;
        var len =$(me.domId+" "+me.domItem).length;
        var num = Math.floor(Math.random()*3+3)*len+rollstep;
        function rollAnimate(){   
            if(i<num){
                setTimeout(function(){
                    $(me.domId+" "+me.domItem).removeClass(me.curClass);
                    $(me.domId+" "+me.domItem).eq(i%len).addClass(me.curClass);
                    i++;
                    rollAnimate();
                },100);
            }else{
                var _overCallback = me.overCallback || function () {};
                _overCallback({"status":1,'selected':rollstep});
            }
        }
        rollAnimate();
    }
};
var lottery01 = new modLotteryV2({
    'domId':'#listLottery',
    'domItem':'.item',
    'curClass':'current',
    'overCallback':function(data2){
        setTimeout(function(){alert('恭喜您中奖了:'+data2.selected);},300)
    }
});
$("#listLottery .lottery-btn").click(function(e){
    var num = Math.floor(Math.random()*8+1);//产生随机数1-3,这个可以由开发传入
    lottery01.play(num);
});
//抽奖按钮效果
// function btnFlash(){
//     $("#listLottery .light").animate({left:"175px"},1300,function(){$(this).css({left:"-60px"});});
// }
//window.setInterval("btnFlash()",1100);