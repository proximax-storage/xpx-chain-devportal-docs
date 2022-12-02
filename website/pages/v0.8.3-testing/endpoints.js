const React = require('react');
import Endpoint from '../../static/js/Endpoint';

// const CompLibrary = require('../../core/CompLibrary.js');
// const Container = CompLibrary.Container;

// function Endpoint({src}) {
//     return (
//         <div className="separateOnPageNav">
//             <div className="docMainWrapper wrapper">
//                 <Container className="mainContainer documentContainer postContainer">
//                     <div className="post">
//                         <link href="../../static/css/api.css" rel="stylesheet"></link>
    
//                         <div id="redoc"></div>
//                         <script src="https://cdn.jsdelivr.net/npm/redoc@2.0.0-alpha.41/bundles/redoc.standalone.js"></script>
//                         <script src={src}></script>
                        
//                     </div>
//                 </Container>
//             </div>
//         </div>
//     );
// }

function Endpoints() {
    return (
        <div>
            <Endpoint src="../../js/v0.8.3.js"/>
        </div>

    );
}
 
module.exports = Endpoints;