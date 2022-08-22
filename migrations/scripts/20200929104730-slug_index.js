'use strict';

module.exports = {
    async up(db) {
        console.log('>>> INDEXED OF USERS BY SLUG <<<');
        
        await db.collection('users').createIndex( 
            { slug: 1 }, { name: 'user_slug_idx', unique: true }
        );
    }
};