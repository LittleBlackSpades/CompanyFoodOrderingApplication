import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    if(sessionStorage.getItem("role")==1)
      {
        this.transitionTo("adminhome",sessionStorage.getItem("admin_name"));
      }

  },
  model(id)
  {
    debugger;
    return id;
  },
  afterModel(model) {
    debugger;
    if(sessionStorage.length > 0 && (model.id !== sessionStorage.getItem("customer_id")))
      {
        this.transitionTo("userhome", sessionStorage.getItem("customer_id"));
      }
      else if(sessionStorage.length < 1){
        this.transitionTo("login");
      }
  },

});
