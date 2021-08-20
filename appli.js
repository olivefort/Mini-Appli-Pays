const contitab = ["europe","americas","africa","asia","oceania"];
const othertab = ["Bouvet Island","Heard Island and McDonald Islands","Antarctica"];
const URLreg = "https://restcountries.eu/rest/v2/region/";
const URLname = "http://restcountries.eu/rest/v2/name/";
const URL = "http://restcountries.eu/rest/v2/alpha/";
const conti = document.getElementById('conti');
const landList = document.getElementById('list');
const regionTitle = document.getElementById('regionT');
const sileu = document.getElementById('sileu');
const silam = document.getElementById('silam');
const silaf = document.getElementById('silaf');
const silas = document.getElementById('silas');
const siloc = document.getElementById('siloc');
const silan = document.getElementById('silan');
const retour = document.getElementById('return');
const first = document.getElementById('1');
const second = document.getElementById('2');
second.style.display = "none";
retour.addEventListener('click', ()=>{
    first.style.display = "block";
    second.style.display = "none";
})

sileu.addEventListener('click',()=>{
    seekCountry(URLreg, contitab[0]);
});
silam.addEventListener('click',()=>{
    seekCountry(URLreg, contitab[1]);
});
silaf.addEventListener('click',()=>{
    seekCountry(URLreg, contitab[2]);
});
silas.addEventListener('click',()=>{
    seekCountry(URLreg, contitab[3]);
});
siloc.addEventListener('click',()=>{
    seekCountry(URLreg, contitab[4]);
});
silan.addEventListener('click',()=>{
    /*petite ligne pour clear la list au changement de choix du continent*/
    let all_list = document.querySelectorAll('#list>li');   
    if(all_list.length > 0){
        for(let i = 0; i < all_list.length; i++){
            all_list[i].remove();
        }
    }
    for(let i=0;i<othertab.length;i++){
        otherCountry(URLname, othertab[i]);
    }
});

/*Fonction affichage des pays*/
function seekCountry(url, region){
    const requestData = new XMLHttpRequest();
    requestData.open("GET", url + region, true);
    requestData.addEventListener("readystatechange", function() {
        if (requestData.readyState === XMLHttpRequest.DONE && requestData.status === 200) {
            const data = JSON.parse(requestData.responseText);
            /*petite ligne pour clear la list au changement de choix du continent*/
            let all_list = document.querySelectorAll('#list>li');   
            if(all_list.length > 0){
                for(let i = 0; i < all_list.length; i++){
                    all_list[i].remove();
                }
            }
            for(let i=0;i<data.length;i++){
                const creaFlag= document.createElement('img');
                const creaLand = document.createElement('li');
                const arefLand = document.createElement('a');
                creaFlag.src = data[i].flag;
                creaFlag.className  = "miniflag";
                creaLand.className = "land";
                regionTitle.textContent = region; 
                arefLand.dataset.land = data[i].alpha3Code;
                creaLand.dataset.land = data[i].alpha3Code;
                creaLand.addEventListener('click', (ev)=> {
                    first.style.display = "none";
                    second.style.display = "block";
                    select(URL, creaLand.dataset.land);
                })
                creaLand.appendChild(creaFlag);
                const smallname = data[i].name;
                if (arefLand.dataset.land === "GBR"){
                    arefLand.textContent = "United Kingdom"
                    creaLand.appendChild(arefLand);
                    landList.appendChild(creaLand);
                }else if(arefLand.dataset.land === "UMI"){
                    arefLand.textContent = "U.S Minor Oultying Isl"
                    creaLand.appendChild(arefLand);
                    landList.appendChild(creaLand);
                }else if(arefLand.dataset.land === "SGS"){
                    arefLand.textContent = "Sth Georgia & Sth Sandwitch Isl"
                    creaLand.appendChild(arefLand);
                    landList.appendChild(creaLand);
                }else if(arefLand.dataset.land === "IOT"){
                    arefLand.textContent = "British Indi. Ocean Terr."
                    creaLand.appendChild(arefLand);
                    landList.appendChild(creaLand);
                }
                else{
                    arefLand.textContent = cutName(smallname);
                    creaLand.appendChild(arefLand);
                    landList.appendChild(creaLand);
                }
            }
        }
    });
    requestData.send()
}

