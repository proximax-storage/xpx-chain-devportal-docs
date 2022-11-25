const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;

function Endpoints() {
    return (
        <div className="separateOnPageNav">
            <div className="docMainWrapper wrapper">
                <Container className="mainContainer documentContainer postContainer">
                    <div className="post">
                        <link href="../../css/api.css" rel="stylesheet"></link>

                        <div id="redoc"></div>
                        <script src="https://cdn.jsdelivr.net/npm/redoc@2.0.0-alpha.41/bundles/redoc.standalone.js"></script>
                        <script src="../../js/v0.3.0.js"></script>
                        
                    </div>
                </Container>
            </div>
        </div>
  );
}
 
module.exports = Endpoints;
 