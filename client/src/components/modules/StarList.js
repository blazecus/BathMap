// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import Star from './Star.js';
// import { str } from 'gl-matrix/src/gl-matrix/mat2';

// class StarList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             stars : [1,2,3,4,5],
//             tempnum : 0,
//             finalnum : null
//         };
//     }
//     // componentDidMount(){
//     //     this.setState({})
//     // }
//     mousedOverEvent(starnum){
//         console.log("holahola");
//         this.setState({
//             stars: this.state.stars,
//             tempnum: starnum,
//             finalnum: this.state.finalnum
//         });
//     }
//     clicked(starnum){
//         console.log("holaholahola");
//         this.setState({
//             stars: this.state.stars,
//             tempnum: this.state.tempnum,
//             finalnum: starnum
//         });
//     }
//     render() {
//         var strs = [];
//         if(this.state.finalnum != null){
//             for(var i = 1; i < finalnum + 1; i++){ 
//                 strs.push(  
//                     <Star 
//                         key = {`Star_${i}`}
//                         num = {i}
//                         show = {true}
//                         clicked = {this.clicked}
//                         mousedOverEvent = {this.mouseOverEvent}
//                     />
//                 );
//             }
//             for(var i = finalnum + 1; i < 6; i++){
//                 strs.push(
//                     <Star
//                         key = {`Star_${i}`}
//                         num = {i}
//                         show = {false}
//                         clicked = {this.clicked}
//                         mousedOverEvent = {this.mouseOverEvent}
//                     />
//                 );
//             }
//         }
//         else{
//             for(var i = 1; i < 6; i++){
//                 strs.push(
//                     <Star
//                         key = {`Star_${i}`}
//                         num = {i}
//                         show = {false}
//                         clicked = {this.clicked}
//                         mousedOverEvent = {this.mouseOverEvent}
//                     />
//                 );
//             }
//         }
//         console.log
//         return(<div>{strs}</div>);
//     }
// }

// export default StarList;