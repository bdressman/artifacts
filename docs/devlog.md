# Artifacts MMO Scripting Dev Log

## Getting Started
The first thing I am doing is going through the tutorial and adding the provided scripts to the tutorial folder. Run with:

```
node .\src\tutorial\[tutorial file]
```

### Step 01 - Token Verify
This simply makes sure that your token is set up

### Step 02 - Movement
The tutorial wants us to move to the location of the chicken to prepare for a fight.

### Step 03 - First Fight
Now we fight this chicken on the tile we moved to.

### Step 04 - Recover Hit Points
This is using the rest action to recover hit points.

### Step 05 - Collecting Ash Wood
This is where we gather resources from an ash wood tree.

#### Move to location
We move to the tree which is the same code as the initial move script and it should be refactored after I complete the tutorial.

#### Gather Resource
It looks like you don't have to specify what you are gathering and instead just make a general gathering call.
It also wants you to gather 4 woods and I will handle looping later. For now, I am just running it manually 4 times.

#### Move to workshop
Another move call that brings us to the workshop so we can craft a weapon

#### Unequip weapon
This script also specifies the slot to unequip, so here is another area to look more deeply at.

#### Equip new weapon
Here we equip the wooden staff that we just created. However, it looks like there was a problem with the tutorial. The property earth_attack on the character is really attack_earth so it was returning undefined.

### Tutorial Completed
Okay, there's some interesting things to work on here.

The first thing I want to do is take the existing tutorial scripts and collapse out the movement into one script where I pass it as an argument of where to go. We will preserve the existing tutorial scripts and create a new tutorial directory called tutorial_revisit.

For those you would run:

```
node .\src\tutorial_revisit\[tutorial file]
```

## Tutorial Revisited
Now I will take my existing tutorial code and start to generalize the calls.

### Movement
I have added steps 2,5,7 as they are movement entries and created an API call for move. These are small steps towards my goals of fully abstracting out the API, but using these tutorials as my scaffolding is very helpful.

### Fighting
I created the fight api call and updated the tutorial on fighting the chicken. There is a small change to the destructuring as it causes a naming collision on fight. Other than that, things are basically the same. These are all as small of changes as I can do in order to start moving towards a usable API.

### Resting
Pretty standard update now and I'm starting to see the pattern of how to implement more commands.

### Gathering
Same update as resting really, but this introduces an interesting point to enhance the behavior. Since we need 4 wood, we can take this moment to have the script gather 4 times. So, now it uses some util functions to handle the cooldown and also allows for a general perform action function, which should be updated for all existing tutorial_revisit code calls.

### Intermission: Headers
So, every API call has a header that I can abstract out going forward. Every addition will require it later, so it's better to just do it now.

### Unequip
Back at it. This should be the same routine. Things are becoming familiar now and my early refactoring should allow for an easier time.

As it turns out, there are some intricacies with this regarding slots and quantity, but I will not worry about that for now.

### Equip
Same with unequip, I will forego the intricacies of the call for now and instead simply impelement the tutorial.

### Crafting
Business as usual.

Or it was... until I realized that the wooden_stick is actually only a starting item. 

```
"craft": null,
```

And that is not good. That means that if I want to follow my idea of creating a final complete_tutorial.cs file where it essentially performs the entire tutorial automatically, I would have to create a new character.

But, I think this is a good stopping point for the tutorial jam. It got me familar with some aspects of the API, how the game works, and gave me a starting point for the project. It's time to move on to a more intimate treatment of the API. 

## API Dive
https://api.artifactsmmo.com/openapi.json

There are a few layers to this. The first is site level where no authentication is needed at all. It gives information regarding the game with calls like "Get Server Details". The second is account level. These require usage of your token and operate across characters. There is a further distinction between game-level account information and system-level information. For example, "Get Bank Items" is a game-level call but "Change Password" is a system-level call.

After that, there's the actions of the character which are game-level calls.

I only really want to focus on actually playing the game rather than allowing interactions with system-level details.

I'm not trying to build a user interface to the game or anything. I want to create bots that will do the operations.

Like I said prior, I believe the tutorials have given a really good foundation, so let's switch gears and do a small runner.

## Runners

### Chicken Slayer
Let's take a simple task we already have done in the tutorial and automate it until some condition is met.

First, let's look at our chicken a little closer:

```
{
  "data": {
    "name": "Chicken",
    "code": "chicken",
    "level": 1,
    "type": "normal",
    "hp": 60,
    "attack_fire": 0,
    "attack_earth": 0,
    "attack_water": 4,
    "attack_air": 0,
    "res_fire": 0,
    "res_earth": 0,
    "res_water": 0,
    "res_air": 0,
    "critical_strike": 0,
    "initiative": 50,
    "effects": [],
    "min_gold": 0,
    "max_gold": 3,
    "drops": [
      {
        "code": "raw_chicken",
        "rate": 2,
        "min_quantity": 1,
        "max_quantity": 1
      },
      {
        "code": "egg",
        "rate": 12,
        "min_quantity": 1,
        "max_quantity": 1
      },
      {
        "code": "feather",
        "rate": 8,
        "min_quantity": 1,
        "max_quantity": 1
      },
      {
        "code": "golden_egg",
        "rate": 1000,
        "min_quantity": 1,
        "max_quantity": 1
      }
    ]
  }
}
```
#### The Plan
What we're going to do here for the first runner is kill chickens and rest - forever. Easiest it can get.

Steps:
1. Fight chicken (enters cooldown, HPs go down)
2. Rest
3. GOTO 1.

### Pause
Okay, I'm not making a lot of progress here with my current approach, so I have instead decided to create a playground branch where I will simply create the scripts to do actions and as I go, incorporate things into features and then finally into main.

I expect the playground to be quite messy but I also intend for nothing in it to directly go to main.

### Banking
I have reached a point where I need to be able to deposit items into the bank. There are the following actions on bank:

- Deposit Bank Gold
- Deposit Bank Item
- Withdraw Bank Item
- Withdraw Bank Gold
- Buy Bank Expansion
- Get Bank Details
- Get Bank Items

For now, I will only focus on [Deposit Bank Item](https://api.artifactsmmo.com/docs/#/operations/action_deposit_bank_item_my__name__action_bank_deposit_item_post)

The first thing to note is that it's more like depositing bank items because you can send multiple items.