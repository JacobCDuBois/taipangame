// battleScene.js
import Phaser from 'phaser';

class BattleScene extends Phaser.Scene {
    create() {
        const text = this.add.text(400, 300, 'Battle Scene', { fontSize: '32px', fill: '#fff' });

        const backToMarketButton = this.add.text(400, 550, 'Back to Market', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('marketScene'));

        // Center align text and button
        Phaser.Display.Align.In.Center(text, this.add.zone(400, 300, 800, 600));
        Phaser.Display.Align.In.Center(backToMarketButton, this.add.zone(400, 550, 800, 600));
    }
}

export default BattleScene;
