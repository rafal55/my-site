function myFunction() {
    var iframe = document.getElementById("a_iframe");

    if (iframe.style.display === "none") {
        iframe.style.display = "block";
    } else {
        iframe.style.display = "none";
    }
}
/*$('#button').toggle(function () {
    $("#button").addClass("column side");
}, function () {
    $("#button").removeClass("column side");
});*/

/*$(document).ready(function(){
    $("button").click(function(){
        $("#div1").animate({
            height: '800px',
            width: '80%',
        });
    });
});*/