import React, { Component } from 'react';
import './App.css';

//Importation de la librairie Marked afin de pouvoir écrire du markdown
import marked from 'marked'

//On importe notre "fichier source" qui permet d'intégrer du "seed"
import { sampleText } from './sampleText'

class App extends Component {

// Notre fichier source fait office de State
  state = {
    text : sampleText
  }

  // On se sert du "local storage" pour sauvegarder les modifications du state
  componentDidMount () {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }

  componentDidUpdate () {
    const { text } = this.state
    /* ou const text = this.state.text*/
    localStorage.setItem('text', text)
  }

  //Mise à jour en temps réel de la "textarea" par l'utilisateur grâce à une fonction

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  // Transformation en syntaxe "markdow" grâce à la méthode "marked"

  renderText = text => {
    const __html = marked(text, {sanitize: true} )
    return { __html }
  }

  //Ou :
  /* renderText = text => marked(text, {sanitize: true}*/
  // Avec plus bas en passant un objet :
  // <div dangerouslySetInnerHTML={{ __html: this.renderText(this.state.text) }}/>

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              onChange={ this.handleChange }
              value={ this.state.text }
              className="form-control"
              rows="35" />
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={ this.renderText(this.state.text) }/>
          </div>
        </div>
      </div>
    );
  }


}

export default App;