/*Fonction pour les 3 autres pays*/
function otherCountry(url, otherpays){
    const requestData = new XMLHttpRequest();
    requestData.open("GET", url + otherpays, true);
    requestData.addEventListener("readystatechange", function() {
        if (requestData.readyState === XMLHttpRequest.DONE && requestData.status === 200) {
            const data = JSON.parse(requestData.responseText);
            regionTitle.textContent = "other"; 
            const creaFlag = document.createElement('img');
            const creaLand = document.createElement('li');
            const arefLand = document.createElement('a');
            creaFlag.src = data[0].flag;
            creaFlag.className  = "miniflag";
            creaLand.className = "land";
            arefLand.dataset.land = data[0].alpha3Code;
            creaLand.dataset.land = data[0].alpha3Code;
            creaLand.addEventListener('click', (ev)=> {
                first.style.display = "none";
                second.style.display = "block";
                select(URL, creaLand.dataset.land);
            })
            creaLand.appendChild(creaFlag);
            if (arefLand.dataset.land === "HMD"){
                arefLand.textContent = "Heard Isl. & McDonald Isl."
                creaLand.appendChild(arefLand);
                landList.appendChild(creaLand);
            }
            else{
            arefLand.textContent = data[0].name;
            creaLand.appendChild(arefLand);
            landList.appendChild(creaLand);
            }
        }
    })
    requestData.send()
}

/*Fonction pour raccourcir les noms*/
function cutName(name){
    for(let i=0;i<name.length;i++){
        if(name[i] === ","|| name[i] === "("){
            ref = i;
            cut = name.substr(0, ref);
            return(cut);
        }
    }
    return(name);
}


/*Fonction en créant la liste des continanat sans SVG*/
/*
function creaCont(){
    for(let i=0; i<contitab.length; i++){
        const creaCont = document.createElement('li');
        const arefname = document.createElement('a');
        creaCont.className = "btncont";
        arefname.dataset.region = contitab[i];
        console.log(arefname.dataset.region)
        arefname.addEventListener('click', (ev)=> {
            choixcontinent = contitab[i];
            seekCountry(URLreg, choixcontinent)
            
        })
        arefname.textContent = contitab[i];
        creaCont.appendChild(arefname);
        conti.appendChild(creaCont);
    }
    const creaOther = document.createElement('li');
    const arefOthername = document.createElement('a');
    creaOther.className = "btncont";
    arefOthername.dataset.region = "other";
    arefOthername.addEventListener('click', (ev)=>{
        regionTitle.textContent = "other";
        for(let i=0;i<othertab.length;i++){
            otherName = othertab[i];
            otherCountry(URLname,otherName);
            console.log(URLname+otherName);
        }
        let all_list = document.querySelectorAll('#list>li');   
            if(all_list.length > 0){
                for(let i = 0; i < all_list.length; i++){
                    all_list[i].remove();
                }
            }
    })
    arefOthername.textContent = "other";
    creaOther.appendChild(arefOthername);
    conti.appendChild(creaOther);
}
*/

/*PARTIE PAYS*/

/*Lien vers le DOM*/
const title = document.getElementById('title');
const stitle = document.getElementById('alpha');
const reg = document.getElementById('region');
const popu = document.getElementById('popu');
const lang = document.getElementById('lang');
const monaie = document.getElementById('monaie');
const scont = document.getElementById('scont');
const sup = document.getElementById('sup');
const capi = document.getElementById('capi');
const hab = document.getElementById('hab');
const drap = document.getElementById('flag');
const vois = document.getElementById('paysbord');
const pf = document.getElementById('pf');
const tld = document.getElementById('tld');
const natname = document.getElementById('nn');
const tp = document.getElementById('titre_page'); 
const filtercont = document.getElementById('filterCont');
const countri = "";

/*lien API et fonction pour la requete AJAX*/
// const URL = "http://restcountries.eu/rest/v2/alpha/";
// select(URL, creaLand.dataset.land);

