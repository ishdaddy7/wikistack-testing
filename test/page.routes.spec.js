var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var chai = require('chai');
var Model = require('../models');
var Page = Model.Page;
var User = Model.User;
User.sync({force: true})
  .then(function(){
    Page.sync({force: true});
  })
  .catch(console.error);

describe('http requests', function () {
    beforeEach(function(done){
      Page.create({
        title: 'daBomb',
        content: 'Lots of 1990s hip hop and R&B groups',
        tags: ['music', 'hip hop', 'R&B' ]
      })
      .then(function(){
        Page.create({
          title: 'daBomb2',
          content: 'Evem ,pre of 1990s hip hop and R&B groups',
          tags: ['music']
        })
          .then(function(){
          Page.create({
            title: 'cars',
            content: 'a fast fast car',
            tags: ['engine','doors','exhaust']
          })
        })
        .then(function(){done();})
        .catch(done);
      })
    });
   afterEach(function(done){
        Page.destroy({
          where: {
            title: 'daBomb'
          }
        })
          .then(function(){done();})
          .catch(done)
      })
  describe('GET /wiki/', function () {
    it('responds with 200', function(done){
      agent
      .get('/wiki')
      .expect(200, done);
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function(done){
      agent
      .get('/wiki/add')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {
    it('responds with 404 on page that does not exist', function(done){
        agent
        .get('wiki/idontexist')
        .expect(404, done);
    });
    it('responds with 200', function(done){
      agent
      .get('/wiki/daBomb')
      .expect(200, done);
    });
  });

  describe('GET /wiki/search', function () {
    it('responds with 200', function(done){
      agent
      .get('/wiki/search?search=daBomb')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 on page that does not exist', function(done){
        agent
        .get('/wiki/idontexist/similar')
        .expect(404, done);
    });
    it('responds with 200', function(done){
      agent
      .get('/wiki/daBomb/similar')
      .expect(200, done);
    });
  });

  describe('POST /wiki', function () {
    it('responds with 302',function(done){
      agent
      .post('/wiki/')
      .send({
        name: 'some name',
        email: 'email@email.com',
        title: 'some title',
        content: 'my awesome article',
        status: 'closed',
        tags: 'tag tag2'
      })
      .expect(302, done);
    });
    it('creates a page in the database', function(done){
        agent
        .get('/wiki/some_title')
        .expect(200, done);
    });
  });

});
