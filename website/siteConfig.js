/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// List of projects/orgs using your project for the users page.
const users = [];

const siteConfig = {
  title: 'Glover',
  tagline: 'Sharable and extendable project scaffolding',
  url: 'https://glover-js.github.io',
  baseUrl: '/',
  projectName: 'glover-js.github.io',
  organizationName: 'glover-js',
  repo: 'glover-js/glover',
  users,
  editUrl: 'https://github.com/glover-js/glover-js.github.io/edit/source/docs/',
  headerLinks: [
    { doc: 'installation', label: 'Docs' },
    { doc: 'cli-commands', label: 'API' },
    { page: 'browse-potions', label: 'Browse Potions' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
    { href: 'https://github.com/glover-js/glover', label: 'Github' },
  ],
  headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
  onPageNav: 'separate',
  gaTrackingId: 'UA-130669256-1',
  colors: {
    primaryColor: '#2E8555',
    secondaryColor: '#205C3B',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  highlight: {
    theme: 'default',
  },
  repoUrl: 'https://github.com/glover-js/glover',
  cleanUrl: true,
};

module.exports = siteConfig;