function select(linq, land){
    const requestData = new XMLHttpRequest();
    requestData.open("GET", linq + land, true);
    requestData.addEventListener("readystatechange", function() {
        if (requestData.readyState === XMLHttpRequest.DONE && requestData.status === 200) {
            const response = JSON.parse(requestData.responseText);
            console.log(response);
            addPays(response.name, response.alpha3Code, response.capital, response.region, response.subregion, response.population, response.area, response.flag, response.currencies, response.languages, response.demonym, response.topLevelDomain, response.nativeName, response.borders)
        }
    });
    requestData.send()

    
    
    /*Fonction pour clear les <li> au clic des pays frontaliers*/
    let all_list = document.querySelectorAll('#monaie>li,#lang>li,#paysbord>li');   
    if(all_list.length > 0){
       for(let i = 0; i < all_list.length; i++){
           all_list[i].remove();
       }
    }

    /*Fonction pour raccourcir les noms*/
    function cutName(name){
        for(let i=0;i<name.length;i++){
            //console.log(name[i]);
            if(name[i] === ","|| name[i] === "("){
                ref = i;
                cut = name.substr(0, ref);
                return(cut);
            }
        }
        return(name);
    }

    /*Fonction pour remonter en haut de page*/
    function backToTop() {
        if (window.pageYOffset > 0) {
          window.scrollBy(0, -2000);
          setTimeout(backToTop, 0);
        }
    }

    /*Fonction pour creer des points dans les chiffres (1.000.000.000)*/
    function cutNumber(chiffre){
        let transform = chiffre.toString();
        const sepa = transform.split('');
        for(let i=0; i<transform.length;i++){
            let mod = (transform.length - (transform.length-i)) + 1;
            if((mod%3 === 0)&&(mod !== transform.length)){
                sepa.splice(transform.length - mod, 0, '.')
            }
        }
        conv = sepa.join('');
        return(conv);

        //solution Antho
        // return chiffre.match(/.{1,3}/g).join('.');
    }
    
    /*Fonction en lien avec la requete AJAX qui va creer la page dynamiquement*/
    function addPays(name, alpha, capital, region, subregion, population, area, flag, currencies, languages, demonym, top, native, borders){
        
        /* Une valeur unique pour ces éléments*/
        tp.textContent = cutName(name);
        title.textContent = cutName(name); 
        stitle.textContent = alpha;
        capi.textContent = capital; 
        reg.textContent = region; 
        scont.textContent = subregion; 
        popu.textContent = cutNumber(population) + ' M';
        sup.textContent = cutNumber(area) + ' Km²'; 
        hab.textContent = demonym;
        tld.textContent = top;
        natname.textContent = native;
        drap.src = flag;
        // console.log(reg.textContent);

        /*Plusieurs valeurs possible dans ces éléments*/
        let money_name = currencies.map(i => i.name);
        for(let i=0; i < currencies.length; i++){
            const money = document.createElement('li');
            money.textContent = money_name[i];
            monaie.appendChild(money)
        }
        
        let langage_name = languages.map(i => i.name);
        for(let i=0; i < languages.length; i++){
            const langue = document.createElement('li');
            langue.textContent = langage_name[i];
            lang.appendChild(langue)
        }

        /*Partie pays frontalier avec conditions et possibilité de lien*/
        if(borders.length === 0){
            pf.textContent = "NO BORDER COUNTRIES"
        }else{
            pf.textContent = "BORDER COUNTRIES"
            for(let i=0; i<borders.length; i++){
                //construction des éléments via boucle
                const voisin = document.createElement('li');
                const aref = document.createElement('a');
                voisin.className = "btnbord"
                cutName(borders[i]);
                aref.dataset.land = borders[i]
                // console.log(aref.dataset.land)
                aref.addEventListener('click', (ev)=> {
                    choixPays = borders[i];
                    select(URL, choixPays)
                    backToTop()
                })
                //construction requete AJAX pour les pays frontaliers en affichant leurs nom sans parenthèses ou autres compléments
                let requestIso = new XMLHttpRequest();
                requestIso.open("GET", URL + borders[i], true);
                requestIso.addEventListener("readystatechange",  () => {
                    if (requestIso.readyState === XMLHttpRequest.DONE && requestIso.status === 200) {
                        aref.textContent = cutName(JSON.parse(requestIso.responseText).name);
                        vois.appendChild(voisin);
                        voisin.appendChild(aref);
                    }              
                });
                requestIso.send();
            }
        }
    }
}