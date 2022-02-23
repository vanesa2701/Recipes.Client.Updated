$(document).ready(function(){
    $("#addCategoryForm").validate({
        rules:{
            catname: { 
                required: true, 
                minlength: 2
            },
            
        },
        messages:{
            catname: { 
                required: 'Category name is required', 
                minlength: 'Min length required is 2 chars'
            },
            
        },
        //messages
        submitHandler: function(form){
            console.log(`${form.catname.value}`);

            var payload = {
                "catName": form.catname.value,
            
            };
            console.log("person (payload) - ", payload);

            
            $.ajax({  
                url: 'https://localhost:44358/api/Recipes/add-recipe',  
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' ,
                                        "Access-Control-Allow-Origin":"*" 

                },
                type: 'POST',  
                crossDomain: true,
                dataType: 'json',  
                data: JSON.stringify(payload),  
                success: function (data, textStatus, xhr) {  
                    console.log(data);  
                    alert("Kategoria u shtua me sukses");
                },  
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                }  
            });  

        }
    })

    $("#addRecipeForm").validate({
        rules:{
            dishname:{
                required: true, 
                minlength: 3
            },
            description: { 
                required: true, 
                minlength: 10
            },
            categoryId: { required: true},
            rate: { required: true}
        },
        messages:{
            dishname: { 
                required: 'Dish name is required', 
                minlength: 'Min length required is 3 chars'
            },
            description: { 
                required: 'Dish description is required', 
                minlength: 'Min length required is 10 chars'
            },
            categoryId: 'Category is required',
            rate: 'Rate is required',
        },
        //messages
        submitHandler: function(form){
            console.log(`${form.dishname.value} ${form.description.value} ${form.categoryId.value} ${form.rate.value}`);

            var payload = {
                "name": form.dishname.value,
                "description": form.description.value,
                "rate": parseInt(form.rate.value),
                "category": form.categoryId.value,
            };

            $.ajax({  
                url: 'https://localhost:44358/api/Recipes/add-recipe',  
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin":"*" 
                },
                type: 'POST', 
                crossDomain: true, 
                dataType: 'json',  
                data: JSON.stringify(payload),  
                success: function (data, textStatus, xhr) {  
                    // console.log(data);  
                    // alert("Receta u shtua me sukses");
                    console.log("Receta u shtua me sukses");
                },  
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                }  
            });  
        }
    })

    
});


function loadAllCategories(){
    $.ajax({  
        url: "https://localhost:44358/api/Recipes/get-all-recipes",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "jsonp",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.catName ;
            });
            $('table tbody').html(_response);
            
        }, 

        failure: function (data) {  
            alert(data.responseText);  
            console.log(data);
        }, //End of AJAX failure function  
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);

        } //End of AJAX error function  

    });
}


function getCategoriesDropDown(){
    $.ajax({  
        url: "https://localhost:44358/api/Recipes/get-all-recipes",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "json",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.catName;
                $('#categoryId').append('<option id=' + item.id  + item.catName + '</option>');
            
            });
            // $('table tbody').html(_response);
            
        }, 

        failure: function (data) {  
            console.log(data);
        }, //End of AJAX failure function  
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);
        } //End of AJAX error function  

    });
}
$.each(result, function (i, value) {
});


function loadAllRecipes(){
    $.ajax({  
        url: "https://localhost:44358/api/Recipes/get-all-recipes",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "json",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                console.log('i',i,"item",item)
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.name + '</td><td>' + item.category +'</td><td>'+item.rate+'</td></tr>';
            });
            $('table tbody').html(_response);
        }, 

        // <th scope="row">1</th>
        //     <td>Recipe 1</td>
        //     <td>Category 1</td>
        //     <td>7</td>

        failure: function (data) {  
            alert(data.responseText);  
            console.log(data);
        }, //End of AJAX failure function  
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);

        } //End of AJAX error function  

    });
}