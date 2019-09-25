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
              <a href="https://www.reddit.com/user/ProximaXio/">
                <i className="fab fa-reddit"></i> Join #general discussion
              </a>
            </li>
            <li>
              <a href="http://t.me/ProximaXio">
                <i className="fab fa-telegram"></i> Ask development questions
              </a>
            </li>
            <li>
              <a href="https://twitter.com/ProximaXio">
                <i className="fab fa-twitter"></i> Follow the dev updates
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
            <a href={this.docUrl('built-in-features/account-filter')}>
              Account Filter
            </a>
            <a href={this.docUrl('built-in-features/aggregate-transaction')}>
              Aggregate Transaction
            </a>
            <a href={this.docUrl('built-in-features/cross-chain-swaps')}>
              Cross-Chain Swaps
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
            <a href={this.docUrl('built-in-features/super-contracts')}>
              Super contract
            </a>
            <a href={this.docUrl('built-in-features/transfer-transaction')}>
              Transfer Transaction
            </a>
          </div>
          <div>

            <h5>References</h5>
            <a href={this.docUrl('rest-api/rest-api-overview')}>REST API</a>
            <a href={this.docUrl('sdks/languages')}>SDKs</a>
            <a href={this.docUrl('client/client-overview')}>XPX-Chain-CLI</a>
          </div>
        </section>

        <section className="acknowledgement">Documentation Forked From NEM</section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
