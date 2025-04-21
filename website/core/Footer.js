/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">

        <section className="socialInfo">
          <ul>
            <li>
              <a href="https://x.com/SiriusXPX">
                <i className="fab fa-x-twitter"></i> Follow our profile
              </a>
            </li>
            <li>
              <a href="https://t.me/ProximaXio">
                <i className="fab fa-telegram"></i> Ask development questions
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/QGsDQqv5vX">
                <i className="fab fa-discord"></i> Join our Discord channel
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/c/ProximaXio">
                <i className="fab fa-youtube"></i> Explore our Youtube channel
              </a>
            </li>
            <li>
              <a href="https://github.com/proximax-storage">
                <i className="fab fa-github"></i> Explore Github
              </a>
            </li>
          </ul>
        </section>

        <section className="sitemap">

          <div>
            <h5>Protocol</h5>
            <a href={this.docUrl('protocol/block')}>
              Block
            </a>
            <a href={this.docUrl('protocol/consensus-algorithms')}>
              Consensus Algorithms
            </a>
            <a href={this.docUrl('protocol/cryptography')}>
              Cryptography
            </a>
            <a href={this.docUrl('protocol/inflation')}>
              Inflation
            </a>
            <a href={this.docUrl('protocol/node')}>
              Node
            </a>
            <a href={this.docUrl('protocol/receipt')}>
              Receipt
            </a>
            <a href={this.docUrl('protocol/transaction')}>
              Transaction
            </a>
            <a href={this.docUrl('protocol/validating')}>
              Validating
            </a>
          </div>
          <div>
            <h5>Built-in Features</h5>
            <a href={this.docUrl('built-in-features/account')}>
              Account
            </a>
            <a href={this.docUrl('built-in-features/aggregate-transaction')}>
              Aggregate Transaction
            </a>
            <a href={this.docUrl('built-in-features/cross-chain-swaps')}>
              Cross-Chain Swaps
            </a>
            <a href={this.docUrl('built-in-features/exchange-market')}>
              Exchange Market
            </a>
            <a href={this.docUrl('built-in-features/exchangesda-market')}>
              Decentralized Exchange Market
            </a>
            <a href={this.docUrl('built-in-features/metadata')}>
              Metadata
            </a>
            <a href={this.docUrl('built-in-features/mosaic')}>
              Mosaic
            </a>
            <a href={this.docUrl('built-in-features/multisig-account')}>
              Multisig Account
            </a>
            <a href={this.docUrl('built-in-features/namespace')}>
              Namespace
            </a>
            <a href={this.docUrl('built-in-features/transfer-transaction')}>
              Transfer Transaction
            </a>
            <a href={this.docUrl('built-in-features/storage')}>
              Storage
            </a>
            <a href={this.docUrl('built-in-features/liquidity-provider')}>
              Liquidity Provider
            </a>
          </div>
          <div>

            <h5>References</h5>
            <a href={this.docUrl('rest-api/rest-api-overview')}>REST API</a>
            <a href={this.docUrl('sdks/languages')}>SDKs</a>
            <a href={this.docUrl('cheatsheet')}>Cheat Sheet</a>
          </div>
        </section>

        <section className="acknowledgement">Includes Documentation Forked from NEM</section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
