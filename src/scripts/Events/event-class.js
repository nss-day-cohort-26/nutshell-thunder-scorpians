
// Required by: event-submit, events, event-load
class Event {
  constructor(userId, name, date, location) {
    this.userId = userId;
    this.name = name;
    this.date = date;
    this.location = location;
  }
}

module.exports = Event;