/**
 * Created by sz on 2018-04-19.
 */

import * as THREE from 'three';

export class Rain {

    particles = [];
    constructor () {

        this.createSnow();
    }
    createSnow(){
        var geometry = new THREE.BufferGeometry();
        var vertices = [];
        var textureLoader = new THREE.TextureLoader();
        var sprite1 = textureLoader.load( 'assets/models/snow/raindrop-1.png' );
        var sprite2 = textureLoader.load( 'assets/models/snow/raindrop-2.png' );
        var sprite3 = textureLoader.load( 'assets/models/snow/raindrop-3.png' );
        var sprite4 = textureLoader.load( 'assets/models/snow/raindrop-4.png' );
        var sprite5 = textureLoader.load( 'assets/models/snow/raindrop-5.png' );
        var i = 0;
        for ( i  = 0; i < 10000; i ++ ) {
            var x = Math.random() * 2000 - 1000;
            var y = Math.random() * 2000 - 0;
            var z = Math.random() * 2000 - 1000;
            vertices.push( x, y, z );
        }
        geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        var parameters = [
            [ [ 1.0, 0.2, 0.5 ], sprite2, 20 ],
            [ [ 0.95, 0.1, 0.5 ], sprite3, 15 ],
            [ [ 0.90, 0.05, 0.5 ], sprite1, 10 ],
            [ [ 0.85, 0, 0.5 ], sprite5, 8 ],
            [ [ 0.80, 0, 0.5 ], sprite4, 5 ]
        ];
        var materials = [];
        for ( var i = 0; i < parameters.length; i ++ ) {
            var color  = parameters[ i ][ 0 ];
            var sprite = parameters[ i ][ 1 ];
            var size   = parameters[ i ][ 2 ];
            materials[ i ] = new THREE.PointsMaterial( );
            materials[ i ].size = size;
            materials[ i ].map = sprite;
            materials[ i ].sizeAttenuation = true;
            materials[ i ].blending = THREE.AdditiveBlending;
            materials[ i ].depthTest = false;
            materials[ i ].transparent = true;
            materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );
            var particle = new THREE.Points( geometry, materials[i] );
            particle.rotation.x = Math.random() * 6;
            particle.rotation.y = Math.random() * 6;
            particle.rotation.z = Math.random() * 6;
            this.particles.push(particle);
        }
    }

    render(){
        //var time = Date.now() * 0.00005;
        var velocity = Math.random() * 10;
        this.particles.forEach( (item,index) => {
            //item.rotation.y = time * ( index < 4 ? index + 1 : - ( index + 1 ) );
            item.position.y -= velocity;
            if (item.position.y < 0){
                item.position.y = Math.random() * 2000 ;
            }
        });
    }

}
