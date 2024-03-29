/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Endpoints_v90(props) {
    const {config: siteConfig, language = '',} = props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    return (
        <div className="separateOnPageNav">
            <div className="docMainWrapper wrapper">
                <Container className="mainContainer documentContainer postContainer">
                    <div className="post">
                        <link href="../../css/api.css" rel="stylesheet"></link>
                        <script src="https://cdn.jsdelivr.net/npm/redoc@2.0.0-alpha.41/bundles/redoc.standalone.js"></script>

                        <div id="redoc"></div>
                        <script src="../../js/v0.9.0.js"></script>
                    </div>
                </Container>
            </div>
        </div>
    );
}

module.exports = Endpoints_v90;