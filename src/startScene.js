// startScene.js
import Phaser from 'phaser';

class StartScene extends Phaser.Scene {
    create() {
        const text = this.add.text(400, 300, 'Start Scene', { fontSize: '32px', fill: '#fff' });

        const marketButton = this.add.text(400, 400, 'Go to Market', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('marketScene'));

        const locationButton = this.add.text(400, 450, 'Choose Location', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('locationScene'));

        // Center align text and buttons
        Phaser.Display.Align.In.Center(text, this.add.zone(400, 300, 800, 600));
        Phaser.Display.Align.In.Center(marketButton, this.add.zone(400, 400, 800, 600));
        Phaser.Display.Align.In.Center(locationButton, this.add.zone(400, 450, 800, 600));
    }
}

export default StartScene;
