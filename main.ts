namespace SpriteKind {
    export const goal = SpriteKind.create()
    export const treasure = SpriteKind.create()
    export const switch_ = SpriteKind.create()
    export const poopy = SpriteKind.create()
    export const bat = SpriteKind.create()
    export const ghost = SpriteKind.create()
    export const red_card = SpriteKind.create()
    export const yellow_card = SpriteKind.create()
    export const ball = SpriteKind.create()
}

let treasure_sprite : Sprite = null
let stair_sprite : Sprite = null
let switch_sprite : Sprite = null
let switch_sprite_two : Sprite = null
let ball_sprite : Sprite = null
let maxLevel = 4
let current_level = 2
let player_direction = 1
let player_sprite : Sprite = null
let ball_found = false
let kick_cooldown = false
let enemy_list : Sprite[] = []
namespace Player {
    export const player_sprite = sprites.create(assets.image`
                        tete right
                    `, SpriteKind.Player)
    info.setLife(3)
    scene.cameraFollowSprite(Player.player_sprite)
    controller.moveSprite(Player.player_sprite, 100, 100)
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    
    animation.runImageAnimation(Player.player_sprite, assets.animation`walkRight`, 200, true)
    Player.player_sprite.setImage(assets.image`
                        tete right
                    `)
    player_direction = 3
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    
    animation.runImageAnimation(Player.player_sprite, assets.animation` walkLeft `, 200, true)
    Player.player_sprite.setImage(assets.image` tete left `)
    player_direction = 4
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    
    animation.runImageAnimation(Player.player_sprite, assets.animation` backWalk `, 200, true)
    Player.player_sprite.setImage(assets.image` tete back `)
    player_direction = 1
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    
    animation.runImageAnimation(Player.player_sprite, assets.animation`frontWalk`, 200, true)
    Player.player_sprite.setImage(assets.image` tete front `)
    player_direction = 2
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let projectileSprite: Sprite;
    
    if (ball_found && kick_cooldown == false) {
        if (player_direction == 1) {
            projectileSprite = sprites.createProjectileFromSprite(assets.image`ball idle`, Player.player_sprite, 0, -110)
            music.pewPew.play()
            animation.runImageAnimation(projectileSprite, assets.animation`ballAttack`, 50, true)
        } else if (player_direction == 2) {
            projectileSprite = sprites.createProjectileFromSprite(assets.image`ball idle`, Player.player_sprite, 0, 110)
            music.pewPew.play()
            animation.runImageAnimation(projectileSprite, assets.animation`ballAttack`, 50, true)
        } else if (player_direction == 3) {
            projectileSprite = sprites.createProjectileFromSprite(assets.image`ball idle`, Player.player_sprite, 110, 0)
            music.pewPew.play()
            animation.runImageAnimation(projectileSprite, assets.animation`ballAttack`, 50, true)
        } else if (player_direction == 4) {
            projectileSprite = sprites.createProjectileFromSprite(assets.image`ball idle`, Player.player_sprite, -110, 0)
            music.pewPew.play()
            animation.runImageAnimation(projectileSprite, assets.animation`ballAttack`, 50, true)
        }
        
    }
    
