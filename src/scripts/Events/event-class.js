// This module creates an Event class that can be used in other modules when creating new events or editing existing events
// Author: Elliot Huck

// Required by: event-submit
class Event {
  constructor(userId, name, date, location) {
    this.userId = userId;
    this.name = name;
    this.date = date;
    this.location = location;
  }
}

module.exports = Event;