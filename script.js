


let count = 3
function addField() {



    count++;
    const container = document.getElementById('articles');
    const field = document.createElement('div');
    field.classList.add('article')
    field.innerHTML = `<label for="" id="label${count} " class="label"><b>ARTICLE ${count}</b></label> <button type="button" class="remove">X</button><br>
                        <input type="text" id="element${count}" class="name item" placeholder="Nom de l'article"><br>
                        <input type="number" id="element${count}-puissance item" class="puissance" placeholder="Puissance(W)"><br>
                        <input type="number" id="element${count}-heure item" class="heure" placeholder="Nombre d'heures d'utilisation par jour"><br>
                        <input type="number" id="element${count}-jour item" class="jour" placeholder="Nombre de jours utilisé par semaine(J)">
                        `;
    container.appendChild(field);

}

function output() {
    // Réccupération des données des charges
    let total = 0;
    let puissanceTotale = 0;
    let puissance = 0;
    let consommation = 0;
    const articles = document.querySelectorAll('.article');

    // Get the div 'outputs'
    const display = document.getElementById('outputs');
    // clear the previous content
    display.innerHTML = '';

    //Create the new divs
    const infoSystemes = document.createElement('div');
    const relveCharges = document.createElement('div');
    const results = document.createElement('div');
    results.classList.add('result');
    infoSystemes.classList.add('IS');
    relveCharges.classList.add('RC');

    display.appendChild(relveCharges)
    display.appendChild(infoSystemes)
    display.appendChild(results)


    
    let puissanceFrigo = 0;

    articles.forEach(div => {
        let nomInput = div.querySelector('.name');

        if(nomInput.value.toLowerCase() === 'refrigerateur') {
            let puissanceInput = div.querySelector('.puissance');
            puissanceFrigo = puissanceInput.value;
        }
    })
    console.log(puissanceFrigo)

    articles.forEach((article,index) => {
        const nom = article.querySelector('.name')?.value||`Article ${index + 1}`;
        puissance = Number(article.querySelector('.puissance')?.value)||0;
        const heure = Number(article.querySelector('.heure')?.value)||0;
        const jour = Number(article.querySelector('.jour')?.value)||0;

        if(!isNaN(puissance)) {
            if(nom.toLowerCase() === 'refrigerateur') {
                consommation += ((puissance/3) * heure * jour)/7;
            } else{
                consommation += (puissance * heure * jour)/7;
            }
        }
 
        puissanceTotale += puissance;

        //puissance = puissanceTotale - ((2/3)*Number(puissanceFrigo))

        //const consommation = (puissance * heure * jour)/7; 
        //total += consommation;

        console.log(puissanceTotale)
        console.log(consommation)

        const paragraph = document.createElement('p')
        paragraph.classList.add('p') 
        paragraph.innerHTML = `
            <strong>${nom}</strong><br>
            Puissance : <strong>${puissance} W</strong><br>
            Nombre d'heures utilisée/jour : <strong>${heure} H</strong><br>
            Nombre de jours utilisée/semaine : <strong>${jour} Jours</strong>
        `
        relveCharges.append(paragraph)
       
    })


    // Réccupérration des données du sytème
    const autonomie = document.querySelector('#autonomie').value
    const tensionBatterie = document.querySelector('#volt_batt').value
    const ahBatterie = document.querySelector('#ah_batt').value
    const selected = document.querySelector('input[name="tension onduleur"]:checked')

    let tensionOnduleur = 0;
    if(selected) {
        tensionOnduleur = Number(selected.value);
    }
    console.log(tensionOnduleur)
    // Calcul 
    const energieTotalQuo = consommation;
    const tailleBattAutonome = energieTotalQuo * autonomie
    const tailleApproximative = tailleBattAutonome * 2
    const tailleAdmissible = tailleApproximative * 1.2
    const tailleAh = tailleAdmissible / tensionOnduleur
    let parrallele = tailleAh / ahBatterie
    parrallele = Math.round(parrallele)
    const serieBatt = tensionOnduleur / tensionBatterie
    const nombreDeBatterie = serieBatt * Math.round(parrallele)

    // Calcule de la puissance de l'onduleur
    const puissanceOnduleur = puissanceTotale + (puissanceTotale * 0.35)
    console.log(puissanceOnduleur)

    console.log(parrallele)


    infoSystemes.innerHTML = `
        <BR> <strong>INFORMATIONS SYSTÈME</strong><br>
        <br>
        Autonomie : <strong>${autonomie} jours</strong><br>
        Tension Batterie : <strong>${tensionBatterie} V</strong><br>
        Ampère-Heure : <strong>${ahBatterie} AH</strong> <br>
        Tension de l'onduleur : <strong>${tensionOnduleur} V
    `;

    results.innerHTML = `
        <strong><u> CALCULS </u></strong><br>
        <br>
        Nombre de batteries : <strong>${nombreDeBatterie} batteries</strong> (avec un banc de <strong>${serieBatt} batteries</strong> en série et <strong>${parrallele} batteries</strong> en parralèle.)<br>
        Taille des batteries : <strong>${tailleAh.toFixed(2)} AH</strong><br>
    `

}





document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#newField').onclick = function() {
        addField()
    }   

    document.getElementById('articles').addEventListener('click', e => {
        if(e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
    }
    })

    document.getElementById('calculation').onclick = function () {
        const inputs = document.querySelectorAll('.item');
        const errorMsg = document.getElementById('errormsg');

        const allFilled = Array.from(inputs).every(input => input.value.trim() !=="");


        if(!allFilled) {
            errorMsg.classList.remove('hidden');
            return;
        }

        errorMsg.classList.add('hidden');
        output()
        document.getElementById('outputs').style.display = 'block';
        
        


    }





    
})

