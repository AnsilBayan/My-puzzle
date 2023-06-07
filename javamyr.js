"use strict";

const buttons = document.querySelectorAll(".button");
const button_1 = document.querySelector("#buttonpos_1");
const button_2 = document.querySelector("#buttonpos_2");
const button_3 = document.querySelector("#buttonpos_3");
const button_4 = document.querySelector("#buttonpos_4");
const button_5 = document.querySelector("#buttonpos_5");
const button_6 = document.querySelector("#buttonpos_6");
const button_7 = document.querySelector("#buttonpos_7");
const button_8 = document.querySelector("#buttonpos_8");
const button_9 = document.querySelector("#buttonpos_9");
const quit = document.querySelector("#quit");
const newgame = document.querySelector("#newgame");
const difficulty = document.querySelector("#difficulty");
const htp = document.querySelector("#htp");
const difb = document.querySelectorAll(".difb");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");
const back = document.querySelectorAll(".back");
const _set=document.querySelectorAll(".set");
const replay=document.querySelector("#replay");


newgame.addEventListener('click',function(){
    document.getElementById('initial').style.display='none';
    document.getElementById("setup").style.display = "block";

})

difficulty.addEventListener("click", function () {
    document.getElementById("initial").style.display = "none";
    document.getElementById("difpage").style.display = "block";
});

htp.addEventListener("click", function () {
    document.getElementById("initial").style.display = "none";
    document.getElementById("htp_page").style.display = "block";
});

replay.addEventListener("click",function(){
    refresh();
})

for(let i=0;i<_set.length;i++){
_set[i].addEventListener('click', function () {
    s=i;
    document.getElementById("setup").style.display = "none";
    document.body.style.backgroundImage = "url('./images/h.jpg')";
    document.getElementById("game").style.display = "block";
    refresh()
})}


for(let i=0;i<buttons.length;i++){
buttons[i].addEventListener('click',function(){
    mouseclick(i);
} 
)}

document.addEventListener("keypress", function onPress(e) {
    if(document.getElementById("game").style.display=='block'){
        if( ['1','2','3','4','5','6','7','8','9'].includes(e.key))
            mouseclick(parseInt(e.key)-1);
        
    }
})

function mouseclick(i){
    disp("");
    if (s == 2) {
        if (count < 6 && win == 0) {
        begin(i + 1);
        winner_m();
        if (win == 0 && count > 0) {
          // console.log(count);
            disp(`${player == 1 ? "Red" : "Blue"}'s turn`);
        }
        } else {
        if (win == 0) {
            realplay(i);
            winner_m();
        } else {
            but_ref(1);
            disp("Game Over");
        }
        }
    } else {
        if (count < 6 && win == 0) {
        begin_2(i + 1);
        winner_adv();
        if (s == 1 && count == 6 && win == 0) {
            simplex(l1, l2);
        }
        winner_adv();
        } else if (win == 0) {
        realplay_adv(i);
        winner_adv();
        } else {
        but_ref(1);
        disp("Game Over");
        }
      // console.log(l1,l2);
    }
}

for(let i=0;i<back.length;i++){
back[i].addEventListener('click', function () {
    document.getElementById("game").style.display = "none";
    document.getElementById("htp_page").style.display = "none";
    document.getElementById("difpage").style.display = "none";
    document.getElementById("setup").style.display = "none";
    document.getElementById("initial").style.display = "block";
    document.body.style.backgroundImage = "url('./images/initial_bg.jpg')";
    if (timer) {
        clearInterval(gh);
        timer = 0;
    }
})}

for(let i=0;i<difb.length;i++){
difb[i].addEventListener('click', function () {
    for(let j=0;j<difb.length;j++)
        document.getElementById(difb[j].id).style.backgroundColor='black';
    document.getElementById(difb[i].id).style.backgroundColor='lightgreen';
    diff=i;
})}

function border(j){
    if( document.getElementById(buttons[j].id).style.borderColor!='deeppink'){
        but_ref(0);
        document.getElementById(buttons[j].id).style.borderColor = "deeppink";
        adj_dis(j + 1);
    }
    else
        but_ref(0);
}

function disp(a){
    document.getElementById("text").innerHTML = a;
}

function but_ref(a){
    for (let i = 0; i < buttons.length; i++){
    document.getElementById(buttons[i].id).style.borderColor = "black";
    if(a==1){
        disp('Lets Go..')
        document.getElementById(buttons[i].id).style.backgroundColor ="#4CAF50";

}}}

