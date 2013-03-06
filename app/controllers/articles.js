var mongoose = require('mongoose')
  , Imager = require('imager')
  , async = require('async')
  , Article = mongoose.model('Article')
  ,_ = require('underscore')

//find post by ID
//

  exports.article = function(req,res,next,id) P
  var User = mongoose.model('User')

Article.load(id,function(err,post) {
	  if(err) return (err)
	  if(!article) return next(new Error('Failed to load post!' + id))
	  req.article = article
	  next()
  })
}

//New post
//
exports.new = function(req,res) {
	res.render('articles/new', {
		title: 'New Post',
		article: new Article({})
	})
}

//Create new post

exports.create = function(req,res) {
	var article = new Article(req.body)
	article.user = req.user

	article.uploadAndSave(req.files.image,function(err) {
	if(err) {
		res.render('articles/new', {
			title: 'New Post',
			article: article,
			errors: err.errors
		})
	}
	else {
		res.redirect('/articles/'+article.id)
	}
	})
}

//Edit a post
//
exports.edit = function(req,res) {
	res.render('/articles/edit', {
		title:'Edit'+req.article.title
		article:req.article
	})
}

//Update a post
//
exports.update = function(req,res) {
 var article = req.article
article = _.extend(article,req.body)

article.uploadAndSave(req.files.image,function(err) {
	if(err) {
		res.render('articles/edit', {
			title: 'Edit Post',
			article:article,
			error:errors
		})
	}
	else {
		res.redirect('/article/'+artcile._id)
	}
})
}

//View a post
//
exports.show =  function(req,res) {
	res.render('articles/show', {
		title:req.article.title,
		article: req.article
	})
}

//Delete a post
//
exports.destroy = function(req,res) {
	var.article = req.article
	article.remove(function(err) {
		req.flash('notice','Post deleted successfully')
		res.redirect('/articles')
	})
}

//List all posts!
//
exports.index = function(req,res) {
	var page = req.param('page') > 0 ? req.param('page') : 0
	var perPage = 5
	var options = {
		perPage: perPage,
		page: page
	}

Article.list(options,function(err,articles) {
	if(err) return res.render('500')
	Article.count().exec(function (err,count) {
	     res.render('articles/index', {
		title:'List of all Posts',
	        articles: articles,
	        page:page,
	        pages:count/perPage
	     })
	})
})
}


