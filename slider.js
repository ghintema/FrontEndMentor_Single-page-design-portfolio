// Getting elements
const slide = document.getElementsByClassName('sliderElements')[0] // [0] to turn html-collection into single Element.
const buttonNext = document.getElementById('button-next');
const buttonPrev = document.getElementById('button-prev');
let slides = document.getElementsByClassName('slide')
let intervalID;
let intervalTime = 2500;

// Making clones: First two and last two slides need be cloned.
const firstClone = slides[0].cloneNode(true);
const secondClone = slides[1].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
const secondLastClone = slides[slides.length - 2].cloneNode(true);

// Giving Id's to the clones
firstClone.id = 'firstClone';
secondClone.id = 'secondClone';
lastClone.id = 'lastClone';
secondLastClone.id = 'secondLastClone';

// .prepend and .append need be called on the parent DOM-Element. 
slides[0].parentElement.prepend(lastClone);
slides[0].parentElement.prepend(secondLastClone);
slides[0].parentElement.append(firstClone);
slides[0].parentElement.append(secondClone);


// Starting with "2" because index "0" and "1" are mere clones of last and second-last slide
let index = 2; // 
//const slideWidth = slides[index].clientWidth
//slide.style.transform = `translateX(-${slideWidth * index }px)`
slide.style.left = `-${index}00%`

const moveOn = (step) => { 
    if (index > slides.length - 3) {return} // prevents fast overclicking beyond last slide
    if (index < 2 ) {return} // prevents fast underclicking below first slide
    index += step;
    slide.style.transition = '0.6s ease';
    //slide.style.transform = `translateX(-${slideWidth * index }px)`
    slide.style.left = `-${index}00%`
}

const reset = () => {
    if (slides[index].id === 'firstClone') {  
        index = 2                           
        slide.style.transition = 'none';
        //slide.style.transform = `translateX(${ - slideWidth * index}px)`
        slide.style.left = `-${index}00%`
    }
    
    if (slides[index].id === 'lastClone') { 
        index = slides.length - 3      
        slide.style.transition = 'none';
        //slide.style.transform = `translateX(${ - slideWidth * index}px)`
        slide.style.left = `-${index}00%`
    }
}

const startAutoPlay = () => {
    intervalID = setInterval(() => {
    moveOn(1)
    },intervalTime)
}

const stopAutoPlay = () => {
    clearInterval(intervalID);
}
startAutoPlay();
buttonNext.addEventListener('click',() => {moveOn(1)});
buttonPrev.addEventListener('click',() => {moveOn(-1)});

// Resetting the slide at the end or beginning for emulating the loop.
slide.addEventListener('transitionend', reset);
buttonNext.addEventListener('mouseenter', stopAutoPlay);
buttonPrev.addEventListener('mouseenter', stopAutoPlay);
slide.addEventListener('mouseenter', stopAutoPlay);
slide.addEventListener('mouseleave', startAutoPlay);

slide.addEventListener('swiped-left', () => {moveOn(1)});
slide.addEventListener('swiped-right', () => {moveOn(-1)});