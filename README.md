# aws-uncle

[![Greenkeeper badge](https://badges.greenkeeper.io/moqada/aws-uncle.svg)](https://greenkeeper.io/)

[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![Version][version-image]][version-url]
[![License][license-image]][license-url]

Useful uncle notifying unexpected servers in AWS.


## Installation

```
git clone https://github.com/moqada/aws-uncle.git
cd aws-uncle
npm install
```


## Configuration

Put Environment variables (HipChat token...)

```
cp .env.example .env
```

Put settings for filtering Unexpected servers

```
cp configs.example.json configs.json
```

Set following IAM policy for AWS Lambda.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:describe*",
                "elasticbeanstalk:describe*",
                "elasticmapreduce:list*",
                "rds:describe*"
            ],
            "Resource": "*"
        }
    ]
}
```


## Deploy

```
npm run deploy
```

Upload `build/aws-uncle.zip` to AWS Lambda.


## TODO

- [x] Support EMR
- [ ] Load configs from S3
- [ ] Run standalone (CLI / crontab)
- [ ] Add tests


[travis-url]: https://travis-ci.org/moqada/aws-uncle
[travis-image]: https://img.shields.io/travis/moqada/aws-uncle.svg?style=flat-square
[daviddm-url]: https://david-dm.org/moqada/aws-uncle
[daviddm-image]: https://img.shields.io/david/moqada/aws-uncle.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/aws-uncle#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/aws-uncle.svg?style=flat-square
[version-url]: https://github.com/moqada/aws-uncle/releases
[version-image]: https://img.shields.io/github/tag/moqada/aws-uncle.svg?style=flat-square
[license-url]: https://github.com/moqada/aws-uncle/blob/master/LICENSE.md
[license-image]: https://img.shields.io/github/license/moqada/aws-uncle.svg?style=flat-square
