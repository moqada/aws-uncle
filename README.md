# aws-uncle

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
