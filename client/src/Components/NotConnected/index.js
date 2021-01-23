import React from 'react';

const NotConnected = () => {
    return(
        <div class="outer">
<div class="middle">
  <div class="inner">
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Vous n'êtes pas connecté</h4>
      <p>Veuillez vous connecter à Metamask pour acceder à cet espace</p>
    </div>
  </div>
</div>
</div> 
    )
}

export default NotConnected;