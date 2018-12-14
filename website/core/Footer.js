/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const { baseUrl, docsUrl } = this.props.config;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const { baseUrl } = this.props.config;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    const { language, config } = this.props;
    const { baseUrl, footerIcon, title } = config;
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={baseUrl} className="nav-home">
            {footerIcon && (
              <img
                src={baseUrl + footerIcon}
                alt={title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('installation', language)}>Getting Started</a>
            <a href={this.docUrl('example-guide', language)}>Guides</a>
            <a href={this.docUrl('cli-commands', language)}>API Reference</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://github.com/glover-js/glover">GitHub</a>
            <a
              href="https://gitter.im/glover-community/Lobby"
              target="_blank"
              rel="noreferrer noopener"
            >
              Gitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${baseUrl}browse-potions`}>Browse Potions</a>
            <a href={`${baseUrl}blog`}>Blog</a>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
