// Boss names grammar by N
// using the wonderful Tracery (tracery.io)

var names_grammar = {
    "norsebegin": "Ae Ana As Bal Bi Es Fen Fim Gef Hel Jo Jor Lok Mid Mjol Ni Nor O Rag Thor Val Ygg".split(" "),
    "norsemiddle": "bjor bul dra fl ga gan mun na ven".split(" "),
    "norseend": "dall din dr frost gard heim jon nir rir rok sil sir tir tun".split(" "),
    "norseending": ["#norseend#", "#norsemiddle##norseending#"],
    "badnorse": ["#norsebegin##norseending#"],
    
    "lovecraftsyllable": "ah ath bg c eh fh fl gl gn gur lhu lui lw ly mg na nafh ng nig ol ph r sho shub ta th thu u uth wg yb".split(" "),
    "lovecraftending": ["#lovecraftsyllable#", "#lovecraftsyllable#", "#lovecraftsyllable#", "#lovecraftsyllable#'#lovecraftending#", "#lovecraftsyllable#-#lovecraftending#", "#lovecraftsyllable##lovecraftending#"],
    "lovecraft": ["#lovecraftsyllable.capitalize##lovecraftending#"],
    
    "prefix": "Black Blade Death Foe Frost Gold Grey Grim Storm Thunder Worm Wyrm".split(" "),
    "suffix": "axe blade breaker claw eye hammer hand nail saw shatter skull steel storm sword sworn thunder tongue tooth wind".split(" "),
    "twowords": ["#prefix##suffix#"],
    
    "darkadjective": "Accursed Ancient Black Bloody Creeping Cruel Cursed Dark Dead Demon Dread Endless Eternal Evil Forbidden Forgotten Foul Grim Holy Immortal Mad Nameless Nightmare Phantom Poisoned Shadow Skeleton Tormented Undead Unending Unholy".split(" "),
    "darkpreposition": "below beneath beyond".split(" "),
    "title": "Beast Count Eye Fiend God Guardian King Lady Lord Patrician Priest Prince Princess Terror Queen Ruler Scourge Sentinel Spirit Viscount Warden Watcher Witch #verber#".split(" "),
    "title?": ["", "#title#"],
    "darkadjective?": ["", "#darkadjective# "],
    "the": ["", "the "],
    
    "darkprefix": "nether under".split(" "),
    "darksuffix": "city dark world".split(" "),
    "location": "abyss castle cavern city deep domain dungeon forest mountain palace realm sea temple world".split(" "),
    "underworld": ["the Nether Realm", "Hell", "the #darkadjective# #darkpreposition#", "the #darkadjective?##darkprefix##darksuffix#"],
    "halls": ["Castle", "Cavern", "City", "Dungeon", "Forest", "Halls", "Palace", "Realm", "Temple"],
    "hallsof": ["#halls# of #underworld#", "#halls# of the #darkadjective?##location#", "#halls# of the #darkadjective?##title#"],
    "darkplace": ["the #darkadjective?##location#", "the #darkadjective?##hallsof#", "the #location# of #domain_dark#", "#underworld#", "#badnorse#"],
    "somewhere": ["in #darkplace#", "#darkpreposition#"],
    "unpleasantnoun": "Rats Roaches Serpents Snakes".split(" "),
    "pleasantnoun": "Dreams Fairies Light Souls Unicorns".split(" "),
    "singleworddomain_dark": "Blood,Darkness,Death,Despair,Evil,Greed,Lies,Misery,the Night,Nightmares,Pain,Shadows,Sorrow,Torment,Woe".split(","),
    "singleworddomain_light": "Dreams,Innocence,Light,Souls,Wishes,Worlds".split(","),
    "domain_dark": ["#singleworddomain_dark#", "#darkadjective?##unpleasantnoun#", "#darkplace#"],
    "domain_light": ["#singleworddomain_light#", "#pleasantnoun#"],
    "domain_either": ["#domain_dark#", "#domain_light#"],
    "verber": "Eater Destroyer Devourer Watcher".split(" "),
    "verbs": "devours lies moves rules sleeps waits watches".split(" "),
    
    "name": ["#badnorse#", "#lovecraft#", "#twowords#"],
    "subtitle": ["The #darkadjective?##title#", "The #darkadjective# #title?#", "#the.capitalize##darkadjective?##title# of #domain_dark#", "#verber# of #domain_either#", "The #title# in #darkplace#", "The #darkadjective?##title# who #verbs# #somewhere#", "The #darkadjective# One"]
};

$(document).ready(function() {
    function go() {
        var grammar = tracery.createGrammar(names_grammar);
        $("#name").html(grammar.flatten("#name#"));
        $("#subtitle").html(grammar.flatten("#subtitle#"));
    }
    
    setTimeout(go, 10);
    
    $("#content").click(go);
});