function adj_dis(a){
    const l=adj_f(a,army);
    for(let i=0;i<l.length;i++){
        document.getElementById("buttonpos_" + l[i]).style.borderColor ="red";
}}

function begin(a){
    if(army.includes(a)){
        if(player==1){
            if(count==0 && a==5){
                disp('No 5 in first turn');
                return 0;
            }
            else{
            document.getElementById("buttonpos_" + (a)).style.backgroundColor='red';
            player=2;
            l1.push(a);
        }}
        else{
            document.getElementById("buttonpos_" + (a)).style.backgroundColor ="blue";
            player = 1;
            l2.push(a)
        }
        count++;
        army.splice(army.indexOf(a),1);
        // if(player==2 && count<6)
        //     console.log(brain_start(l2, l1, army));
    }
    else
        disp('Invalid');
}

function begin_2(a){
    if(s==0 && player==1){
        begin(a);
        if(player==2){
        let u=brain_start(l2,l1,army);
        begin(u);
        disp(u);
        console.log('a')
        second=11;
        }
    }
    else if(s==1 && player==2){
        begin(a);
        if(count<6 && player==1){
        let u = brain_start(l1, l2, army);
        begin(u);
        disp(u);
        console.log("a");
        second=11;
        }
    }
}

function adj_f(a,b){
    return adj[a].filter(x => b.includes(x));
}

function realplay(a){
    if(select==0){
        if (((player===1)&&(l1.includes(a+1)))||((player===2)&&(l2.includes(a+1)))){
            border(a);
            disp(`${a + 1} selected`);
            select = a + 1;
        }
        else if(army.includes(a+1))
            disp("Invalid");
        else
            disp('wrong piece selected');
    }
    else{
        if(adj_f(select,army).includes(a+1)){   
            movement(select,a+1);
            player=(player==1)?2:1;
            army.splice(army.indexOf(a+1), 1, select);
        }
        else{
            disp('Invalid');
        }
        select = 0;
        but_ref(0);
    }
}

function realplay_adv(a){
    if (s == 0 && player == 1) {
        realplay(a);
        winner_adv();
        if(player==2 && win==0){
        simplex(l2,l1);
        }
    } else if (s == 1 && player == 2) {
        realplay(a);
        winner_adv();
        if (player == 1 && win == 0) {
            simplex(l1,l2);
        }
    }
}

function simplex(a,b){
    let u = real_brain(a, b, army);
    movement(u[0],u[1]);
    player = player == 1 ? 2 : 1;
    army.splice(army.indexOf(u[1]), 1, u[0]);
    disp(`${u[0]} moved to ${u[1]}`);
}

function movement(s,a){
    if(player==1){
        document.getElementById("buttonpos_" + a).style.backgroundColor ="red";
        l1.splice(l1.indexOf(s),1,a)
    }
    else{
        document.getElementById("buttonpos_" + a).style.backgroundColor = "blue";
        l2.splice(l2.indexOf(s), 1, a);
    }
    document.getElementById("buttonpos_" + s).style.backgroundColor ="#4CAF50";
    disp(`${s} moved to ${a}`);
    second=11;
    draw++;
}

function winner_m(){
    if(win_check(l1)==1){
        disp("Red wins🥳");
        win=1;
    }
    else if(win_check(l2)==1){
        disp("Blue wins🥳");
        win=2;
    }
    else if(draw==40){
        disp('Draw');
        win=3;
    }  
}

function winner_adv(){
    if((s==0 && win_check(l1)==1)||(s==1 && win_check(l2)==1)){
        disp("You Won🥳");
        win=1;
    }
    else if((s==0 && win_check(l2)==1)||(s==1 && win_check(l1)==1)){
        disp('You Loose🥺');
        win=2;
    }
    else if(draw==40){
        disp("Draw");
        win = 3;
    }
}

function win_check(a){
    a.sort();
    if (set.some((p) => JSON.stringify(a) == JSON.stringify(p))) {
        return 1;
    }
    else
        return 0;
}

function possibility(a,b){
    poss=[];
    a.sort()
    for(let i=0;i<3;i++){
        poss.push(adj_f(a[i],b));
    }
    return poss;
}

function collection(a,b){
    demo_2=[];
    demo = possibility(a, b);
    for(let i=0;i<demo.length;i++){
        for(let j=0;j<demo[i].length;j++){
            demo_2.push([a[i],demo[i][j]]);
        }
    }
    return demo_2;
}

