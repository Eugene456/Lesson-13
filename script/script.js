'use strict';
window.addEventListener('DOMContentLoaded', function(){
    

    //Timer
    function countTimer (){
        const timerHours = document.querySelector('#timer-hours'),
              timerMinutes = document.querySelector('#timer-minutes'),
              timerSeconds = document.querySelector('#timer-seconds');
       
        function getTimeRemaining(){
            let dateStop = 24 * 3600 * 1000,
            dateNow = new Date().getTime() % (24 * 3600 * 1000),
            timeRemaining = (dateStop - dateNow)/1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor (timeRemaining / 60 / 60);
            //days =  Math.floor (timeRemaining / 60 / 60 / 24); 
            
            
            return{
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }
        
        function updateClock(){
            let timer =  getTimeRemaining();     
            
            function dateFormat (time , container){
                if (time < 10){
                    container.textContent = '0' + time;
                } else {
                    container.textContent = time;
                }
            }
            
            dateFormat(timer.hours, timerHours);
            dateFormat(timer.minutes, timerMinutes);
            dateFormat(timer.seconds, timerSeconds);
            

            setInterval(updateClock, 1000); 
            if (timer.hours <= 0 && timer.minutes <= 0 && timer.seconds <= 0){
                clearInterval();
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                countTimer();
            }
            
        }
        updateClock();
    }
    countTimer();

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
             menu = document.querySelector('menu'),
             closeBtn = document.querySelector('.close-btn'),
             menuItems = menu.querySelectorAll('ul>li');
        let interval,
            count = -100;
             const handlerMenu = () => {
                interval = requestAnimationFrame(handlerMenu);
                    if(count < 0){
                        menu.style.transform = `translate(${count}%)`;
                        count++;
                    } else{
                        cancelAnimationFrame(interval);
                    }
            };
            
            const closeMenu =() => {
                interval = requestAnimationFrame(closeMenu);
                    if(count > -100){
                        count--;
                        menu.style.transform = `translate(${count}%)`;
                        
                    } else{
                        cancelAnimationFrame(interval);
                    }
            }
        btnMenu.addEventListener('click', () => {
            
            if(screen.width < 768){
                if(!menu.style.transform || menu.style.transform === 'translate(-100%)'){
                    menu.style.transform = 'translate(0)';
                }else {
                    menu.style.transform = 'translate(-100%)';
                }
            }else{
            
            if(!menu.style.transform || menu.style.transform === 'translate(-100%)'){
                handlerMenu();
            }else {
                count = 0;
                closeMenu();
            };
        };
        });
        closeBtn.addEventListener('click',()=>{ 
            if (screen.width < 768){
                menu.style.transform = 'translate(-100%)';
            } else{closeMenu();}
        });
        menuItems.forEach(elem =>elem.addEventListener('click', ()=>{ 
           
            if (screen.width < 768){
                menu.style.transform = 'translate(-100%)';
            }else{closeMenu();}
        }));
    };
    toggleMenu();

    //popup
    let togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click',() => {
                popup.style.display = 'block';
            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();
});