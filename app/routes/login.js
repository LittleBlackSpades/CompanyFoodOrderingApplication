import Ember from 'ember';

export default Ember.Route.extend({


  beforeModel() {
    debugger;
    if(sessionStorage.getItem('customer_id')!=null)
    {
      this.transitionTo('/userhome/'+sessionStorage.getItem('customer_id'));
    }
    else if(sessionStorage.getItem('admin_name')!=null)
    {
      this.transitionTo('/adminhome/'+sessionStorage.getItem('admin_name'));
    }

  },



});
