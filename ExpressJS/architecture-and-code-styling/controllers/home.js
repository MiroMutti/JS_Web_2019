const Article = require('../models/Article')

module.exports = {
  index: (req, res) => {
    Article.find()
    .populate('author')
    .then((articles) => {
      res.render('home/index', {articles});
    })
    .catch(console.error)
    // TODO load all (if any) articles and pass them as context
    
  }
}
