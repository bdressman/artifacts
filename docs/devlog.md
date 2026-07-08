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

## Movement
I have added steps 2,5,7 as they are movement entries and created an API call for move. These are small steps towards my goals of fully abstracting out the API, but using these tutorials as my scaffolding is very helpful.

## Fighting
I created the fight api call and updated the tutorial on fighting the chicken. There is a small change to the destructuring as it causes a naming collision on fight. Other than that, things are basically the same. These are all as small of changes as I can do in order to start moving towards a usable API.