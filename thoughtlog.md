- I'm still writing angular 1.x code with gulp. The description says I should write it in TypeScript and Angular2, and I am ready to take the challenge.
- First I installed angular-cli, I heard it's a nice tool
- I also wanted to try VS code as I heard it works nicely with Angular2 projects.
- I added `escher-vis` as a dependency, and I created a Builder with all `null` parameters.
- I added d3 to be able to select a target node
- Turns out that I should have install ds-select as `npm install --save @types/d3-select`.
- There's a weird error from escher: It says `"TypeError: Cannot read property 'parentNode' of null"`. It's actually a d3. thing. In Escher it calls `el.node()` if `el` is a selection.
- Aha, https://github.com/d3/d3-selection/blob/master/README.md#selection_node So there was no match. It looks like I have to wait for the HTML to be available.
- According the stack traces escher implicitly depends on jquery. Let's install that.
- After a long research I couldn't find a solution. I created an issue at escher: https://github.com/zakandrewking/escher/issues/180#issuecomment-295456765. The link in the discussion helped me to make jQuery available global, but then the code failed at the next call (It tries to call`.button('toggle')`)
- My next problem was that the menu dropdowns didn't work, they are irrseponsive without any error. After a few hours of sleep I could fix it. I knew that it was missing some js that is required by bootstrap. My editor (VS code) didn't show bootstrap inside `node_modules`. I figured out that there's a refresh button in the editor, which reloads the filesystem (That's a plus point that it does not actively monitor the fs). I added the required js (`bootstrap/js/dropdown.js`) to my angular-cli script list. I got an error that jquery was no available, I just changed theorder of the scripts, and it works.
- Note, that normally I use a css preprocessor, but I may not spend time on it in this case.
- I am now working on the color switcher. I guess optimally this should be done with the builder js API, but even after reading the docs, I couldn't find a straighforward way. One option is to replace the stylsheet, I'm not quite fond of that. The other option is to use a good old class based css rule, that overrides the default color. I go for this solution.
- I added my rules to app.css, but it didn't work. I looked up how the produced css looks, and I found that Angular processes css, and adds `[_ngcontent-c0]`. This is a new thing for me, I am used to global css. I moved out my rules to the global css file, and the overwrite works nicely. Let's add the logic. Note: I think this is a suboptimal solution, but I think the other tasks are more difficult, so I'd like to finish quickly with this one, and get back to it if I have time. I had to look for the new syntax of ng-class (`[ngClass]`), and the new ng-click (`(click)`), but it was easy. Now I am adding a new class called `green-scheme` to the target element, and I can change the color scheme. Now it's just a toggle button, I'll get back to it later.
- I changed the way the app works: Instead of using escher's upload, I added an upload button, and I only instantiate the builder when the file is uploaded. I also turned off the unnecessary parts of the escher menu. Perhaps I can remove jquery.
- I missed some things from here. I could achieve the requested functionality. I had issues with Angular2. Iterating thorugh an object by keys and values is not as straightforward as it is in Angular1. I had to write a pipe.
- I realized, that I can implement the functionality without lodash, using d3 only, and removing dependencies is always a good thing. This way I don't even need my object pipe (the one that I used to access both keys and values in `*ngFor`). I had problems adding the pipe to the project. The TypeScript version I'm using does not allow to add the `pipes` keyword to the app component (as I remember it has to do something with the defined optional / non optional type arguments), so I ended up adding it to the module declarations.
- So now, since the functionality is there, it is time for a little cleanup. I'd like to do 4 more things: Deploy it to surge, Add tests refactor the code and add styling.
- Deployment done and styling is done. The only thing left is testing. I have difficulties with it, I am not quite sure how to test the click handlers.
- I just found https://escher.readthedocs.io/en/stable/javascript_api.html#options.tooltip_component. Unfortunately I don't really have time to use that instead of my click detector. But I think that's a better way to display info about the selected node.
- I am trying to test the click handler, but I cannot find a way to run the test after the builder is ready (I don't want to introduce timeouts).