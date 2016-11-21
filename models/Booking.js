const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const notif = require('../utils/notif').notify;
const _ = require('lodash');

module.exports = Bookshelf.Model.extend({
    tableName: 'bookings'
},
{
    book: async function(body, user) {
        let userId = user.get('id');
        const realbody = _.pick(body, ['placeId', 'sessionStart', 'activity', 'coachId']);
        realbody.userId = userId;
        const book = await (await new this(realbody).save()).fetch();
        return book;
    },
    update: async function(bookingId, userId, body) {
        try {
            const realbody = _.pick(body, ['placeId', 'sessionStart', 'activity', 'coachId']);
            let maj = await this.query('where', 'userId', '=', userId, 'and', 'id', '=', bookingId).fetch();
            return await (await maj.set(realbody).save()).fetch();
        } catch (e) {
            return false;
        }
        return false;


    },
    cancel: async function(body, userId) {
        // TODO: NEED TO NOTIFY COACHs
        try {
            if (body.booking_id, userId) {
                var destroy = await new this({id: body.booking_id}).where({ userId }).destroy({require: true});
            }
        } catch (e) {
            return false;
        }
        return true;
    },
    getFromPlaceId: async function(placeId) {
        try {
            var bookings = await this.query('where', 'placeId', '=', place_id).fetchAll();
        } catch (e) {
            return false;
        }

        return bookings.toJSON();
    },
    getBookings: async function(userId) {
        try {
            var bookings = await this.query('where', 'userId', '=', userId).fetchAll();
            if (!bookings)
            return false;
        } catch (e) {
            return false;
        }
        return bookings;
    },
    getBookingById: async function(id) {
        try {
            var bookings = await this.query('where', 'id', '=', id).fetch();
        } catch (e) {
            return false;
        }
        return bookings;
    },
    late: async function(body, userId, time) {
        try {
            var bookings = await (await this.where({id: body.booking_id, userId: userId}).fetch()).toJSON();
            notif(bookings.coachId, bookings.userId, body.time)
        } catch (e) {
            return false;
        }

        return bookings;
    },
    rate: async function(bookingId, userId, body) {
        try {
            var booking = await this.query('where', 'id', '=', bookingId).fetch();
            if (userId == booking.toJSON().userId) {
                const realbody = _.pick(body, ['rating', 'improvments', 'comment']);
                return await (await booking.set(realbody).save()).fetch();
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
});
