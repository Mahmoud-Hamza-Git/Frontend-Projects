# _ToDo:_

1. 404.html page

# _Done:_

1. make logo icon's transparent background
2. to use async await functios even you use them inside another async function and await them or if this is not available use it directly and get the data using .then()

# _problems solved:_

1. using section Start & section End comments to separate diffrent style code in large css file
2. using transition:start with transition:end to handle waiting some time after element moves and not waiting when it moves in the opposite direction(navbar togglling at small screens)
3. overflow:hidden; didn't work with (absolute positioning elements and it's parent) until i used relative positioning with their parent
   also the absolute positioning elments normally flow over the elements even if you used z-index -- so if you want an element to appear in front use postion:relative; with it;
4. i wanted the header to be fixed and sticks to the top of the screen but i wanted to make it relative the parent body which it's width changes --> the solution was to give it fixed positioning and top property only and not use left(the left will automatically adjust)
