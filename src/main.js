import { Game, Player, Room, startRoom, Boss } from './logic.js';
import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const game = new Game();
const roomTypes = ['encounter', 'loot'];
const player = new Player();
const boss = new Boss();
const room1 = new Room();
const room2 = new Room();
const room3 = new Room();
const room4 = new Room();
const room5 = new Room();
const room6 = new Room();
const room7 = new Room();
const room8 = new Room();
const room9 = new Room();
const roomsArray = [room1, room2, room3, room4, room5, room6, room7, room8, room9];


const displayOptions = (room)=> {
  if(room.name === 'Goblin' && !room.dead) {
    $("#button-cont").hide();
    $("#lootBtns").hide();
    $("#goblinBtns").show();
  } else if(room.name === 'Loot!' && !room.openned){
    $("#button-cont").hide();
    $("#goblinBtns").hide();
    $("#lootBtns").show();
  } else if(room.name === "Mind Flayer") {
    $("#bossBtns").show();
    $("#goblinBtns").hide();
    $("#button-cont").hide();
    $("#lootBtns").hide();
  }else {
    $("#button-cont").show();
    $("#lootBtns").hide();
    $("#goblinBtns").hide();
  }
}

const displayData = function() {
  $("#stats").show();
  $("#goblinStats").hide();
  $("#enemyStats").hide();
  if(currentRoom.name === 'Goblin') {
    $("#enemyStats").show();
    $("#goblinStats").show();
    $("#goblinHealth").html(currentRoom.health)
  } else if(currentRoom.name === 'Mind Flayer') {
    $("#enemyStats").show();
    $("#bossStats").show();
    $("#goblinStats").hide();
    $("#bossHealth").html(currentRoom.health);
  }
  $("#playerStats").show();
  $("#health").html(player.health);
  $("#potions").html(player.potions);
  $("#gold").html(player.gold);
}

let currentRoom;
$(document).ready(function() {
  for(let i = 0; i < roomsArray.length; i++) {
    let temp = Math.round(Math.random());
    roomsArray[i].buildRoom(roomTypes[temp]);
  }
  game.addRooms(roomsArray);
  game.rooms[2][2] = boss;
  currentRoom = player.enterRoom(game);
  $("#button-cont").hide();
  $("#output").html(`<img src='${player.enterRoom(game)}' alt='something'>`);
  $("#button-cont").on('click', 'button', event => {
    player.move(event.target.id)
    $('#output').empty()
    currentRoom = player.enterRoom(game);
    $("#output").html(`<div class="room"><img src='${currentRoom.img}'></div>`)
    displayOptions(currentRoom);
    displayData();
  })
  //click listeners for goblin buttons
  $("#fight").click(function() {
    currentRoom.takeDamage(player);
    if(currentRoom.dead) {
      $("img").attr('src', "https://lh3.googleusercontent.com/proxy/wsqlsO2Cb4iYCQ5h7dRly4pbUKSV_WbwkJq40oZiHREAbkp1AxTh02_pv3dqBGouDbyGWkTXLqOjqK5KnTL4qLD_WhkxysXonqfGn5kAISeGd07vxs4erLI_P4xnqZ8_BPgr")
      $("#message").html("This goblin has been slain.");
      $("#goblinBtns").hide();
      $("#button-cont").show();
    }
    player.takeDamage(currentRoom.weapon.dmg);
    displayData();
    if(player.dead) {
      $("#game").hide();
      $("#gameOver").show();
    }
  })
  $("#fightBoss").click(function() {
    currentRoom.takeDamage(player);
    if(currentRoom.dead && currentRoom.name === "Goblin") {
      $("img").attr('src', "https://lh3.googleusercontent.com/proxy/wsqlsO2Cb4iYCQ5h7dRly4pbUKSV_WbwkJq40oZiHREAbkp1AxTh02_pv3dqBGouDbyGWkTXLqOjqK5KnTL4qLD_WhkxysXonqfGn5kAISeGd07vxs4erLI_P4xnqZ8_BPgr")
      $("#message").html("This goblin has been slain.");
      $("#goblinBtns").hide();
      $("#button-cont").show();
    } else if(currentRoom.dead && currentRoom.name === "Mind Flayer") {
      //show win screen
    }
    player.takeDamage(currentRoom.weapon.dmg);
    displayData();
    if(player.dead) {
      $("#game").hide();
      $("#gameOver").show();
    }
  })
  $("#loot").click(function() {
    if(currentRoom.openned) {
      $("img").attr("src", "https://runescape.wiki/images/thumb/8/80/Treasure_chest_%28uncharted_isles%29_tier_1_open.png/255px-Treasure_chest_%28uncharted_isles%29_tier_1_open.png?68cf5")
      $("#message").html("You've already taken the spoils");
      $("#button-cont").show();
      $("#lootBtns").hide();
    } else {
      player.gold += 50;
      player.potions++;
      currentRoom.openned = true;
      $("#message").html("Chest Looted.");
      $("#button-cont").show();
      $("#lootBtns").hide();
      displayData();
    }
  })
  $("#leave").click(function() {
    $("#button-cont").show();
    $("#lootBtns").hide();
    displayData();
  })
  $("#start").click(function() {
    $("body").removeClass('start');
    $("#potionBtn").show();
    $("#start").hide();
    displayOptions(currentRoom);
    $("img").attr('src', currentRoom.img);
    displayData();
  })
  $("#potionBtn").click(function() {
    if(player.potions > 0) {
      player.takePotion();
    } else {
      alert("You don't have any potions");
    }
    displayData();
  })
})

