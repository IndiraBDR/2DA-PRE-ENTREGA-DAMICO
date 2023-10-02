console.log("probando WBK");

const socketClient = io();

const form = document.getElementById("Form agragar producto");
const inputTitle = document.getElementById("title");
const inputDescription= document.getElementById("description");
const inputStatus= document.getElementById("status");    
const inputPrice= document.getElementById("price");
const inputCode= document.getElementById("code");
const inputStock= document.getElementById("stock");
const inputCategory= document.getElementById("category");

const titleTex= document.getElementById("titleTex");

const descriptionTex= document.getElementById("descriptionTex");
const statusTex=document.getElementById("statusTex");
const priceTex= document.getElementById("priceTex");
const codeTex= document.getElementById("codeTex");
const stockTex= document.getElementById("stockTex");
const categoryTex= document.getElementById("categoryTex");




form.onsubmit=(e) =>{

    e.preventDefault();

    const title = inputTitle.value

    const description=inputDescription.value;
const status=inputStatus.value;
const price=inputPrice.value;
const code=inputCode.value;
const stock=inputStock.value;
const category=inputCategory.value;

    
    socketClient.emit("newTitle",title);
    socketClient.emit("newDescrption",description);



}

socketClient.on("titleUpdated", (title)=>{

    titleTex.innerText=title;



   

});

socketClient.on("descriptionUpdated", (description)=>{

   

    descriptionTex.innerText=description;

   

});

