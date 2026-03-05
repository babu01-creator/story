async function searchTopic(){

let topic=document.getElementById("topic").value;

let url="https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=false&explaintext=true&format=json&origin=*&titles="+topic+"&pithumbsize=300";

let res=await fetch(url);
let data=await res.json();

let pages=data.query.pages;
let page=pages[Object.keys(pages)[0]];

let text=page.extract;

let paragraphs=text.split("\n").slice(0,5);

let content="<h2>"+page.title+"</h2>";

paragraphs.forEach(p=>{
content+="<p>"+p+"</p>";
});

if(page.thumbnail){
content+="<img src='"+page.thumbnail.source+"' width='250'>";
}

document.getElementById("result").innerHTML=content;

getRelated(topic);

}



async function getRelated(topic){

let url="https://en.wikipedia.org/w/api.php?action=opensearch&search="+topic+"&limit=6&namespace=0&format=json&origin=*";

let res=await fetch(url);
let data=await res.json();

let list="";

for(let i=1;i<data[1].length;i++){

list+="<li onclick='selectTopic(\""+data[1][i]+"\")'>"+data[1][i]+"</li>";

}

document.getElementById("related").innerHTML=list;

}



function selectTopic(topic){

document.getElementById("topic").value=topic;

searchTopic();

}



function startVoice(){

let recognition=new webkitSpeechRecognition();

recognition.onresult=function(event){

let text=event.results[0][0].transcript;

document.getElementById("topic").value=text;

searchTopic();

}

recognition.start();

}