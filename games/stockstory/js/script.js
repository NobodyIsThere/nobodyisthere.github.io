"use strict";

/* exported messages */
/* exported notifications */
/* exported particles */
/* exported music */
/* exported voice */
/* exported sound */
/* exported videos */
/* exported images */
/* exported scenes */
/* exported characters */
/* exported script */

/* global storage */

// Define the messages used in the game.
let messages = {
	"Help": {
		"Title": "Help",
		"Subtitle": "Some useful Links",
		"Message": "<p><a href='https://monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p><p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>"
	}
};

// Define the notifications used in the game
let notifications = {
	"Welcome": {
		title: "Welcome",
		body: "This is the Monogatari VN Engine",
		icon: ""
	}
};

// Define the Particles JS Configurations used in the game
let particles = {

};

// Define the music used in the game.
const music = {

};

// Define the voice files used in the game.
const voice = {

};

// Define the sounds used in the game.
const sound = {

};

// Define the videos used in the game.
const videos = {

};

// Define the images used in the game.
const images = {

};

// Define the backgrounds for each scene.
const scenes = {
	"door": "door.jpg",
	"livingroom": "living_room.jpg"
};

// Define the Characters
const characters = {
	"?": {
		"Name": "???",
		"Color": "white"
	},
	"b": {
		"Name": "Smartly-dressed woman",
		"Color": "white",
		"Directory": "business",
		"Images": {
			"celebrate": "celebrate.png",
			"clipboard": "clipboard.png",
			"confident": "confident.png",
			"distressed": "distressed.png",
			"laugh": "laugh.png",
			"normal": "normal.png",
			"thumbsup": "thumbsup.png",
			"thumbup": "thumbup.png"
		}
	},
	"c": {
		"Name": "Child",
		"Color": "white",
		"Directory": "child",
		"Images": {
			"normal": "normal.png",
			"busy": "busy.png"
		}
	},
	"e": {
		"Name": "Elderly man",
		"Color": "white",
		"Directory": "senior",
		"Images": {
			"drugs": "drugs.png",
			"painting": "painting.png",
			"tech": "tech.png"
		}
	},
	"f": {
		"Name": "Man in winter clothes",
		"Color": "white",
		"Directory": "funwin",
		"Images": {
			"confused": "confused.png",
			"cute": "cute.png",
			"listening": "listening.png",
			"normal": "normal.png"
		}
	},
	"h": {
		"Name": "Cheerful man",
		"Color": "white",
		"Directory": "hipster",
		"Images": {
			"guitar": "guitar.png",
			"guitar_shoulder": "guitar_shoulder.png",
			"normal": "normal.png",
			"trolley": "trolley.png",
			"trolley_full": "trolley_full.png"
		}
	},
	"n": {
		"Name": "Man with megaphone",
		"Color": "white",
		"Directory": "nerd",
		"Images": {
			"cd": "cd.png",
			"disgusted": "disgusted.png",
			"normal": "normal.png",
			"side": "side.png"
		}
	},
	"p": {
		"Name": "Smiling doctor",
		"Color": "white",
		"Directory": "polymath",
		"Images": {
			"construction_map": "construction_map.png",
			"construction_normal": "construction_normal.png",
			"doctor": "doctor.png"
		}
	},
	"s": {
		"Name": "Woman with salad",
		"Color": "white",
		"Directory": "salad",
		"Images": {
			"normal": "normal.png"
		}
	},
	"y": {
		"Name": "Woman in yellow",
		"Color": "white",
		"Directory": "yellow",
		"Images": {
			"book": "book.png",
			"crutches": "crutches.png",
			"give": "give.png",
			"laptop": "laptop.png",
			"lookovershoulder": "lookovershoulder.png",
			"normal": "noglasses.png",
			"phone": "phone.png"
		}
	}
};