function locked(a,b,d){
    let c = collection(b, d);
    // console.log(c);
    let k=1;
    for(let i=0;i<c.length;i++){
        model_5 = [...d];
        model_6 = [...b];
        model_5.splice(model_5.indexOf(c[i][1]), 1, c[i][0]);
        model_6.splice(model_6.indexOf(c[i][0]), 1, c[i][1]);
        // console.log(model_5,model_6);
        if(brain_1(a, model_5).length==0){
            k=0;
        }
    }
    return k;
}

function brain_1(a,b){
    poss=possibility(a,b);
    win_set=[];
    for(let i=0;i<3;i++){
        for(let j=0;j<poss[i].length;j++){
            model=[...a];
            model.splice(model.indexOf(a[i]), 1, poss[i][j]);
            if(win_check(model)==1)
                win_set.push([a[i], poss[i][j]]);
        }
    }
    return win_set;
}

function brain_2(a,b,c){
    win_set2=[];
    win_set=brain_1(b,c);
    if(win_set.length>0){
        k=win_set[0][1];
        for(let i=0;i<3;i++){
            if(adj[a[i]].includes(k)){
                win_set2.push([a[i],k]);
            }
        }
    }
    return win_set2;
}

function brain_3(a,b,c,d){
    model_2=[];
    if(c.length==0){
        c = collection(a, d);
    }
    // console.log(c);
    if(c.length>0){
        model_2 = [...c];
        // console.log(c);
        for(let i=0;i<c.length;i++){
            model_4 = [...d];
            model_3=[...a]
            model_4.splice(model_4.indexOf(c[i][1]), 1, c[i][0]);
            model_3.splice(model_3.indexOf(c[i][0]), 1, c[i][1]);
            // console.log(model_3,model_4,b);
            if((brain_1(b,model_4).length)!=0){
                // console.log('a');
                model_2.splice(model_2.indexOf(c[i]),1)
            }
            else if((brain_1(model_3,model_4)).length>1){
                // console.log("b");
                model_2=[c[i]];
                return model_2;
            }
            else if(((brain_1(model_3,model_4).length)>0)&&(brain_2(b,model_3,model_4)==0)){
                // console.log('c');
                model_2 = [c[i]];
                return model_2;
            }
            else if(locked(model_3,b,model_4)){
                // console.log("d");
                model_2 = [c[i]];
                return model_2;
            }
        }
    }
    return model_2;
}

function brain_4(a,b,c,d){
    model_7=[...c]
    for(let i=0;i<c.length;i++){
        model_8=[...d];
        model_9=[...a];
        model_8.splice(model_8.indexOf(c[i][1]), 1, c[i][0]);
        model_9.splice(model_9.indexOf(c[i][0]), 1, c[i][1]);
        // console.log(model_7,model_8,model_9);
        if(brain_3(b,model_9,[],model_8).length==1){
            // console.log('i');
            model_7.splice(model_7.indexOf(c[i]),1);
        }
    }
    return model_7;
}

function brain_start(a,b,c){
    if(brain_start1(a,c))
        return brain_start1(a, c);
    else if(brain_start1(b,c))
        return brain_start1(b, c);
    model_10=[...c];
    if(count==5){
        if(brain_start3(a,b,c))
            return brain_start3(a, b, c);
    }
    for(let i=0;i<c.length;i++){
        model_9=[...c];
        model_7=[...a,c[i]];
        model_8=[...b,c[i]];
        model_9.splice(model_9.indexOf(c[i]),1);
        if(count==3 && diff>0){
            // console.log(model_7, b, model_9);
            if(brain_start2(model_7,b,model_9)){
                // console.log(c[i]);
                return c[i];
            }}
        if(count==5 && brain_1(b,model_9).length>0 && diff>1){
            model_10.splice(model_10.indexOf(c[i]), 1);
        }     
    }
    // console.log(model_10);
    if(b.length==3 && brain_1(b,c).length>0 && diff>0){
            return brain_1(b, c)[0][1];
        }
    if(diff>0)
        return random_selector2(model_10);
    else{
        return random_selector(c);
    }

}

function brain_start1(a,c){
    for(let i=0;i<c.length;i++){
        model_7 = [...a, c[i]];
        if(win_check(model_7))
            return c[i];
    }
    return 0;
}

function brain_start2(a,b,c){
    if(brain_start1(a,c)){
        let e = brain_start1(a, c);
        let y=[...b,e];
        let z=[...c];
        z.splice(z.indexOf(e), 1);
        // console.log(e,y,z);
        if (brain_start3(a,y,z))
            return 1;
    }
    return 0;
    }

