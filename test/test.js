/* DELETE ME ASAP
// var supertest = require('supertest-as-promised')(require('../app'));
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var Model = require('../models');

var Page = Model.Page;
var User = Model.User;
User.sync({force: true})
  .then(function(){
    Page.sync({force: true});
  })
  .catch(console.error);

chai.use(spies);

describe("Addition Simple Test", function(){
  xit("Adds shit", function(){
    expect(2+2).to.equal(4);
  })
});

describe("setTimeout Async Test", function(){
  xit("Waits 1 second", function(done){
    var start = new Date();
    setTimeout(function(){
    var duration = new Date() - start;
    expect(duration).to.be.closeTo(1000,50);
    done();
    }, 1000);

  })
});

describe("Using spies", function(){
  xit("Spies on forEach", function(){
    var arr = new Array(10);
    arr.fill(2);
    var daFunc = function(elem){return elem*50;}
    var spiedFunc = chai.spy(daFunc);
    arr.forEach(spiedFunc);
    expect(spiedFunc).to.have.been.called.exactly(10);
  })
})
describe("Page model tests", function(){
  describe("Validation tests", function(){
    describe("Testing title", function(){
      xit("Should reject a null submission", function(done){
      var page;
      page = Page.build();
        page.validate()
        .then(function(err){
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[0].path).to.equal('title');
          done();
        });
      });

    })
    describe("Testing content", function(){

      xit("Should reject a null submission", function(done){
      var page;
      page = Page.build();
        page.validate()
        .then(function(err){
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[2].path).to.equal('content');
          done();
        });
      });
    })

    describe("Testing urlTitle", function(){
//IT IS ODD THAT THIS WORKS, SHOULDN'T THERE BE AN AUTO GENERATED 5 DIGIT LONG URLTITLE B/C OF ELSE?
      xit("Should reject a null submission", function(done){
      //var page;
      Page.create({
        title: null
      })

      //console.log('this is page ', page);
        //page.validate()
        .then(function(err){
          //console.log('this is err.errors ', err.errors)
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[1].path).to.equal('urlTitle');
          done();
        })
        .catch(function(err){
          console.log('this is err.errors ', err.errors);
          console.
          done();
        });
      });
    })

  })


/*  describe("Getter tests", function(){
    var page;
    beforeEach(function(){
        page = Page.build();
      })
    describe("Testing route", function(){
      xit("Should prepend /wiki to urlTitle", function(){
        page.urlTitle = "very_silly_page";
        expect(page.route).to.equal("/wiki/very_silly_page");
      })
    })
    describe("Testing renderedContent", function(){
      xit("Should call marked", function(){

      })
      xit("Should convert markdown to HTML", function(){

      })
    })
  })*/


/* DELETE ME ASAP

  describe("Class method tests", function(){
    beforeEach(function(done){
      Page.create({
        title: 'daBomb',
        content: 'Lots of 1990s hip hop and R&B groups',
        tags: ['music', 'hip hop', 'R&B' ]
      })
      .then(function(){
        done()})
      .catch(done);
    })
    describe("Testing findByTag", function(){

      xit("Should return all pages and records containing a tag", function(done){
        Page.findByTag("music")
        .then(function(pages){
          expect(pages).to.have.lengthOf(1);
          done();
        }).catch(done);})
      xit("Should not get pages without the search tag", function(done){
        Page.findByTag("country")
        .then(function(pages){
          expect(pages).to.have.lengthOf(0);
          done();
        }).catch(done);
    })
  })

  describe("Instance methods", function(){
    beforeEach(function(done){
      Page.create({
        title: 'shoes',
        content: 'a crazy pair o shoes',
        tags: ['laces','soles','clothes']
      })
      .then(function(){
        Page.create({
          title: 'shirts',
          content: 'a crazy crazy shirt',
          tags: ['sleeves','tails','clothes']
        })
        .then(function(){
          Page.create({
            title: 'cars',
            content: 'a fast fast car',
            tags: ['engine','doors','exhaust']
          })
          .then(function(){done();})
          .catch(done);
        })
      })
    })
/*    afterEach(function(done){
      User.sync({force: true})
        .then(function(){
          Page.sync({force: true});
        })
        .then(function(){done();})
        .catch(done);
    });*/


/* DELETE ME ASAP
    afterEach(function(done){
      Page.destroy({
        where: {
          title: ['shoes','cars','shirts']
        }
      })
        .then(function(){done();})
        .catch(done)
    });

    describe("Testing findSimilar", function(){
      xit("Should return all pages sharing a tag", function(done){
        Page.findByTag('laces')
        .then(function(result){
          //console.log(result);
          result[0].findSimilar()
          .then(function(result2){
            expect(result2[0].title).to.equal('shirts');
            done();
          })
        }).catch(done);
      })
      xit("Should not return itself", function(done){
        Page.findByTag('laces')
        .then(function(result){
          result[0].findSimilar()
          .then(function(result2){
            expect(result2).to.have.lengthOf(1);
            done();
          })
        }).catch(done);
      })
      xit("Should not return pages with no similar tags", function(done){
        Page.findByTag('engine')
        .then(function(result){
          result[0].findSimilar()
          .then(function(result2){
            expect(result2).to.have.lengthOf(0);
            done();
          })
        }).catch(done);
      })
      })
    })
  })

  describe("Hooks", function(){
    describe("Testing beforeValidate hook",function(){
      xit("Should generate a random urlTitle for no urlTitle", function(){

      })
      xit("Should call random when generating title", function(){

      })
      xit("Should generate a 5 length substring", function(){

      })
    })
  })

  describe("Pages having owners", function(){
    xit("Should have an authorId", function(){

    })
  })
})

*/
