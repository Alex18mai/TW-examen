
window.onload=function(){

    console.log("merge");


    //FILTRARE

    let btn=document.getElementById("filtrare");
    btn.onclick=function(){

        let sport=document.getElementById("sport");
        let tehnica=document.getElementById("tehnica");
        let stiinta=document.getElementById("stiinta");
        let copii=document.getElementById("copii");

        var produse=document.getElementsByClassName("produs");
    
        var ok = 0;
        var cntr = 0;

        for (let prod of produse){

            prod.style.display="none";

            let tematici= prod.getElementsByClassName("val-tema");
            

            for (let i=0; i<tematici.length; i++){
                let val_tema = tematici[i].textContent;
                console.log(val_tema);
                if (val_tema != undefined){
                    if (val_tema.localeCompare("sport") == 0 && sport.checked) ok = 1;
                    if (val_tema.localeCompare("tehnica") == 0 && tehnica.checked) ok = 1;
                    if (val_tema.localeCompare("stiinta") == 0 && stiinta.checked) ok = 1;
                    if (val_tema.localeCompare("copii") == 0 && copii.checked) ok = 1;
                }
                
            }

            if (ok)
            {
                prod.style.display="block";
                cntr++;
            }
        }

        if(!cntr) alert("Nu avem niciun film pe placul dumneavoastra");
    }

    function sortArticole(factor){
        
        var produse=document.getElementsByClassName("produs");
        let arrayProduse=Array.from(produse);
        arrayProduse.sort(function(art1,art2){

            let nrpagini1=parseInt(art1.getElementsByClassName("val-nrpagini")[0].innerHTML);
            let nrpagini2=parseInt(art2.getElementsByClassName("val-nrpagini")[0].innerHTML);

            let pret1=parseInt(art1.getElementsByClassName("val-pret")[0].innerHTML);
            let pret2=parseInt(art2.getElementsByClassName("val-pret")[0].innerHTML);


            let one = String(nrpagini1/pret1);
            let two = String(nrpagini2/pret2);


            if (factor == "Cresc"){
                return one.localeCompare(two);
            }
            else{
                return -1*one.localeCompare(two);
            }
        });
        console.log(arrayProduse); 
        for (let prod of arrayProduse){
            prod.parentNode.appendChild(prod);
        }
    }

    
    //SORTARE


    btn=document.getElementById("sortare");
    btn.onclick=function(){

        var getSelectedValue = document.querySelector('input[name="radio1"]:checked');
        console.log("sortez: ", getSelectedValue.value);

        sortArticole(getSelectedValue.value)
    }



    //SETARE


    btn=document.getElementById("setare");
    btn.onclick=function(){

        let inp_pret=document.getElementById("inp-pret");
        let maxPret = inp_pret.value;
        localStorage.setItem("maxPret", maxPret);
    }

    maxPret = parseInt(localStorage.getItem("maxPret"));

    var produse=document.getElementsByClassName("produs");

    console.log(maxPret);

    for (let prod of produse){
        let pret=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
        if (pret < maxPret){
            prod.style.border = "3px green dotted";
        }
    }

}