function brain_start3(a,y,z){
    for(let i=0;i<z.length;i++){
        let x = [...a, z[i]];
        let w = [...z];
        w.splice(w.indexOf(z[i]), 1);
        if(brain_1(x,w).length>0 && brain_2(y,x,w).length==0 && brain_1(y,w).length==0)
                return z[i];
    }
    return 0;
}


function real_brain(a,b,c){
    // console.log(brain_2(a, b, c));
    if(brain_1(a,c).length>0){
        return brain_1(a, c)[0];
    }
    else if(brain_2(a,b,c).length==1){
        return brain_2(a, b, c)[0];
    }
    else if(brain_2(a,b,c).length>1){
        return brain_3(a, b, brain_2(a, b, c),c)[0];
    }
    else{
        let k=brain_3(a,b,[],c);
        // console.log(k);
        if(k.length==1 && diff>0){
            return k[0];
        }
        else if(k.length>1 && diff>1){
            // console.log('j',k);
            return random_selector(brain_4(a,b,k,c));
        }
        else{
            return random_selector(collection(a,c));
        }
    }}

function random_selector(l){
    const randomIndex = Math.floor(Math.random() * l.length);
    return l[randomIndex];
}

function random_selector2(a){
    const p1=[1,3,7,9]
    // console.log(a);
    if(a.includes(5) && army.length!=9)
        return 5;
    else{
        for(let i=0;i<4;i++){
            if(!a.includes(p1[i]))
                p1.splice(i,1);
        }
        if(count>1){
            let p2=[]
            if(s==0){
                p2 = threat(l2, p1);}
            else{
                p2 = threat(l1, p1);
            }
            // console.log(p2);
            if(p2.length>0){
                return random_selector(p2);
        }}
        if(p1.length>0)
            return random_selector(p1);
        else
            return random_selector(a);
    }
}

function threat(a,c){
    let q=[];
    for(let i=0;i<c.length;i++){
        let u=[...a,c[i]];
        let w=[...army];
        w.splice(w.indexOf(c[i]),1)
        // console.log(u,w);
        if(brain_start1(u,w)>0)
            q.push(c[i]);
    }
    // console.log(q);
    return q;
}

function time_limit(){
        document.getElementById("sec").textContent = second;
        document.getElementById("time").style.backgroundColor = "black";
        gh=setInterval(function(){
        timer=1;
        second -= 1;
        document.getElementById("sec").textContent = second;
        if(second<4){
            document.getElementById("time").style.backgroundColor = 'red';
        }
        else{
            document.getElementById("time").style.backgroundColor = "black";
        }
        if(second==0 || win>0){
            if(second==0){
                win = 1;
                disp("Time ran out....⏰ U loose");
                document.getElementById("time").style.display = "none";
                clearInterval(gh);
            }
            document.getElementById("time").style.display = "none";
            clearInterval(gh);     
        }
    },1000)
}

function refresh(){
    poss=[];
    player = 1;
    count = 0;
    select = 0;
    army = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    l1 = [];
    l2 = [];
    draw=0;
    win = 0;
    second=10;
    but_ref(1);
    if (s == 1) {
        let q=random_selector2(army);
        begin(q);
        disp(q);
    }
    if (timer) {
        clearInterval(gh);
        timer = 0;
    }
    if(s<2 && diff==2){
        document.getElementById("time").style.display = "block";{
        time_limit();
        }
    }
    else document.getElementById("time").style.display = "none";
}


let army=[1,2,3,4,5,6,7,8,9];
let army_d=[];
let win_set=[];
let win_set2=[]
let model=[];
let model_2=[];
let model_3=[];
let model_4=[]
let model_5 = [];
let model_6 = [];
let model_7 = [];
let model_8 = [];
let model_9 = [];
let model_10 = [];
let model_11 = [];
let demo=[];
let demo_2=[];
let draw=0
let l1=[];
let l2=[];
let poss=[];
let second=10;
let timer=0;
let gh;
const adj={
    1:[2,4,5],
    2:[1,3,5],
    3:[2,5,6],
    4:[1,5,7],
    5:[1,2,3,4,6,7,8,9],
    6:[3,5,9],
    7:[4,5,8],
    8:[5,7,9],
    9:[5,6,8]
}
const set=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let s=0;
let k=0;
let player=1;
let count=0;
let select=0;
let win=0;
let diff=0;

