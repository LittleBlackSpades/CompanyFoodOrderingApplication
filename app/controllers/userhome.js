import Ember from 'ember';
import Em from 'ember';
import $ from  'jquery';


export default Ember.Controller.extend({

  //queryParams:['id'],
  max_allowed_quanity:'',
  fooditem_id:'',
  item_desc:'',
  fooditem_pic:'',
  fooditem_name:'',
  unit_price:'',
  foodcategory_name:'',
  avail_quantity:'',
  foods:[],
  foodStore:[
    Em.Object.create({
          fooditem_name:"",
          foodcategory_name:"",
          item_desc:"",
          unit_price:"",
          avail_quantity:"",
          max_allowed_quanity:"",
          fooditem_pic:""
    })
  ],
  isCart:false,
  cartItem:[],
  cartAdd:[],
  onclick:false,
  items:[],
  color: 'color-head',
  sum:0,
  cart_len:0,
  // id:this.get("id"),

  onInit: function(){
    this.set('color', 'color-head');
    this.send('getAllItems');
    //debugger;
  }.on('init'),

  // observingFoods : Em.observer('cartItem.@each', function(){
  //   debugger;
  //     this.set('cartItem',this.get('cartItem')); //NO I18N
  // }),

  unSelectColors: function(){
    this.setProperties({
      isAllSelected : false,
      isBFSelected: false,
      isDinnerSelected: false,
      isLunchSelected: false,
      isOtherSelected: false
    });
  },

  actions:{
    getAllItems:function()
    {
      this.foodStore.setObjects([]);
      this.unSelectColors();
      this.set('isAllSelected', true);
      var _this = this;
      $.ajax({
        url:"http://localhost:8080/CompanyFoodOrderingWebApp/foodItems",
        type:"GET",
        async:false,

        success:function(response)
        {
          _this.set('foods', response);
          return response;
        },
        error:function(response)
        {
          alert("Error Occured .Pls rorder after sometime " + response);
        }

      });
      this.foodStore.pushObjects(this.get('foods'));
    },
    others:function()
    {
     // debugger;
      this.foods.setObjects([]);
      this.unSelectColors();
      this.set('isOtherSelected', true);
      let len = this.foodStore.length;
      for(let i=0;i<len;i++){
        if(this.foodStore.objectAt(i).foodcategory_name != "Breakfast" && this.foodStore.objectAt(i).foodcategory_name != "Dinner" && this.foodStore.objectAt(i).foodcategory_name != "Lunch" )
        {
          this.get('foods').pushObject(this.foodStore.objectAt(i));
        }
      }

    },
    breakfast:function()
    {
      this.foods.setObjects([]);
      this.unSelectColors();
      this.set('isBFSelected', true);
      let len = this.foodStore.length;
      for(let i=0;i<len;i++){
        if(this.foodStore.objectAt(i).foodcategory_name == "Breakfast")
        {
          this.get('foods').pushObject(this.foodStore.objectAt(i));
        }
      }


    },
    lunch:function()
    {
      this.foods.setObjects([]);
      this.unSelectColors();
      this.set('isLunchSelected', true);
      let len = this.foodStore.length;
      for(let i=0;i<len;i++){
        if(this.foodStore.objectAt(i).foodcategory_name == "Lunch" )
        {
          this.get('foods').pushObject(this.foodStore.objectAt(i));
        }
      }

    },
    dinner:function()
    {
      this.foods.setObjects([]);
      this.unSelectColors();
      this.set('isDinnerSelected', true);
      let len = this.foodStore.length;
      for(let i=0;i<len;i++){
        if(this.foodStore.objectAt(i).foodcategory_name == "Dinner" )
        {
          this.get('foods').pushObject(this.foodStore.objectAt(i));
        }
      }
    },
    addingToCart:function(item)
    {
        //this.set("isCart",true);
        var temp = this.sum;
        var orderQuantity = parseInt($('#' + item.fooditem_id).val());

        if(item.max_allowed_quanity<orderQuantity)
              {
          alert("You can only select "+item. max_allowed_quanity);
        }
        else if(this.items.includes(item.fooditem_id))
        {
          alert("The Item is already in cart");
        }
        else if(item.avail_quantity<=orderQuantity)
        {
          alert("Food is not available at the moment")
        }
        else{

          this.cartItem.pushObject(Em.Object.create({
            fooditem_name : item.fooditem_name,
            unit_price: item.unit_price,
            item_quantity:orderQuantity,
            fooditem_id:item.fooditem_id
          }));
          this.items.push(item.fooditem_id)
          var price = item.unit_price*orderQuantity;
          temp+=price;
          this.set("sum",temp);
        }
        this.set("cart_len",this.get("items").length);
    },
    showCart:function()
    {
      this.set("isCart",true);
    },
    deleteOrder:function(index,fid)
    {
      //debugger;
       let calc = this.sum -(this.cartItem.objectAt(index).unit_price * this.cartItem.objectAt(index).item_quantity);
       this.set('sum',calc);
       this.get('cartItem').removeObject(this.cartItem.objectAt(index));
       let i = this.get("items").indexOf(fid);
       this.get("items").splice(i,1);
       this.set("cart_len",this.get("items").length);
    },
    close:function()
    {
      this.set("isCart",false);
    },
    order:function(sum){
     // debugger;
      var amount = sum;
      var len = this.cartItem.length;
      var orderList=[];
      for(let i =0;i<len;i++)
      {
        let order = {
          "amount":amount,
          "fooditem_id":this.cartItem.objectAt(i).fooditem_id,
          "item_quantity":this.cartItem.objectAt(i).item_quantity,
          "customer_id":this.get("model.id")
        };
        orderList.push(order);
      }
        $.ajax({
          url:"http://localhost:8080/CompanyFoodOrderingWebApp/orders",
          type:"POST",
          dataType: 'json',
          data:JSON.stringify(orderList),
          success:function(resulttext)
          {
            alert("Order is placed successfully !!!");
            //_this.get("isCart").set(false);
          },
          error:function(resulttext)
          {
            alert("Error Occured" +resulttext);
          },

        });
        this.get("cartItem").setObjects([]);
        this.set("sum",0);
        this.get("items").setObjects([]);
        this.set("cart_len",this.get("items").length);
      },
      logout:function()
      {
        sessionStorage.clear();
        this.transitionToRoute("login");
      }

    }









});
