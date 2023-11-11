// gameOverScene.js
import Phaser from 'phaser';

class GameOverScene extends Phaser.Scene {
    create() {
        const text = this.add.text(400, 300, 'Game Over Scene', { fontSize: '32px', fill: '#fff' });

        const backToStartButton = this.add.text(400, 500, 'Back to Start', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('startScene'));

        // Center align text and button
        Phaser.Display.Align.In.Center(text, this.add.zone(400, 300, 800, 600));
        Phaser.Display.Align.In.Center(backToStartButton, this.add.zone(400, 500, 800, 600));
    }
}

export default GameOverScene;