    console.log(player_direction)
})
//  On hit wall
scene.onHitWall(SpriteKind.Player, function on_hit_wall(sprite: Sprite, location: tiles.Location) {
    
    console.log("X: " + location.x)
    console.log("Y: " + location.y)
    if (current_level == 1) {
        if (location.x == 136 && location.y == 8) {
            if (switch_sprite.image == sprites.dungeon.greenSwitchUp) {
                info.setScore(info.score() + 200)
                switch_sprite.setImage(sprites.dungeon.greenSwitchDown)
                scene.setTileMapLevel(tilemap`
                    level one switched
                `)
                pause(500)
                music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
                scene.cameraShake(3, 500)
            } else {
                game.splash("The switch broke")
            }
            
        }
        
    } else if (current_level == 2) {
        if (location.x == 136 && location.y == 424) {
            if (switch_sprite.image == sprites.dungeon.purpleSwitchUp) {
                info.setScore(info.score() + 200)
                switch_sprite.setImage(sprites.dungeon.purpleSwitchDown)
                scene.setTileMapLevel(tilemap`
                                    level two bridge
                                `)
                pause(500)
                music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
                scene.cameraShake(3, 500)
            } else {
                game.splash("The switch broke")
            }
            
        } else if (location.x == 40 && location.y == 8) {
            if (switch_sprite_two.image == sprites.dungeon.purpleSwitchUp) {
                info.setScore(info.score() + 200)
                switch_sprite_two.setImage(sprites.dungeon.purpleSwitchDown)
                scene.setTileMapLevel(tilemap`
                                                    level two bridge two
                                                `)
                pause(500)
                music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
                scene.cameraShake(3, 500)
            } else {
                game.splash("The switch broke")
            }
            
        }
        
    } else {
        
    }
    
})
function reset_level() {
    
    if (current_level == 2) {
        switch_sprite.setImage(sprites.dungeon.greenSwitchUp)
        treasure_sprite.setImage(sprites.dungeon.chestClosed)
    }
    
}

//  Create enemies
function create_enemies() {
    let red_card_one: Sprite;
    let red_card_two: Sprite;
    let yellow_card_one: Sprite;
    let yellow_card_two: Sprite;
    
    if (current_level == 1) {
        for (let index = 0; index < 5; index++) {
            enemy_list.push(sprites.create(assets.image`
                poopy left
            `, SpriteKind.poopy))
        }
        for (let enemySprite of sprites.allOfKind(SpriteKind.poopy)) {
            enemySprite.setPosition(Math.randomRange(20, 300), Math.randomRange(10, 220))
        }
    } else if (current_level == 2) {
        enemy_list = []
        red_card_one = sprites.create(assets.image`redCard base `, SpriteKind.red_card)
        red_card_two = sprites.create(assets.image`redCard base `, SpriteKind.red_card)
        yellow_card_one = sprites.create(assets.image`yellowCard base `, SpriteKind.yellow_card)
        yellow_card_two = sprites.create(assets.image`yellowCard base `, SpriteKind.yellow_card)
        enemy_list.push(red_card_one)
        enemy_list.push(red_card_two)
        enemy_list.push(yellow_card_one)
        enemy_list.push(yellow_card_two)
        red_card_one.setPosition(25, 150)
        red_card_two.setPosition(300, 450)
        yellow_card_one.setPosition(228, 170)
        yellow_card_two.setPosition(400, 55)
    }
    
}

//  On overlap stairs
sprites.onOverlap(SpriteKind.Player, SpriteKind.goal, function on_on_overlap_stairs(SpriteKind: Sprite, otherSprite: Sprite) {
    
    if (current_level == maxLevel) {
        game.over(true)
    } else {
        stair_sprite.destroy()
        current_level = current_level + 1
        // reset_level()
        select_levels()
    }
    
})
//  On overlap treasure
sprites.onOverlap(SpriteKind.Player, SpriteKind.treasure, function on_on_overlap_treasure(SpriteKind: Sprite, otherSprite: Sprite) {
    if (treasure_sprite.image == sprites.dungeon.chestClosed) {
        info.setScore(info.score() + 100)
        treasure_sprite.setImage(sprites.dungeon.chestOpen)
    }
    
})
//  On overlap player with ball (item)
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function on_on_overlap_ball(SpriteKind: Sprite, otherSprite: Sprite) {
    
    ball_found = true
    game.splash("You found your precious ball!")
    game.splash("Now you can kick it with A")
    ball_sprite.destroy()
})
//  On enemy collision
sprites.onOverlap(SpriteKind.Player, SpriteKind.poopy, function on_on_overlap_enemy_poopy(SpriteKind: Sprite, otherSprite: Sprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.ashes, 200)
    otherSprite.destroy()
    music.thump.play()
})
function create_level_one() {
    
    // music.play(music.create_song(assets.song("""level one bso""")),music.PlaybackMode.LOOPING_IN_BACKGROUND)
    scene.setTileMapLevel(tilemap`
        level one
    `)
    treasure_sprite = sprites.create(sprites.dungeon.chestClosed, SpriteKind.treasure)
    treasure_sprite.setPosition(25, 140)
    stair_sprite = sprites.create(sprites.dungeon.stairLarge, SpriteKind.goal)
    stair_sprite.setPosition(232, 200)
    switch_sprite = sprites.create(sprites.dungeon.greenSwitchUp, SpriteKind.goal)
    switch_sprite.setPosition(136, 8)
    create_enemies()
}

