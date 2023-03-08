import Ember from 'ember';

export default Ember.Route.extend({

beforeModel() {
  if(sessionStorage.getItem("role")==0)
    {
      this.transitionTo("userhome",sessionStorage.getItem("customer_id"));
    }

},
model(name)
{
  return name;
},
afterModel(model) {
  debugger;
  if(sessionStorage.length > 1 && (model.name !== sessionStorage.getItem("admin_name")))
    {
      this.transitionTo("adminhome", sessionStorage.getItem("admin_name"));
    }
    else if(sessionStorage.length < 1){
      this.transitionTo("login");
    }
},

});
