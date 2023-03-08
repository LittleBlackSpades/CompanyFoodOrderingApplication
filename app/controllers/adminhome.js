import Ember from 'ember';
import Em from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({

  categories:[
        Em.Object.create({
          foodcategory_name:""
        })
  ],
  foodItem:[ Em.Object.create({
          fooditem_name:"",
          foodcategory_name:"",
          item_desc:"",
          unit_price:"",
          avail_quantity:"",
          max_allowed_quanity:"",
          fooditem_pic:""
  })
  ],
  customer:[],
  order:[ Em.Object.create({
    fooditem_name:"",
    foodcategory_name:"",
    order_id:"",
    amount:"",
    customer_id:"",
    created_time:"",
    item_quantity:""
  })
  ],
  isOrder:false,
  isFood:false,
  isFoodItem: false,
  isCustomer:false,
  isaddItem:false,
  isEditItem:false,
  id:'',
  itemUpdate:[],
  showOrder:[],
  onInit: function(){
      this.send('showCustomer');
  }.on('init'),

  actions:{
    showCategory:function()
    {
      debugger;
      this.set("isCategory",true);
      this.set("isFoodItem",false);
      this.set("isCustomer",false);
      this.set("isOrder",false);
      var _this = this;
      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/foodCategories",
        type:"GET",
        async:false,

        success:function(response)
        {
          _this.categories.setObjects(response);

        },
        error:function(response)
        {
          alert("Error Occured .Pls register after sometime " + response);
        }
      });

    },

    showFoodItem:function()
    {
      this.foodItem.setObjects([]);
      this.set("isCategory",false);
      this.set("isFoodItem",true);
      this.set("isCustomer",false);
      this.set("isOrder",false);
      var _this = this;
      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/foodItems",
        type:"GET",
        async:false,

        success:function(response)
        {
          _this.foodItem.setObjects(response);
          return response;
        },
        error:function(response)
        {
          alert("Error Occured .Pls register after sometime " + response);
        }
      });

    },
    showCustomer:function()
    {
      this.set("isCategory",false);
      this.set("isFoodItem",false);
      this.set("isCustomer",true);
      this.set("isOrder",false);
      var _this = this;
      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/customers",
        type:"GET",
        async:false,

        success:function(response)
        {
          _this.set('customer', response);
          return response;
        },
        error:function(response)
        {
          alert("Error Occured .Pls register after sometime " + response);
        }
      });
     // debugger;
      let len = this.get('customer').length;
      for(let i=0;i<len;i++)
      {
        if(this.customer[i].role==1)
        {
          this.customer.splice(i,i);
        }
      }
    },
    showOrder:function()
    {
      this.showOrder.setObjects([]);
      this.set("isCategory",false);
      this.set("isFoodItem",false);
      this.set("isCustomer",false);
      this.set("isOrder",true);
      var _this = this;
      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/orderitem/timelogs",
        type:"GET",
        async:false,

        success:function(response)
        {
          _this.set('order', response);
          return response;
        },
        error:function(response)
        {
          alert("Error Occured .Pls register after sometime " + response);
        }
      });
      this.showOrder.pushObjects(this.get("order"));
      //console.log(this.showOrder);

    },
    filterOrder:function()
    {
     this.showOrder.setObjects([]);
      //debugger;
      var sdate = this.get("startDate");
      var ldate = this.get("lastDate");
      var len = this.order.length;
      for(let i =0;i<len;i++)
      {
        let date = this.get("order")[i].created_time.split(" ");
        if(sdate<=date[0] && ldate >= date[0]){
          this.showOrder.pushObject(this.order[i]);
        }
      }

    },
    openAddItem:function()
    {
      this.set("isaddItem",true);
    },
    cancelAdd:function()
    {
      this.set("isaddItem",false);
    },
    addfood:function()
    {
      var  fooditem_name = this.get("fooditem_name");
      var foodcategory_name = this.get("foodcategory_name");
      var item_desc = this.get("item_desc");
      var  unit_price = this.get("unit_price");
      var avail_quantity = this.get("avail_quantity");
      var max_allowed_quanity = this.get("max_allowed_quanity");
      var  fooditem_pic = this.get("fooditem_pic");
      var t = this;
      var item ={
          "fooditem_name":fooditem_name,
          "foodcategory_name":foodcategory_name,
          "item_desc":item_desc,
          "unit_price": unit_price ,
          "avail_quantity":avail_quantity,
          "max_allowed_quanity":max_allowed_quanity,
          "fooditem_pic":fooditem_pic
      };

      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/foodItem/add",
        type:"POST",
        data:JSON.stringify(item),
        success:function(response)
        {
          alert("Hurray!!! you have added the food item successfully");
          t.set("isaddItem",false);
          t.foodItem.pushObject(item);
        },
        error:function(response)
        {
          alert("Error Occured .Pls add Food item after sometime" +response);
          t.set("isaddItem",false);
        }

      });


    },
    deleteCategories:function(index,foodcategory_name)
    {
      var category =foodcategory_name;
      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/foodCategories/"+category,
        type:"DELETE",
        success:function(response)
        {
          alert("Hurray!!! you have deleted "+category +" successfully" );
        },
        error:function(response)
        {
          alert("Error Occured .Pls try after sometime" +response);
        }

      });
      this.categories.removeObject(index);
    },
    deleteItem:function(item)
    {
      var id =item.fooditem_id;
      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/foodItem/"+id,
        type:"DELETE",
        success:function(response)
        {
          alert("Hurray!!! you have deleted "+item.fooditem_name +" successfully" );
        },
        error:function(response)
        {
          alert("Error Occured .Pls try after sometime" +response);
        }

      });
        this.get("foodItem").removeObject(item);
    },
   editOpen:function(id,item)
   {
    this.set("isEditItem",true);
    this.set("id",id);
    this.set("itemUpdate",item);
    this.setProperties({
      fooditem_name: item.fooditem_name,
      item_desc: item.item_desc,
      max_allowed_quanity: item.max_allowed_quanity,
      unit_price: item.unit_price,
      avail_quantity: item.avail_quantity,
      foodcategory_name: item.foodcategory_name,
    });

   },
   canceledit:function()
   {
    this.set("isEditItem",false);
   },
   editfood:function()
   {
    var  fooditem_name = this.get("fooditem_name");
    var foodcategory_name = this.get("fooditem_name");
    var item_desc = this.get("item_desc");
    var  unit_price = this.get("unit_price");
    var avail_quantity = this.get("avail_quantity");
    var max_allowed_quanity = this.get("max_allowed_quanity");
    var  fooditem_pic = this.get("fooditem_pic");
    var foodItem_id= this.get('id');
    var t = this;
    var item ={
       "foodItem_id":foodItem_id,
       "fooditem_name":fooditem_name,
        "foodcategory_name":foodcategory_name,
        "item_desc":item_desc,
        "unit_price": unit_price ,
        "avail_quantity":avail_quantity,
        "max_allowed_quanity":max_allowed_quanity,
        "fooditem_pic":fooditem_pic
    };

    $.ajax({
      url:"http://localhost:8080/CompanyFoodOrderingWebApp/foodItems/"+foodItem_id+"/update",
      type:"PUT",
      data:JSON.stringify(item),
      success:function(response)
      {
        alert("Hurray!!! you have updated the food item successfully");
        t.set("isEditItem",false);
      },
      error:function(response)
      {
        alert("Error Occured .Pls update Food item after sometime" +response);
        t.set("isEditItem",false);
      }

    });
      this.get("foodItem").removeObject(this.get("itemUpdate"));
      this.get("foodItem").pushObject(item);
   },
   logout:function()
   {
    sessionStorage.clear();
     this.transitionToRoute("login");
   }



  }

});
