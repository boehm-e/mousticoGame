const Bookshelf = require('../bookshelf');
const Booking = require('../models/Booking');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const moment = require('moment');
moment.locale('fr');

module.exports = Bookshelf.Model.extend({
    tableName: 'places',
    likers: function() {
        return this.belongsToMany(require('./User'), 'place_like', 'placeId', 'user_id');
    },
    update: async function(body) {
        const realbody = _.pick(body, ['type', 'name', 'address', 'start_time', 'end_time', 'pos', 'services', 'transport', 'handicap']);
        if (body.lat && body.lng) {
            realbody.pos = Bookshelf.knex.st.setSRID(Bookshelf.knex.st.point(body.lat, body.lng), 4326);
        }
        this.set(realbody);
        return await (await this.save()).fetch();
    },
    delete: async function() {
        return await this.destroy();
    }
},
{
    create: async function(body) {
        const realbody = _.pick(body, ['type', 'name', 'address', 'start_time', 'end_time', 'pos'/*, 'services', 'transport', 'handicap'*/]);
        if (body.lat && body.lng) {
            realbody.pos = Bookshelf.knex.st.setSRID(Bookshelf.knex.st.point(body.lat, body.lng), 4326);
        }
        const place = await (await new this(realbody).save()).fetch();
        return place;
    },
    delete: async function(id) {
        try {
            var destroy = await new this({id: id}).destroy({require: true});
        } catch (e) {
            return false;
        }
        return true;
    },
    get: async function(id) {
        // TODO: NEED TO CHECK GMT (heure de decalage?)
        try {
          var place = await this.forge({ id: id }).query(function(qb) {
               qb.select('*', Bookshelf.knex.st.x('pos'), Bookshelf.knex.st.y('pos'));
          }).fetch();
          // TODO: add week interval
          var result = await Bookshelf.knex.raw(`SELECT creneau AS start_time, Count("sessionStart") < ? AS available
            FROM
              (SELECT generate_series(current_date + ?::time with time zone, current_date + ?::time with time zone, '15 minutes'::interval) AS creneau) AS intervals
            LEFT JOIN  bookings
              ON         "placeId" = ?
              AND        ("sessionStart", interval '55 minutes') overlaps (creneau, interval '55 minutes')
            GROUP BY   creneau
            ORDER BY   creneau`, [6, place.get('start_time'), place.get('end_time'), id]);
            // TODO: replace 5 by places.maxPeople
            place = place.toJSON();
            place.slots = result.rows;
            return place;
        } catch (e) {
            le.log(e);
            return false;
        }
    },
    getFromLatLng: async function(body) {
        if (body.latX && body.latY && body.lngX && body.lngY) {
            var matchPlaces = await this.query(function(qb) {
                qb.whereRaw('pos @ ?', [Bookshelf.knex.st.makeEnvelope(body.lngX, body.latX, body.lngY, body.lngY, 4326)]);
            }).fetchAll();
            return matchPlaces;
        }
    },
    like: function(user, body) {
        return user.likePlace().attach(body.place_id);
    }
});
