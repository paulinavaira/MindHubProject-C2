import React from 'react'
import gamesActions from '../redux/actions/gamesActions'
import { connect } from "react-redux"

class Game extends React.Component {
  state = {
    commentary: '',
    idGame: '',
    sendModify: false,
  }
  async componentDidMount() {
    await this.props.getCommentaries()
  }
  readCommentary = (e) => {
    var commentary = e.target.value
    const idGame = e.target.id

    this.setState({
      commentary,
      idGame
    })
  }
  sendCommentary = async (e) => {
    var commentary = this.state.commentary
    if (commentary === '') {
      alert("You can't send empty comments", "", "error");
      e.preventDefault()
    } else {
      await this.props.putCommentary(this.props.game._id, commentary, this.props.token)
      await this.props.getCommentaries()
    }
    this.setState({
      commentary: ''
    })
  }

  render() {

    const star = []
    const emptyStar = []

    function iconGenerator(quantity, filledValor, emptyValor) {


      for (var i = 0; i < quantity; i++) {
        filledValor.push("instance");
      }
      for (var i = 0; i < 5 - quantity; i++) {
        emptyValor.push("instance");
      }
    }
    iconGenerator(this.props.game.rating, star, emptyStar);

    return (

      <div className="border col-8 mx-auto m-5">
        <h1 >{this.props.game.title}</h1>
        <div style={{display:"flex"}}>  {star.map((star) => {
                    return (
                      <p className="valor">
                        <i id="dollar" className="small material-icons">
                         <img style={{width:"50px"}}src={require("../images/staron.png")}></img>
                        </i>
                      </p>
                    );
                  })}
                  {emptyStar.map((star) => {
                    return (
                      <p className="valor">
                        <i id="dollar" className="small material-icons">
                         <img style={{width:"50px"}} src={require("../images/star.png")}></img>
                        </i>
                      </p>
                    );
                  })}</div>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            {this.props.game.images.map((img, index) => {
              return (
                <div class={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img class="d-block w-100" src={img} alt="First slide" />
                </div>)
            })}
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
  
          <div>
            {this.props.commentaries.map(commentary => {
              return (
                <div>
                  <h3 className="text-light">{commentary.username}</h3>
                  {this.state.sendModify && commentary.username === this.props.username ? <><input onChange={this.readCommentary} id={commentary._id} placeholder={commentary.content} /> <button onClick={this.modifyCommentary}>send</button></> : <p className="text-light">{commentary.content}</p>}
                  {this.props.username === commentary.username &&

                    <>
                      <p className="text-light" id={commentary._id} >borrar</p>
                      <p className="text-light" id={commentary._id} >modificar</p>
                    </>
                  }

                </div>)
            })}
            <input onChange={this.readCommentary} id={this.props.game._id} value={this.state.commentary}></input>
            <button onClick={this.sendCommentary}>send</button>
          </div>
        </div>

      </div >

    )
  }
}
const mapStateToProps = state => {
  return {
    name: state.usersReducer.name,
    urlpic: state.usersReducer.urlpic,
    token: state.usersReducer.token,
    username: state.usersReducer.username,
    commentaries: state.gamesReducer.commentaries
  }
}

const mapDispatchToProps = {
  putCommentary: gamesActions.putCommentary,
  getCommentaries: gamesActions.getCommentaries,
  // deleteCommentary: gamesActions.deleteCommentary,
  // modifyCommentary: gamesActions.modifyCommentary,

}
export default connect(mapStateToProps, mapDispatchToProps)(Game)