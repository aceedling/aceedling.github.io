var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "myObstacle", "x": 1380, "y": 475 },
                { "type": "enemy", "x": 1500, "y": groundY - 50 }
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        /*
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = 400;
        sawBladeHitZone.y = 400;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
        */
        
        function createSawBlade(x, y) {
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            sawBladeHitZone.addChild(obstacleImage);
        }
        
        createSawBlade(800, 375);
        createSawBlade(920, 480);
        createSawBlade(1080, 475);
        
        for(var i = 0; i < levelData.gameItems.length; i++) {
            var item = levelData.gameItems[i];
            if(item.type === "sawblade") {
                createSawBlade(item.x, item.y);
            } else if(item.type ===  "myObstacle") {
                createMyObstacle(item.x, item.y);
            } else {
                createEnemy(item.x, item.y);
            }
        }
        
        function createMyObstacle(x, y) {
            hitZoneSize = 10;
            damageFromObstacle = 50;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var myObstacleImage = draw.bitmap('img/cringe.png')
            myObstacleImage.x = -10;
            myObstacleImage.y = -10;
            myObstacle.addChild(myObstacleImage);
        }
        
        createMyObstacle(1480, 475);
        function createEnemy(x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var enemyImage = draw.bitmap('img/kanye.png');
            enemyImage.x = -25;
            enemyImage.y = -25;
            enemy.addChild(enemyImage);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -2;
            enemy.rotationalVelocity= 10;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-15);
            };
            enemy.onProjectileCollision = function() {
                console.log("Halle has hit the enemy");
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }
        createEnemy(400, groundY - 50);
        
        function createReward(x, y) {
            var reward = game.createGameItem('reward', 25);
            var rewardImage = draw.bitmap('img/ddg.jpg');
            rewardImage.x = -25;
            rewardImage.y = -25;
            reward.addChild(rewardImage);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;
            reward.onPlayerCollision = function() {
                game.increaseScore(800);
                reward.fadeOut();
            }
        }
        
        createReward(1600, 375);
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
