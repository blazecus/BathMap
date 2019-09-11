// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import starempty from '../../public/starempty.jpg';
// import starfull from '../../public/starfull.jpg';

// class Star extends Component {
//     constructor(props) {
//         super(props);

//     }
//     onMouseOver = () => {
//         this.props.mousedOverEvent(this.props.num);
//     }
//     onClick = () => {
//         this.props.clicked(this.props.num);
//     }
//     render() {
//         if(this.props.show){
//             return (
//                 <div>
//                     <img onClick={this.props.clicked(this.props.num)} onMouseOver={this.props.mousedOverEvent(this.props.num)} src={starfull}></img>
//                 </div>
                
//             )
//         }
//         else{
//             return(
//                 <div>
//                     {/* <img onClick={alert("asdfasdf")} src={starempty}/> */}
//                     <img src={starempty}></img>
//                 </div>
//             )
//         }
//     }
// }

// export default Star;