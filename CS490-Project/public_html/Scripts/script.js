/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var controller = new Controller(movies["movies"])
    $("#search_button").on('click',function(e){
        e.stopPropagation();
        search();
    })
    $("html").on('click',function(){
        $("#suggestions_box").hide();
    });
});



function Controller(data) {
    this.photos = data;
    
    /*** constants ***/
    this.photos_div="#photos";
    this.grid_icon="#grid_icon";
    this.list_icon="#list_icon";
    this.combo_box="#combo_box";
    this.photo_template="#photo-template";
    
    
    //bind some events
    var self = this; //pass a reference to controller
    var make_grid_function=function(){
        self.make_grid.call(self);
    };
    
    var make_list_function=function(){
        self.make_list.call(self);
    };
    
    var sort_photos=function(){
        self.sort_photos.call(self);
    };
    
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
    $(this.combo_box).on('change',sort_photos);
    
    this.load_photos();
}

Controller.prototype.load_photos = function() {
        //get the template
    var template=$(this.photo_template).html(); //get the template
    var html_maker = new htmlMaker(template); //create an html Maker
    var html = html_maker.getHTML(this.photos); //generate dynamic HTML based on the data
    $(this.photos_div).html(html);
};

Controller.prototype.sort_photos=function(){
    var by=$(this.combo_box).val().toLowerCase();
    this.photos=this.photos.sort(
            function(a,b){
                if(a[by]<b[by])
                    return -1;
                if(a[by]==b[by])
                    return 0;
                if(a[by]>b[by])
                    return 1;
            }            
            );
    
    this.load_photos();
};


Controller.prototype.make_grid = function () {
    $(this.photos_div).attr("class", "grid");
    $(this.grid_icon).attr("src", "images/grid_pressed.jpg");
    $(this.list_icon).attr("src", "images/list.jpg");
};

Controller.prototype.make_list = function () {
    $(this.photos_div).attr("class", "list");
    $(this.grid_icon).attr("src", "images/grid.jpg");
    $(this.list_icon).attr("src", "images/list_pressed.jpg");
};

function search(){
    var films = movies["movies"];   
    var html="";
    var value = $("#search_box").val();
    var show = false;
    for (var i=0;i<films.length;++i){
        var titles = films[i].title.toLowerCase().search(value.toLowerCase().trim());
        var years = films[i].year.toString().search(value.toString().trim());
        var stars = films[i].starring.toLowerCase().search(value.toLowerCase().trim());
        if(titles != -1)
        {
            html+= "<div class='sub_suggestions' id='" + films[i].title + "' >";
            html+= films[i].title + "(" + films[i].year + "), " + films[i].starring;
            html+= "</div>";
            show=true;
        }
        if(years != -1)
        {
            html+= "<div class='sub_suggestions' id='" + films[i].title + "' >";
            html+= films[i].title + "(" + films[i].year + "), " + films[i].starring;
            html+= "</div>";
            show=true;  
        }
        if(stars != -1)
        {
            html+= "<div class='sub_suggestions' id='" + films[i].title + "' >";
            html+= films[i].title + "(" + films[i].year + "), " + films[i].starring;
            html+= "</div>";
            show=true;  
        }
    }
    if(show){
        $("#suggestions_box").html(html);
        $("#suggestions_box").show();
        $(".sub_suggestions")
    }
    else
       $("#suggestions_box").hide();
};