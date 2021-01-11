import React, { Component } from 'react';
import { Products } from './Containers';
import './App.css';
import * as actions from './actions';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      products: [],
    }
  }

  componentWillMount() {
    window.ethereum.on('accountsChanged', function () {
      console.log("changement de compte")
    })    
    var p = actions.LoadData().then((value) => this.setState({products: value})
    )
  }

  render() {
    return (
      <div>
        {/* {this.state.account===undefined 
        ? <>
        <p>veuillez vous connecter</p>
        </>
        :<> */}
        <div className="container mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex"> 
                {
                  this.state.products.map((x)=>{
                    return(
                    <Products product={x}/>
                    )
                  })
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
