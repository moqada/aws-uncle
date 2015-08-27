import AWS from 'aws-sdk';


export default class Job {

  constructor(bucket, key, {execInterval = 60, jobInterval = 30} = {}) {
    this.bucket = bucket;
    this.key = key;
    this.jobInterval = jobInterval * 1000;
    this.execInterval = execInterval * 1000;
  }

  changeStatus(contentType, timestamp) {
    console.log('run changeStatus');
    return new Promise((resolve, reject) => {
      new AWS.S3().putObject({
        Bucket: this.bucket,
        Key: this.key,
        Body: new Buffer(timestamp.toString(), 'binary'),
        ContentType: contentType
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  execute(event, context, exec) {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    setTimeout(() => {
      if (key === this.key) {
        console.log('execute job');
        new AWS.S3().getObject({Bucket: bucket, Key: key}, (err, data) => {
          if (err) {
            console.log(err);
            context.done(err, err);
          } else {
            const body = data.Body.toString('utf-8').trim();
            console.log('body: ', body);
            const ts = Number.parseInt(body, 10);
            if (!Number.isNaN(ts) && ts !== 0) {
              if (ts < Date.now()) {
                const nextTimestamp = Date.now() + this.execInterval;
                this.changeStatus(data.ContentType, nextTimestamp).then(() => {
                  exec(context);
                });
              } else {
                this.changeStatus(data.ContentType, body).then(() => {
                  console.log('waiting...');
                  context.done(null, 'waiting...');
                });
              }
            } else {
              console.log('finish');
              context.done(null, 'finish');
            }
          }
        });
      } else {
        context.done(null, '');
      }
    }, this.jobInterval);
  }
}
