



  function MostraPiu(event){
  
    const eve = event.currentTarget;
    eve.removeEventListener('click', MostraPiu);

    const container = Container(eve);
    container.classList.remove('desc');

    eve.textContent = 'Mostra -';
    eve.addEventListener('click', MostraMeno);
    
  }


  function MostraMeno(event){
    const eve = event.currentTarget;
    eve.removeEventListener('click', MostraMeno);
    const container = Container(eve);
    container.classList.add('desc');
    eve.textContent = 'Mostra +';
    eve.addEventListener('click', MostraPiu);
  }  

  function Container(nodo){   
    for(const tag of tagDesc){        
        if(tag.parentNode.id === nodo.parentNode.id){          
            return tag;
        }    
  }
  return null;    
}

  const tagDesc = document.querySelectorAll('.desc'); 
  const mostraDesc = document.querySelectorAll('.info h2');
  for(const piu of mostraDesc)
  {
    piu.addEventListener('click', MostraPiu);
  }

  //caricamento dei contenuti
 

    const container1 = document.querySelectorAll('.img');
    const container2 = document.querySelectorAll('.album');  
    const container3 = document.querySelectorAll('.desc'); 
    let alb = null;
    let art = null;
    let desc = null;
    let img = null;

   
    
    for(let i = 0; i<CONTENUTI.length; i++){
        //album
        
        alb = document.createElement('a');
        alb.textContent = CONTENUTI[i].album;
        container2[i].appendChild(alb);

        //artista
        art = document.createElement('a');
        art.textContent = CONTENUTI[i].artista;        
        container2[i].appendChild(art);

        //img
        img = document.createElement('img');
        img.src = CONTENUTI[i].immagine;
        container1[i].appendChild(img);

        //descrizione
        desc = document.createElement('div');
        desc.textContent = CONTENUTI[i].descrizione;        
        container3[i].appendChild(desc);
    }


    //ricerca

    const ricerca = document.querySelector('input');
    const auxProdotti = document.querySelectorAll('.prodotto');
    const prodotti = [];
    for(let x of auxProdotti){
        prodotti.push(x);
    }
    ricerca.addEventListener('keyup', Ricerca);
    const ric = [];
    let parola = '';
    function Ricerca(event){
      
  if(event.key !== 'Shift' && event.key !== 'CapsLock'){
        parola = '';    
        if(event.key !== 'Backspace'){
            ric.push(event.key);
            for(let j = 0; j<ric.length; j++){
                parola += ric[j];
            }
            for(let i = 0; i<CONTENUTI.length; i++){
                if(CONTENUTI[i].album.search(parola) === -1){
                    prodotti[i].classList.add('hidden');    
                }
            }    
        }else{
            ric.pop();
            for(let j = 0; j<ric.length; j++){
                parola += ric[j];
            }               
            for(let i = 0; i<CONTENUTI.length; i++){
                if(CONTENUTI[i].album.search(parola) !== -1){
                    prodotti[i].classList.remove('hidden');
                }
            }
        }
      }      
    }


//inserimento nei preferiti

const addP = document.querySelectorAll('.prodotto a');
for(let aP of addP){
  aP.addEventListener('click', Preferiti);
}
const contP = document.querySelector('#contPreferiti');
const pref = document.querySelector('#preferiti');
let nPreferiti = 0;


function Preferiti(event){
  
  nPreferiti++;
  const targ = event.currentTarget;
   
  contP.classList.remove('hidden');  
  pref.classList.remove('hidden');

  const cont = document.createElement('div');  
  cont.classList.add('prodotto');
  pref.appendChild(cont);  
  const cImg = document.createElement('div');
  const cAlb = document.createElement('div');
  cont.appendChild(cImg);
  cont.appendChild(cAlb);


  Inserimento(cImg, cAlb, targ.parentNode.childNodes[5].id);
  targ.removeEventListener('click', Preferiti);
}

function Inserimento(contImg, contAlbum, num){

  const pImg = document.createElement('img');
  const pAlb = document.createElement('a');
  const pArtis = document.createElement('a');
  const removeP = document.createElement('a');
 
  for(let i = 0; i<CONTENUTI.length ; i++){
     if(parseInt(num) - 1 === i){
      pImg.src = CONTENUTI[i].immagine;
      pAlb.textContent = CONTENUTI[i].album;
      pArtis.textContent = CONTENUTI[i].artista;
      removeP.textContent = 'Remove';
      removeP.addEventListener('click', TogliPreferito);
     }
  }
  contImg.appendChild(pImg);  
  contAlbum.appendChild(pAlb);
  contAlbum.appendChild(pArtis);
  contAlbum.appendChild(removeP);
  contImg.classList.add('img');
  contAlbum.classList.add('album');
}
function TogliPreferito(event){
  nPreferiti--;
  const targ = event.currentTarget;
  const padre = targ.parentNode.parentNode;
  padre.innerHTML = '';
  padre.remove();
  if(nPreferiti === 0){
    contP.classList.add('hidden');  
    pref.classList.add('hidden');
  }
  targ.removeEventListener('click', TogliPreferito);
}






 
