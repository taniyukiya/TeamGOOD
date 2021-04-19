<template>
    <div id="header">
            <p class="title" id="main_title">Team.Good</p>
            <p class="title">～グッドなニュースサイト～</p>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&family=Pacifico&display=swap');

#header{
    font-family: 'Pacifico', 'M PLUS Rounded 1c';
    color: #694A38;
    background:linear-gradient(to bottom right, #F4AC45 60%,#ff80bb);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
}

.title{
    float: left;
    margin:30px;
}

#main_title{
    font-size: 40px;
    margin:5px;
}

h1{
    margin:10px;
}

</style>