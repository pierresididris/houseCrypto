import React from 'react'

const Loader = () => {
    return(               
    <div class="outer">
    <div class="middle">
      <div class="inner">
        <div class="spinner-border text-info loading" role="status">
          <span class="visually-hidden"></span>
        </div>
          <h4 class="alert-heading">Chargement</h4>
      </div>
    </div>
  </div>)

}

export default Loader