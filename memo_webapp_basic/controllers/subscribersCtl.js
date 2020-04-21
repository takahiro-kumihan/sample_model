"use strict";

// 1つ階層を上がったところにある『models』Dのcontacts.jsファイル
// modelを参照している、つまりmodelインスタンスを定数に格納
const Subscriber = require("../models/subscriber"),
  getSubscriberParams = (body) => {
    return {
      name: body.name,
      email: body.email,
      zip_code: parseInt(body.zip_code)
    };
  };

module.exports = {
  new: (req, res) => {
    res.render("subscribers/new");
  },
  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then((subscriber) => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((err) => {
        console.log(`Error saving subscriber: ${err.message}`);
        next(err);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let subscriber_id = req.params.id;
    Subscriber.findById(subscriber_id)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(err => {
        console.log(`Error fetching subscriber by ID: ${ err.message }`);
        next(err);
      });
  },
  showView: (req,res) => {
    res.render("subscribers/show");
  },
  edit: (req, res, next) => {
    let subscriber_id = req.params.id;
    Subscriber.findById(subscriber_id)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber
        });
      })
      .catch(err => {
        console.log(`Error feching subscriber by ID: ${ err.message }`);
        next(err);
      });
  },
  update: (req, res, next) => {
    let subscriber_id = req.params.id,
      subscriberParams = getSubscriberParams(req.body);
    Subscriber.findByIdAndUpdate(subscriber_id, {
      $set: subscriberParams
    })
    .then(subscriber => {
      res.locals.redirect = `/subscribers/${ subscriber_id }`;
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(err => {
      console.log(`Error updating subscriber by ID: ${ err.message }`);
      next(err);
    });
  },
  delete: (req, res, next) => {
    let subscriber_id = req.params.id;
    Subscriber.findByIdAndRemove(subscriber_id)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(err => {
        console.log(`Error deleting subscriber by ID: ${ err.message }`);
        next;
      });
  },
  index: (req, res, next) => {
    Subscriber.find({})
      .then((subscribers) => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch((err) => {
        console.log(`Error fetching subscribers: ${err.message}`);
        next(err);
      });
  },
  indexView: (req, res) => {
    res.render("subscribers/index");
  }
}






// // メソッド定義
// // FORM 入力FORMを表示する
// exports.getSubscriberPage = (req, res) => {
//   // なぜ『/』パスは不要なのか？
//   //   メソッドの受け側が、『app.get』したインスタンスなので
//   //   resはディレクトリが判っているという理由で『/』パスは不要なのかも？
//   //   それとも、express-ejs-layoutsモジュールが関係しているのか？
//   res.render("contact");
// };

// // POST FORMに記入してDBに保存する
// // 間にconfirmが必要。。。ここ課題！
// exports.saveSubscriber = (req, res) => {
//   let newSubscriber = new Subscriber({
//     name: req.body.name,
//     email: req.body.email,
//     zip_code: req.body.zip_code });
//   newSubscriber.save()
//     .then(ins => {
//       res.render("thanks", {
//         new_subscriber: ins
//       });
//     })
//     .catch( (error) => {
//       if (error) res.send(error);
//     });
// };

// // LIST DB全データを取得する
// exports.getAllSubscribers = (req, res) => {
//   Subscriber.find({})
//     // findクリエからのプロミスを返す
//     // DBにアクセスしてfindを実行し結果を返してるわけか？
//     .exec()
//     // 確保したデータをthenブロックで処理する
//     .then(subscribers => {
//       res.render("subscribers", {
//         Subscribers: subscribers
//       });
//     })
//     // プロミスを破ったエラーを掴む　という表現がよくわからない？
//     .catch( (error) => {
//       console.log(error.message);
//       return [];
//     })
//     // ログを出す。ただし、この処理要るのか？
//     .then( () => {
//       console.log("promiseは完了です。")
//     });
// };