let script = {
	// The game starts here.
	"Start": [
		"scene black",
		"...",
		"? ...",
		"You realise you can hear people talking.",
		"? ...",
		"? Ssh! I think they're waking up...",
		"scene livingroom",
		"...",
		"You seem to be in some kind of living room. You're lying on something soft, perhaps a sofa.",
		"show b normal",
		"A smartly-dressed woman is standing over you.",
		"b ...",
		"b So, who are you?",
		"b Where do you come from? Do you know how you got here? Do you know who I am?",
		"show b clipboard",
		"b Do you have any family? What skills do you bring to the team? Where do you see yourself in five years' time?",
		"hide b",
		"show e painting",
		"e Oh, shut up, Barbara.",
		"An elderly man is painting in the corner of the room.",
		"hide e",
		"show f normal left",
		"f Give them some room, Barbara, they've just woken up!",
		"show s normal right",
		"s Hey, how are you feeling? Are you hungry? Do you want some salad?",
		"A cheerful-looking man in winter clothes, and a woman holding a bowl of salad are also standing over you.",
		"show b normal",
		"b Well, what's your name? Can you at least tell us that?",
		"Your name...",
		{"Input": {
			"Text": "What is your name?",
			"Validation": function (input) {
				return input.trim().length > 0;
			},
			"Save": function (input) {
				storage.player.Name = input.trim();
				return true;
			},
			"Warning": "If you don't know, just say you don't know!"
		}},
		"hide f",
		"hide s",
		{"Conditional": {
			"Condition": function() {
				var name = storage.player.Name.toLowerCase();
				return name.includes("dunno") ||
					name.includes("don't know") ||
					name.includes("dont know") ||
					name == "no" ||
					name == "unknown";
			},
			"True": "jump NoName",
			"False": "jump Introductions"
		}},
		"jump Introductions"
	],
	
	"Introductions": [
		"hide y",
		function() { storage.introductions = true; return true; },
		"show b normal",
		"b Alright, {{player.Name}}. Hey, we have a name! That's great!",
		"show b thumbsup",
		"b Welcome to the team, {{player.Name}}!!",
		"show b normal",
		"b I'm Barbara, Senior Operations Manager. Hey, how about we go around the room and introduce ourselves?",
		"show b confident",
		"Barbara looks expectantly around the room. You see that there are quite a few people you didn't notice before.",
		"They aren't standing in any kind of circle, so no one is sure who should speak next.",
		"Everyone is avoiding eye contact with Barbara.",
		"show b normal",
		"Um, well, Derek?",
		"hide b",
		"show e painting",
		"The elderly man continues to paint.",
		"hide e",
		"show b normal",
		"b Derek?",
		"hide b",
		"show e painting",
		"e Fuck off, Barbara.",
		"hide e",
		"show b normal",
		"b Erm, well, that's Derek. And your pillow is Gwyn.",
		"hide b",
		"show y phone",
		"y Gwen.",
		{"Conditional": {
			"Condition": function() { return storage.met.yellow; },
			"True": "jump Introductions2",
			"False": "jump MeetYellow"
		}},
	],
	
	"Introductions2": [
		"hide y",
		"show b normal",
		"b ...",
		"hide b",
		"show y phone",
		"y ...",
		"hide y",
		"show b normal",
		"b ...",
		"The warmly-dressed man takes pity on Barbara and breaks the silence.",
		"hide b",
		"show f normal",
		"Hey, {{player.Name}}. Is it alright if I call you {{player.Name}}? Listen, do you know where I can get something to eat?",
		"hide f",
		"show s normal",
		"s Um, why would they know something like that? They literally just woke up.",
		"s And if you wanted something to eat, you just had to ask.",
		"hide s",
		"show f cute",
		"f No! No salad.",
		"hide f",
		"show s normal",
		"s Come on, it'll make you feel better.",
		"hide s",
		"show f cute",
		"f No!",
		"hide f with fadeOut",
		"The man runs away, pursued by the salad woman.",
		"show b normal",
		"Well, erm, that was Funwin, and Aisha.",
		{"Conditional": {
			"Condition": function() { return storage.met.nerd; },
			"True": "b Um, and you've met Bobby.",
			"False": "b The man with the megaphone is Bobby."
		}},
		"hide b",
		"show n normal",
		"n Hi.",
		"hide n",
		"vibrate 200",
		"scene livingroom with shake",
		"*Crash*",
		"Before Barbara can introduce the room's remaining occupants, you hear a loud crash from somewhere behind Gwen.",
		"show h normal",
		"h Erm...what was that?",
		"scene black",
		"Suddenly, the lights go out, plunging the room into complete darkness.",
                "-end of game jam-"
	],
	
	"NoName": [
		"b Oh. Well...how about we just call you...Bobby? That's a good name.",
		"hide b",
		"show n normal",
		"n Bobby? Are you serious?",
		"Someone else is standing next to Barbara, holding a megaphone.",
		function() { storage.met.nerd = true; return true; },
		"show n side",
		"n That's <em>my</em> name, you blithering idiot.",
		"hide n",
		"show b normal",
		"b Ah. Yes. That's right.",
		"show b thumbup",
		"b Well, it's a good name! Well done!!",
		"show b normal",
		"b Um, so, what about...",
		"b Chris? Um...Kim?",
		"show b clipboard",
		"b Janet? Archie? Desdemona? Frank? Sam? Beatrice?",
		"hide b",
		"show y phone",
		"y Oh for God's sake, Barbara, just put \"Unknown\". No one cares.",
		function() { storage.player.Name = "Unknown";},
		"jump MeetYellow"
	],
	
	"MeetYellow": [
		"show y phone",
		"You hear a voice from above you, and realise that your head has been resting on someone's lap.",
		{"Choice": {
			"Sit up": {
				"Text": "Sit up",
				"Do": "You sit up quickly. The sudden movement makes your head swim."
			},
			"Don't move": {
				"Text": "Don't move",
				"Do": "Your body feels as though it wouldn&apos;t move even if you tried."
			}
		}},
		"The young woman seems entirely unconcerned with you. She continues to type on her phone.",
		function() { storage.met.yellow = true; return true; },
		{"Conditional": {
			"Condition": function() { return storage.introductions; },
			"True": "jump Introductions2",
			"False": "jump Introductions"
		}}
	],

	"Yes": [

		"h That's awesome!",
		"h Then you are ready to go ahead and create an amazing Game!",
		"h I can't wait to see what story you'll tell!",
		"end"
	],

	"No": [

		"h You can do it now.",

		"display message Help",

		"h Go ahead and create an amazing Game!",
		"h I can't wait to see what story you'll tell!",
		"end"
	]
};
