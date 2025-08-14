module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/lukonik/ngx-valid',
  preset: 'conventionalcommits',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/ngx-valid',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json'],
        message: 'chore(release): update package.json [skip ci]',
      },
    ],
    ['@semantic-release/github'],
  ],
};
