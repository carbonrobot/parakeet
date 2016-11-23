const input = 'Name Something Or Someone You Associate With Silent Movies:Charlie Chaplin (24),Black and White (18),Music (15),Title Cards (13),Mary Pickford (12),Rudolf Valentino (10),Buster Keaton (6),;Name Something Your Parents Ask About Every Time They See You:Work / School (39),Health / Eating Right? (30),Grandkids (27),Partner / Dating Anyone? (3),;At The Roller Rink, How Can You Identify A Nervous Skater?:Wobbly / Falling (51),Holding On To Rail (28),Skating Slowly (8),Stay On Bench (7),Arms Out (3),;Name Someone You Wouldn’t Want To See Nude:Mom (39),Dad (31),Boss (12),Grandma (9),Kids (5),Sibling (3),;What Do You Call Someone Who Is Careful With Money?:Cheap (31),Stingy (21),Tight (15),Penny Pincher (12),Frugal (8),Scrooge (6),Thrifty (4),;Name A Part Of You That Looks Different When You’re Sick:Skin (44),Eyes (34),Nose (18),Hair (3),;Name A Fruit That’s Delicious To Eat, But Hard To Break Into:Coconut (27),Pineapple (26),Watermelon (22),Cantaloupe (11),Pomegranate (9),;Where Do People Usually Wear Sandals?:Beach (70),Pool (14),Park (9),Shower (4),;Name A Way You Can Tell Someone Is A Doctor Just By Looking At Them:Stethoscope (39),White Coat (28),Scrubs (19),ID Photo (9),;Name Something A Little Kid Might Tell You About Santa Claus?:He’s Plump (33),Is Jolly (14),Has A Beard (14),Wears A Red Suit (12),He’s Real (11),Brings Presents (9),Lives At North Pole (3),;We Asked 100 Women: What Might A Man Do For You On A First Date That Would Make You Think He Was Husband Material?:Open Door (51),Pay (24),Bring Flowers (15),Cook Dinner (9),;Name A Food That Often Comes Free With You Meal At A Restaurant:Bread (57),Salad (19),French Fries (18),Soup (5),;We Asked 100 Women To Fill In The Blank: I’d Notice Right Away If _________ Was Missing From My Purse.:Money (51),Make Up (34),My Cell Phone (6),My Set Of Keys (4),;What Kind Of Problem Might Someone Write In To An Advice Column About?:Love / Marriage (43),Financial (31),Job (11),Parenting (7),Relatives (5),;Name Something You Shouldn’t Do When A Cop Pulls You Over:Drive Away (28),Talk Back (22),Swear (14),Get Out Of Car (11),Laugh (7),Cry (7),Lie (4),;After A Week Of Camping, What Luxury Of Home Are You Most Excited To Have Again?:Bed (35),Shower (25),TV (13),Toilet (11),Electricity (4),Air Conditioner (4),Computer (3),;Name Something That’s Hard To Guess About A Woman You’re Just Meeting:Age (52),Personality (17),Name (13),Weight (11),;What Trait Of A Good Teacher Would Also Be Important For A Good Con Man?:Smart (54),Outgoing (17),Convincing (12),Trusted (7),Looks Professional (7),;Name A Cartoon Movie That Makes You Cry Even As An Adult:Bambi (44),Lion King (22),Cinderella (13),Fox & The Hound (7),Finding Nemo (5),Beauty & The Beast (3),Dumbo (3),;Name Something That You Don’t Wash As Often As You Probably Should:Car (39),Hands (19),Hair (14),Sheets (10),Clothes (6),Ears (4),Windows (3),;Name Something That You Hope Doesn’t Break While You’re Inside Of It:Car (53),Elevator (26),Plane (13),Roller Coaster (6),;'

const r = /([0-9]+)/;
let output = [];

let qs = input.split(';');
for(var i = 0; i < qs.length; i++){
    var qa = qs[i].split(':');
    if(qa.length < 2) continue;

    let o = {};
    o.question = qa[0];
    o.keys = [];

    let a = qa[1].split(',');
    for(var k = 0; k < a.length; k++){
        if(a[k] === '') continue;
        if(a[k].match(r) === null) continue;

        var p = a[k].match(r)[1];
        var d = a[k].replace(' (' + p + ')', '');
        o.keys.push({
            d: d,
            p: p
        });
    }

    output.push(o);
}

console.log(JSON.stringify(output));