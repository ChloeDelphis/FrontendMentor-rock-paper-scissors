<div class="results__choice computer">
  <div class="results__choice__logo circle shadow">
    <span class="wrapper dark-blue">
      <img src="" alt="" />
    </span>
  </div>
  <div class="results__choice__text">The House picked</div>
</div>

ETAPE 1 :

- Cette div n'a pas de shadow car le résultat n'est pas encore là
  results**choice**logo circle

- Le cercle du computer est bleu
  <span class="wrapper dark-blue"></span>

ETAPE 2 : Simultanément

- On retire la classe dark-blue au wrapper du computer
  <span class="wrapper"></span>

////////////////////////////////////////////
//TODO Classe à rajouter ensuite !
////////////////////////////////////////////

- On ajoute la classe shadow ici :
<div class="results__choice__logo circle shadow">

ETAPE 3 :

- On fait apparaître le résultat (retirer la classe opaque + ajouter la classe appear )

////////////////////////////////////////////
(à rajouter ensuite game.resultShowHide();)
////////////////////////////////////////////

  <div class="results__result opaque">
  <div class="results__result__text"></div>
  <button class="results__result__play-again">Play again</button>
  </div>

ETAPE 4

- On ajoute la classe winner halo et animate
  <span class="wrapper winner-halo">
  <img src="" alt="" />
  </span>

- On met le score à jour
