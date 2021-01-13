/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//1. find sections list and create a fragmament instead of <div>
const sectionsList = document.querySelectorAll('section');
// console.log(sectionsList);
const frag = document.createDocumentFragment();
const navBar = document.getElementById('navbar__list');
// const listItems = document.getElementsByTagName('li');


window.addEventListener('DOMContentLoaded', (event) => {
    //console.log('DOM fully loaded and parsed');
});

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//2. helper function: we will need to create anchor under <ul> </ul> so <a> </a>
function createNavList(id, name) {
    const anchor = `<a class = "menu__link" id = "${id}">${name}</a>`;
    return anchor;
}
function nearPortView(element) {
    const size = element.getBoundingClientRect();
    // console.log("1. top "+size.top);
    // console.log("2. left "+size.left);
    // console.log("3. bottom "+size.bottom);
    // console.log("4. right "+size.right);
    // console.log('--------------------');
    return (size.top >= 0 && 
        size.left >= 0 && 
        size.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        size.right <= (window.innerWidth || document.documentElement.clientWidth));
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function buildNav() {
    for(const section of sectionsList) {
        const list = document.createElement('li');
        const section_id = section.getAttribute('id');
        const section_dataNav = section.getAttribute('data-nav');
        list.innerHTML = createNavList(section_id, section_dataNav);
        frag.appendChild(list);
        
    }
    navBar.appendChild(frag);
}

// Add class 'active' to section when near top of viewport
function setActive() {
    for(const section of sectionsList) {
        if(nearPortView(section)) {
            section.classList.add("your-active-class");
            //console.log("the class was added!");
        }
        else {
            section.classList.remove("your-active-class");
            //console.log("the class was removed!");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollAnchor(event) {
    for(const section in sectionsList){
        //console.log('section id'+section.id);
        if(event.target.nodeName === 'A') {
            const id = event.target.getAttribute('id');
            if(id === section.id) {
                section.scrollIntoView({behavior: "smooth"});
            }
        }
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

document.addEventListener('scroll', function() {
    setActive();
});

// Set sections as active
const navList = document.getElementById('navbar__list');
//console.log(navList);
navList.addEventListener('click', function(event) {
    scrollAnchor(event);
});

buildNav(sectionsList);


// scroll to top button
const ele = document.getElementById("main");
console.log(ele);
function scrollToTop() {
    ele.scrollIntoView({behavior: "smooth"});
}



/* note - no need*/

// 1. Test click each one get the innerHTML of that section.
// const sections = document.querySelectorAll('section');
// for(let i = 0; i < sections.length; i++) {
//     sections[i].addEventListener('click', function(){
//         var pageNav = sections[i].getAttribute("data-nav");
//         alert('The ' + sections[i].innerHTML + " a " + pageNav);
//     });
// }
