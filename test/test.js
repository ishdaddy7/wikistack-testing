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
  it("Adds shit", function(){
    expect(2+2).to.equal(4);
  })
});

describe("setTimeout Async Test", function(){
  it("Waits 1 second", function(done){
    var start = new Date();
    setTimeout(function(){
    var duration = new Date() - start;
    expect(duration).to.be.closeTo(1000,50);
    done();
    }, 1000);

  })
});

describe("Using spies", function(){
  it("Spies on forEach", function(){
    var arr = new Array(10);
    arr.fill(2);
    var daFunc = function(elem){return elem*50;}
    var spiedFunc = chai.spy(daFunc);
    arr.forEach(spiedFunc);
    expect(spiedFunc).to.have.been.called.exactly(10);
  })
})
describe("Page model tests", function(){
  // describe("Field tests", function(){
  //   describe("Testing title", function(){
  //     it("Should take a string and return it", function{

  //     });
  //     it("Should reject a null submission", function(){

  //     });
  //     it("Should return string output even for non-string input", function(){

  //     })
  //   })
  //   describe("Testing urlTitle", function(){
  //     it("Should not have any spaces", function{

  //     });
  //     it("Should reject a null submission", function(){

  //     });
  //     it("Should match title but with _s", function(){

  //     })
  //     it("Should have only alphanumeric characters", function(){

  //     })
  //   })

  // }

/*  describe("Getter tests", function(){
    var page;
    beforeEach(function(){
        page = Page.build();
      })
    describe("Testing route", function(){
      it("Should prepend /wiki to urlTitle", function(){
        page.urlTitle = "very_silly_page";
        expect(page.route).to.equal("/wiki/very_silly_page");
      })
    })
    describe("Testing renderedContent", function(){
      it("Should call marked", function(){

      })
      it("Should convert markdown to HTML", function(){

      })
    })
  })*/

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

      it("Should return all pages and records containing a tag", function(done){
        Page.findByTag("music")
        .then(function(pages){
          expect(pages).to.have.lengthOf(1);
          done();
        }).catch(done);})
      it("Should not get pages without the search tag", function(done){
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
      it("Should return all pages sharing a tag", function(done){
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
      it("Should not return itself", function(done){
        Page.findByTag('laces')
        .then(function(result){
          result[0].findSimilar()
          .then(function(result2){
            expect(result2).to.have.lengthOf(1);
            done();
          })
        }).catch(done);
      })
      it("Should not return pages with no similar tags", function(done){
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
      it("Should generate a random urlTitle for no urlTitle", function(){

      })
      it("Should call random when generating title", function(){

      })
      it("Should generate a 5 length substring", function(){

      })
    })
  })

  describe("Pages having owners", function(){
    it("Should have an authorId", function(){

    })
  })
})

