import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
    // queryParams:['id'],
    // id:null,
  actions:{
    handleSignUp:function()
    {

      var email_id = this.get('email_id');
      var passwrd = this.get('passwrd');

        const user={
        "email_id":email_id,
        "passwrd":passwrd,

      };
      var data =this;
      var response = $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/customers/login",
        type:"POST",
        dataType: 'json',
        data:JSON.stringify(user),
        success:function(resulttext)
        {
          if(resulttext[0].role==1)
          {
            let adminName = resulttext[0].firstname;
            sessionStorage.setItem("admin_name",adminName);
            sessionStorage.setItem("role",resulttext[0].role);
            data.transitionToRoute("adminhome",adminName);

          }
          else{
            var userid = resulttext[0].customer_id;
            sessionStorage.setItem("customer_id",userid);
            sessionStorage.setItem("role",resulttext[0].role)
            data.transitionToRoute("userhome",userid);

          }
          return resulttext;
        },
        error:function(resulttext)
        {
          alert("Error Occured "+resulttext);
          return resulttext;
        },

      });

    }
  }


});
