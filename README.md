# aws-uncle

[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

Useful uncle notifying unexpected servers in AWS.


## Installation

```
git clone https://github.com/moqada/aws-uncle.git
cd aws-uncle
npm install
```


## Configuration

Put Environment variables (HipChat token, notify interval...)

```
cp .env.example .env
```

Put settings for filtering Unexpected servers

```
cp configs.example.json configs.json
```


## Deploy

```
npm run publish
```

Upload `build/aws-uncle.zip` to AWS Lambda.


## TODO

- [ ] Support EMR
- [ ] Load configs from S3
- [ ] Run standalone (CLI / crontab)
- [ ] Add tests


[travis-url]: https://travis-ci.org/moqada/aws-uncle
[travis-image]: https://img.shields.io/travis/moqada/aws-uncle.svg?style=flat-square
[daviddm-url]: https://david-dm.org/moqada/aws-uncle
[daviddm-image]: https://img.shields.io/david/moqada/aws-uncle.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/aws-uncle#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/aws-uncle.svg?style=flat-square
[license-url]: https://github.com/moqada/aws-uncle/blob/master/LICENSE.md
[license-image]: https://img.shields.io/github/license/moqada/aws-uncle.svg?style=flat-square
