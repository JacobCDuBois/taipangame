import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import StartScene from "./startScene";
import MarketScene from "./marketScene";
import BattleScene from "./battleScene";
import GameOverScene from "./gameOverScene";
import LocationScene from "./locationScene";
class MainScene extends Phaser.Scene {
    preload() {
        // No assets to preload for this example
    }

    create() {
        // Set the background color to blue
        this.cameras.main.setBackgroundColor('#3498db');

        // Create a button with text 'Start'
        const button = this.add.text(400, 300, 'Start', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#2ecc71',
            padding: {
                x: 20,
                y: 10,
            },
        });

        // Make the button interactive
        button.setInteractive();

        // Set up an event handler for the button click
        button.on('pointerdown', () => {
            console.log('Button clicked!'); // You can replace this with your logic
        });
    }
}

const PhaserGame = () => {
    const gameContainerRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: MainScene
        };

        new Phaser.Game(config);
    }, []);

    return <div ref={gameContainerRef} />;
};

export default PhaserGame;