function create_level_two() {
    
    // music.play(music.create_song(assets.song("""level one bso""")),music.PlaybackMode.LOOPING_IN_BACKGROUND)
    scene.setTileMapLevel(tilemap`
        level two base
    `)
    // Player.player_sprite.set_position(228,23)
    Player.player_sprite.setPosition(25, 260)
    treasure_sprite = sprites.create(sprites.dungeon.chestClosed, SpriteKind.treasure)
    treasure_sprite.setPosition(484, 58)
    stair_sprite = sprites.create(sprites.dungeon.stairLarge, SpriteKind.goal)
    stair_sprite.setPosition(25, 492)
    switch_sprite = sprites.create(sprites.dungeon.purpleSwitchUp, SpriteKind.switch_)
    switch_sprite.setPosition(142, 424)
    switch_sprite_two = sprites.create(sprites.dungeon.purpleSwitchUp, SpriteKind.switch_)
    switch_sprite_two.setPosition(50, 8)
    ball_sprite = sprites.create(assets.image`ball idle`, SpriteKind.ball)
    ball_sprite.setPosition(258, 46)
    create_enemies()
}

music.setVolume(40)
game.onUpdateInterval(500, function on_update_interval() {
    let red_card_one: Sprite;
    
    if (current_level == 1) {
        for (let poopy of sprites.allOfKind(SpriteKind.poopy)) {
            //  follow the player
            if (poopy.x < Player.player_sprite.x) {
                poopy.vx = 20
                animation.runImageAnimation(poopy, assets.animation`poopy animated right`, 200, true)
                poopy.setImage(assets.image` poopy right `)
            } else {
                poopy.vx = -20
                animation.runImageAnimation(poopy, assets.animation`poopy animated left`, 200, true)
                poopy.setImage(assets.image` poopy left `)
            }
            
            if (poopy.y < Player.player_sprite.y) {
                poopy.vy = 20
            } else {
                poopy.vy = -20
            }
            
        }
    }
    
    if (current_level == 2) {
        if (Player.player_sprite.x >= 8 && Player.player_sprite.x <= 40 && Player.player_sprite.y >= 232 && Player.player_sprite.y <= 248) {
            console.log("YEP")
            red_card_one = enemy_list[0]
            red_card_animation(red_card_one)
        }
        
    }
    
})
function red_card_animation(red_card_sprite: Sprite) {
    if (Player.player_sprite.y > red_card_sprite.y) {
        animation.runImageAnimation(red_card_sprite, assets.animation`redCardFront`, 200, true)
    } else {
        animation.runImageAnimation(red_card_sprite, assets.animation`redCardBack`, 200, true)
    }
    
    red_card_sprite.follow(Player.player_sprite, 80, 70)
}

function select_levels() {
    
    if (current_level == 1) {
        create_level_one()
    } else if (current_level == 2) {
        create_level_two()
    }
    
}

select_levels()
info.onLifeZero(function on_life_zero() {
    sprites.destroy(player_sprite, effects.ashes, 200)
    music.wawawawaa.play()
    game.gameOver(false)
})
