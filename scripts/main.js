// todo: dark mode effect, blend difference on button, scale to cover whole view, change theme to dark mode, scale back to regular
// [2] use vh, vw instead of px,rem?, adj font size
// Main Nav -------------------------------------------------------------------------------------------------------------------------
const page1 = $(".info");
const page2 = $(".blog");
const page3 = $(".work");
const sidebar = $(".sidebar");
$(".radio-group input[type='radio']").on('click', function() {
   resetCursor();
   // find the clicked id, for each: remove link class to clicked, add link class to not clicked
   updateLinkedRadio($(this));
   
   // remove hover effect on all 'navlink' (reset this effect)
   document.querySelectorAll(".cursor").forEach(el => el.classList.remove("hover"));

   switchPage($(this).closest(".radio-group").find("input[type='radio']:checked").attr("id"));
   addCursor();
   // console.log($(this).closest(".radio-group").find("input[type='radio']:checked").attr("id"));
   
});
function updateLinkedRadio(element){
   var clickedRadioId = element.attr('id');
   element.closest('.radio-group').find('label').each(function() {
      if ($(this).attr('for') === clickedRadioId) {
         $(this).removeClass('link');//.addClass('nocursor')
      } else {
         $(this).addClass('link');
      }
   });
}
function switchPage(id){
   switch(id){
   case 'navinfo':
      page1.removeClass('hide').addClass('show');
      page2.removeClass('show').addClass('hide');
      page3.removeClass('show').addClass('hide');
      sidebar.removeClass('hide').addClass('show');
      window.history.pushState({},'','#info')
      break;
   case 'navblog':
      page1.removeClass('show').addClass('hide');
      page2.removeClass('hide').addClass('show');
      page3.removeClass('show').addClass('hide');
      sidebar.removeClass('show').addClass('hide');
      $("#blog1").removeClass('show').addClass('hide');
      window.history.pushState({},'','#blog')
      break;
   case 'navwork':
      page1.removeClass('show').addClass('hide');
      page2.removeClass('show').addClass('hide');
      page3.removeClass('hide').addClass('show');
      sidebar.removeClass('show').addClass('hide');
      window.history.pushState({},'','#work')
      break;
   }
}

function setPageFromURL() {
   let hash = window.location.hash.substring(1);
   let id = "nav"+hash;
   switchPage(id);
   $(".radio-group input[type='radio']").each(function() {
      if ($(this).attr('id') === id) {
         $(this).prop('checked', true);
         updateLinkedRadio($(this));
      }
   });
   resetCursor();
   addCursor();
}

function toggleBlog(id){
   if($(id).hasClass("show")){
      $(id).addClass("hide").removeClass("show");
   }
   else {
      $(id).addClass("show").removeClass("hide")
   }
   scrollToID(id);
}

// Sidebar -------------------------------------------------------------------------------------------------------------------------
$(".sidebar table tbody tr td a").on('click', function(e){
   e.preventDefault();
   var target = $(this).attr('href'); 
   scrollToID(target);
});

$(window).scroll(function() {
   var height = $(window).scrollTop();
   var home = $('#home').offset().top;
   var aboutme = $('#aboutme').offset().top;
   var education = $('#education').offset().top;
   var win_height = window.innerHeight;
   
   if(height <= home+win_height/2) {
      update_selected($('#sb_btn1'));
   }
   else if( height <= aboutme+win_height/2){
      update_selected($('#sb_btn2'));
   }
   else {
      update_selected($('#sb_btn3'));
   }
   //console.log(height, home, aboutme, education);
   //if ($(window).scrollTop() >= $('.div').offset().top + $('.div').outerHeight() - window.innerHeight) {alert('You reached the end of the DIV');}
});

function update_selected(target){
   target.closest('td').addClass('status_selected').siblings().removeClass('status_selected').addClass('status_not_selected');
   target.closest('td').removeClass('status_not_selected');
   //console.log(target.closest('td'));
}
// Effects -------------------------------------------------------------------------------------------------------------------------
function scrollToID(id){
   $('html, body').animate({
      scrollTop: $(id).offset().top 
   }, 1000); 
}
function addCursor(){
   const cursor = document.querySelectorAll(".cursor");
   const links = document.querySelectorAll(".link");
   const scrollLink = document.querySelectorAll(".scroll");
   links.forEach(link => {
     link.addEventListener("mouseenter", hoverIn);
     link.addEventListener("mouseleave", hoverOut);
   });
   scrollLink.forEach(link => {
     link.addEventListener("mouseenter", scrollIn);
     link.addEventListener("mouseleave", scrollOut);
   });
   window.addEventListener("mousemove", (e) => {
     let x = e.pageX;
     let y = e.pageY;
     cursor.forEach(el => {
       el.style.left = `${x}px`;
       el.style.top = `${y}px`;
     });
   });
}
// remove existing listeners
function resetCursor(){
   document.querySelectorAll('.link').forEach(link => {
     link.removeEventListener('mouseenter', hoverIn);
     link.removeEventListener('mouseleave', hoverOut);
   });
   document.querySelectorAll('.scroll').forEach(link => {
     link.removeEventListener('mouseenter', scrollIn);
     link.removeEventListener('mouseleave', scrollOut);
   });
}
function hoverIn(e) {
   const cursor = document.querySelectorAll(".cursor");
   cursor.forEach(el => el.classList.add("hover"));
}
function hoverOut(e) {
   const cursor = document.querySelectorAll(".cursor");
   cursor.forEach(el => el.classList.remove("hover"));
}
function scrollIn(e) {
   const cursor = document.querySelectorAll(".cursor");
   cursor.forEach(el => el.classList.add("scroll"));
}
function scrollOut(e) {
   const cursor = document.querySelectorAll(".cursor");
   cursor.forEach(el => el.classList.remove("scroll"));
}
const rootDataset = document.documentElement.dataset;

function toggleDarkMode(){
   const inDarkMode = (rootDataset.theme === 'dark');
   rootDataset.theme = inDarkMode ? '' : 'dark';
  
}
document.getElementById("lightmode").addEventListener("click", toggleDarkMode);

// Listeners Etc -------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
   setPageFromURL();
   addCursor();
});
$(window).on('popstate', function() {
  setPageFromURL();
});
function goToURL(url){
   Confirm('You are about to visit an external site','Confirm visit ' + url + "?" , 'Confirm', 'Cancel', url);
}
function Confirm(title, msg, $true, $false, $link) { /*change*/
   var $content =  "<div class='dialog-ovelay show'>" +
                  "<div class='dialog'><header>" +
                   " <h3> " + title + " </h3> " +
                   "<i class='fa fa-close'></i>" +
               "</header>" +
               "<div class='dialog-msg'>" +
                   " <p> " + msg + " </p> " +
               "</div>" +
               "<footer>" +
                   "<div class='controls'>" +
                       " <button class='button button-danger doAction'>" + $true + "</button> " +
                       " <button class='button button-default cancelAction'>" + $false + "</button> " +
                   "</div>" +
               "</footer>" +
            "</div>" +
          "</div>";
   $('body').prepend($content);
   $('.doAction').click(function () {
      window.open($link, "_blank"); /*new*/
      $(this).parents('.dialog-ovelay').fadeOut(100, function () {
         $(this).remove();
     });
   });
   $('.cancelAction, .fa-close').click(function () {
      $(this).parents('.dialog-ovelay').fadeOut(100, function () {
         $(this).remove();
      });
   });
}
