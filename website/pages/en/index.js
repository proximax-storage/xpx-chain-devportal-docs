/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    return (
        <div className="home jumbotron text-center gap">
          <div className="inner">
            <h1>Start building apps on ProximaX Blockchain Platform</h1>
            <h6>ProximaX Sirius-Chain gives you direct access to a specialised set of <b>tested</b> and <b>secure on-blockchain features</b> using your favourite <b>programming language</b>.
            </h6>
            <p>ProximaX Sirius-Chain Version 0.1.0 &mdash; NEW UPDATE! <span>06.19.2019</span></p>
          </div>
        </div>
    );
  }
}

class BriefDef extends React.Component{
  render(){

    return (
      <section className="container text-center">
        <div className="briefDef ">
          <p>
            ProximaX Sirius is a <b>developer-friendly blockchain platform</b>. 
            The latest ProximaX version, Sirius-Chain, gives you direct access 
            to a specialized set of <b>tested</b> and <b>secure on-blockchain features</b> using your favourite <b>programming language</b>.
          </p>
        </div>
      </section>
    );
  }
}

class ExtraScript extends React.Component{
  render(){

    return (
      <script src="../../js/custom.js"></script>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;

    const CardBlock_twoColumn = props => (
      <Container
        id={props.id}
        background={props.background}>
        <RenderCards cardsData={props.children} />
      </Container>
    );

    const RenderCards = (cardProps) => {

      const cards = cardProps.cardsData
        .map(cardInfo => (
          <a className="blockElement alignCenter imageAlignTop fourByGridBlock" href={cardInfo.link} key={cardInfo.link} >
              <div className="card">
                <div className="blockImage">
                  <img src={cardInfo.image} />
                </div>
                <div className="blockContent">
                  <h2>
                    <div>
                      <p>{cardInfo.title}</p>
                    </div>
                  </h2>
                  <div>
                    <p>{cardInfo.content}</p>
                  </div>
                </div>
              </div>
          </a>
        ));

        return (
          <div className="gridBlock card-container">{cards}</div>
        );
    }

    const Cards_firstRow = () => (
      <CardBlock_twoColumn>
        {[
          {
            content: 'Install the development kit and start coding your first blockchain app.',
            image: `${baseUrl}img/home-getting-started.png`,
            imageAlign: 'top',
            link: `${baseUrl + docsUrl}/getting-started/what-is-proximax-sirius-chain`,
            title: 'Getting started',
          },
          {
            content: 'Easy-to-follow step by step guides with code examples.',
            image: `${baseUrl}img/home-guides.png`,
            imageAlign: 'top',
            link: `${baseUrl + docsUrl}/guides/account/account-overview`,
            title: 'Guides',
          },
          {
            content: 'Architecture your solution connecting the features that make up the Smart Asset System.',
            image: `${baseUrl}img/home-built-in-features.png`,
            imageAlign: 'top',
            link: `${baseUrl + docsUrl}/built-in-features/account`,
            title: 'Built-in Features',
          },
          {
            content: 'From SDKs to extensions that make blockchain development easier.',
            image: `${baseUrl}img/home-references.png`,
            imageAlign: 'top',
            link: '#',//`${baseUrl}references`,
            title: 'References',
          },
        ]}
      </CardBlock_twoColumn>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Cards_firstRow />
        </div>
        <BriefDef language={language} />
        <ExtraScript />
      </div>
    );
  }
}

module.exports = Index;
