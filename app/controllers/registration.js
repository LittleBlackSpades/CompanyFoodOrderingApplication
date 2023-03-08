import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  actions:{
    handleRegisterUp:function()
    {

      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var email_id = this.get('email_id');
      var passwrd = this.get('passwrd');
      var phoneno =this.get('phoneno');
      var designation = this.get('designation');
      var t = this;
        const user={
        "firstName":firstName,
        "lastName":lastName,
        "email_id":email_id,
        "passwrd":passwrd,
        "phoneno":phoneno,
        "designation":designation

      };

       $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/customers/register",
        type:"POST",
        data:JSON.stringify(user),
        success:function(response)
        {
          alert("Hurray!!! you are register successfully");
          t.transitionToRoute("login");
        },
        error:function(response)
        {
          alert("Error Occured .Pls register after sometime");
        }

      });
    },




  }


});
