import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('registration');
  this.route('login');
  this.route('adminhome',{path:'/adminhome/:name'}, function() {});
  //this.route('userhome');
  this.route('userhome',{path:'/userhome/:id'});
});

export default Router;
