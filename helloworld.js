//set main namespace
goog.provide('helloworld');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');


// entrypoint
helloworld.start = function(){

	var director = new lime.Director(document.body,1024,768),
	    scene = new lime.Scene(),

	    player = new lime.Layer().setPosition(512,384),
            circle = new lime.Circle().setSize(50,50).setFill(0,0,0),

            target = new lime.Layer().setPosition(768, 512),
            tcircle = new lime.Circle().setSize(50,50).setFill(43,237,82);
    //add circles to their requisite layers
    player.appendChild(circle);
    target.appendChild(tcircle);

    //add the player to the scene
    scene.appendChild(player);

    //add target to scene
    scene.appendChild(target);

	director.makeMobileWebAppCapable();

    //add some interaction
    goog.events.listen(player,['mousedown','touchstart'],function(e){

        //let player follow the mouse/finger
        e.startDrag();

        //listen for end event
        e.swallow(['mouseup','touchend'],function(){
            player.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(1),
                new lime.animation.ScaleTo(1),
                new lime.animation.MoveTo(512,384)
            ));

        });

    });

	// set current scene active
	director.replaceScene(scene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('helloworld.start', helloworld.start);
